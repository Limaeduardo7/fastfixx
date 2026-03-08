import express from 'express';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(express.json({ limit: '512kb' }));

const PORT = process.env.PORT || 3100;
const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;
const HOTMART_WEBHOOK_TOKEN = process.env.HOTMART_WEBHOOK_TOKEN;
const EVENTS_LOG_PATH = process.env.EVENTS_LOG_PATH || '/root/fastfixx/capi-server/logs/events.log';

const EVOLUTION_BASE_URL = process.env.EVOLUTION_BASE_URL || 'http://127.0.0.1:8082';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || 'default';
const EVOLUTION_SEND_PATH = process.env.EVOLUTION_SEND_PATH || '/message/sendText/{instance}';
const AUTOMATION_JOBS_PATH = process.env.AUTOMATION_JOBS_PATH || '/root/fastfixx/capi-server/data/automation-jobs.json';

if (!PIXEL_ID || !ACCESS_TOKEN) {
  console.error('Faltando META_PIXEL_ID ou META_ACCESS_TOKEN no ambiente.');
}

const scheduledJobs = new Map();

function sha256(value) {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

function normalizePhone(phone) {
  if (!phone) return undefined;
  const normalized = String(phone).replace(/\D/g, '');
  if (!normalized) return undefined;
  return normalized;
}

function getClientMeta(req) {
  return {
    ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress,
    ua: req.headers['user-agent'],
  };
}

function pickFirst(...values) {
  return values.find((v) => v !== undefined && v !== null && String(v).trim() !== '');
}

function extractTracking(payload = {}) {
  const data = payload.data || payload;
  const tracking = data.tracking || payload.tracking || {};
  const params = data.params || payload.params || {};

  const fbclid = pickFirst(tracking.fbclid, params.fbclid, data.fbclid, payload.fbclid);
  const fbc = pickFirst(
    tracking.fbc,
    params.fbc,
    data.fbc,
    payload.fbc,
    fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined
  );

  const fbp = pickFirst(tracking.fbp, params.fbp, data.fbp, payload.fbp);
  const external_id = pickFirst(
    tracking.external_id,
    tracking.lead_id,
    params.lead_id,
    data.lead_id,
    payload.lead_id,
    data.external_id,
    payload.external_id
  );

  return { fbc, fbp, fbclid, external_id };
}

async function appendEventLog(entry) {
  try {
    await fs.mkdir(path.dirname(EVENTS_LOG_PATH), { recursive: true });
    await fs.appendFile(EVENTS_LOG_PATH, `${JSON.stringify(entry)}\n`, 'utf8');
  } catch (err) {
    console.error('Falha ao escrever log de evento:', err.message);
  }
}

async function readEventLogs(limit = 50) {
  try {
    const raw = await fs.readFile(EVENTS_LOG_PATH, 'utf8');
    const lines = raw.trim().split('\n').filter(Boolean);
    return lines.slice(-limit).map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return { raw: line };
      }
    });
  } catch {
    return [];
  }
}

async function persistJobs() {
  const serializable = Array.from(scheduledJobs.values()).map((j) => ({
    ...j,
    timeoutId: undefined,
  }));
  await fs.mkdir(path.dirname(AUTOMATION_JOBS_PATH), { recursive: true });
  await fs.writeFile(AUTOMATION_JOBS_PATH, JSON.stringify(serializable, null, 2), 'utf8');
}

async function sendWhatsAppText(phone, text) {
  const normalized = normalizePhone(phone);
  if (!normalized) throw new Error('Telefone inválido para envio');
  if (!EVOLUTION_API_KEY) throw new Error('EVOLUTION_API_KEY não configurada');

  const endpoint = `${EVOLUTION_BASE_URL}${EVOLUTION_SEND_PATH.replace('{instance}', EVOLUTION_INSTANCE)}`;
  const payload = {
    number: normalized,
    text,
    options: {
      delay: 800,
      presence: 'composing',
    },
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: EVOLUTION_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Falha Evolution: ${JSON.stringify(data)}`);
  }

  return data;
}

function scheduleAutomation({ leadId, flow, step, phone, text, delayMs, meta = {} }) {
  const id = crypto.randomUUID();
  const executeAt = Date.now() + delayMs;

  const job = {
    id,
    leadId,
    flow,
    step,
    phone: normalizePhone(phone),
    text,
    delayMs,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    executeAt: new Date(executeAt).toISOString(),
    meta,
  };

  const timeoutId = setTimeout(async () => {
    const current = scheduledJobs.get(id);
    if (!current || current.status !== 'scheduled') return;

    try {
      const evolution = await sendWhatsAppText(current.phone, current.text);
      current.status = 'sent';
      current.sentAt = new Date().toISOString();
      current.evolution = evolution;
      await appendEventLog({ ts: current.sentAt, source: 'automation', action: 'sent', flow, step, leadId, phone: current.phone });
    } catch (err) {
      current.status = 'failed';
      current.error = err.message;
      current.failedAt = new Date().toISOString();
      await appendEventLog({ ts: current.failedAt, source: 'automation', action: 'failed', flow, step, leadId, error: err.message });
    }

    scheduledJobs.set(id, current);
    await persistJobs();
  }, delayMs);

  job.timeoutId = timeoutId;
  scheduledJobs.set(id, job);
  persistJobs().catch(() => {});
  return job;
}

function cancelLeadAutomations(leadId) {
  if (!leadId) return 0;
  let canceled = 0;

  for (const [id, job] of scheduledJobs.entries()) {
    if (job.leadId === leadId && job.status === 'scheduled') {
      clearTimeout(job.timeoutId);
      job.status = 'canceled';
      job.canceledAt = new Date().toISOString();
      scheduledJobs.set(id, job);
      canceled += 1;
    }
  }

  persistJobs().catch(() => {});
  return canceled;
}

async function sendMetaEvent({
  event_name,
  event_time,
  event_id,
  event_source_url,
  action_source = 'website',
  custom_data = {},
  user_data = {},
  ip,
  ua,
}) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    throw new Error('Servidor CAPI sem configuração de credenciais');
  }

  const payload = {
    data: [
      {
        event_name,
        event_time: event_time || Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source,
        custom_data,
        user_data: {
          client_ip_address: ip,
          client_user_agent: ua,
          fbc: user_data.fbc,
          fbp: user_data.fbp,
          em: sha256(user_data.email),
          ph: sha256(normalizePhone(user_data.phone)),
          fn: sha256(user_data.first_name),
          ln: sha256(user_data.last_name),
          external_id: sha256(user_data.external_id),
        },
      },
    ],
  };

  if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

  const url = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
  const fbRes = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const fbData = await fbRes.json();

  if (!fbRes.ok) {
    const err = new Error('Erro ao enviar evento para Meta');
    err.meta = fbData;
    throw err;
  }

  return fbData;
}

function parseHotmartPayload(payload = {}) {
  const data = payload.data || payload;
  const buyer = data.buyer || data.buyer_info || payload.buyer || {};
  const purchase = data.purchase || payload.purchase || {};
  const product = data.product || payload.product || {};
  const transaction = data.transaction || payload.transaction || {};

  const statusRaw = (
    data.status || transaction.status || purchase.status || payload.status || payload.event || payload.event_name || ''
  )
    .toString()
    .toLowerCase();

  let mappedEvent = null;
  if (statusRaw.includes('approved') || statusRaw.includes('completed') || statusRaw.includes('purchase_approved')) {
    mappedEvent = 'Purchase';
  } else if (statusRaw.includes('billet') || statusRaw.includes('pix') || statusRaw.includes('generated') || statusRaw.includes('printed')) {
    mappedEvent = 'AddPaymentInfo';
  } else if (statusRaw.includes('refunded') || statusRaw.includes('chargeback') || statusRaw.includes('canceled')) {
    mappedEvent = 'Refund';
  }

  const valueRaw = purchase.price?.value || purchase.value || transaction.value || data.price || payload.price || 0;
  const value = Number(valueRaw) || 0;
  const currency = purchase.price?.currency_code || purchase.currency || data.currency || payload.currency || 'BRL';
  const baseId = String(transaction.id || purchase.order_id || purchase.transaction || data.id || payload.id || crypto.randomUUID());
  const tracking = extractTracking(payload);
  const eventId = `${baseId}_${mappedEvent || 'unknown'}`;

  return {
    mappedEvent,
    statusRaw,
    eventId,
    value,
    currency,
    orderId: purchase.order_id || transaction.id,
    productName: product.name || data.product_name,
    buyer,
    payloadData: data,
    tracking,
  };
}

function validateHotmartToken(req) {
  if (!HOTMART_WEBHOOK_TOKEN) return false;
  const token = req.headers['x-hotmart-hottok'] || req.headers['hottok'] || req.query?.hottok || req.body?.hottok || req.body?.token;
  return String(token || '') === String(HOTMART_WEBHOOK_TOKEN);
}

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'meta-capi',
    pixelConfigured: Boolean(PIXEL_ID),
    hotmartWebhookConfigured: Boolean(HOTMART_WEBHOOK_TOKEN),
    evolutionConfigured: Boolean(EVOLUTION_API_KEY),
  });
});

app.get('/api/events/recent', async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const events = await readEventLogs(limit);
  return res.json({ ok: true, count: events.length, events });
});

app.get('/api/automation/jobs', async (_req, res) => {
  const jobs = Array.from(scheduledJobs.values()).map((j) => ({ ...j, timeoutId: undefined }));
  return res.json({ ok: true, count: jobs.length, jobs });
});

app.post('/api/automation/lead-magnet', async (req, res) => {
  const { phone, name = 'Tudo bem?', lead_id } = req.body || {};
  if (!phone || !lead_id) return res.status(400).json({ ok: false, error: 'phone e lead_id são obrigatórios' });

  const jobs = [
    scheduleAutomation({
      leadId: lead_id,
      flow: 'lead_magnet',
      step: 'instant',
      phone,
      delayMs: 15 * 1000,
      text: `Oi ${name}, aqui é da FastFix 👋\nSeu material já está pronto. Quer que eu te envie agora?`,
    }),
    scheduleAutomation({
      leadId: lead_id,
      flow: 'lead_magnet',
      step: 'd1',
      phone,
      delayMs: 24 * 60 * 60 * 1000,
      text: `Passando para saber se conseguiu ver a isca digital 👀\nSe quiser, te mostro o próximo passo para transformar isso em venda.`,
    }),
  ];

  return res.json({ ok: true, jobs: jobs.map((j) => ({ ...j, timeoutId: undefined })) });
});

app.post('/api/automation/waitlist', async (req, res) => {
  const { phone, name = 'Tudo bem?', lead_id } = req.body || {};
  if (!phone || !lead_id) return res.status(400).json({ ok: false, error: 'phone e lead_id são obrigatórios' });

  const jobs = [
    scheduleAutomation({
      leadId: lead_id,
      flow: 'waitlist',
      step: 'welcome',
      phone,
      delayMs: 15 * 1000,
      text: `Oi ${name}, você entrou na lista VIP da FastFix ✅\nQuando abrirmos, você recebe primeiro por aqui.`,
    }),
    scheduleAutomation({
      leadId: lead_id,
      flow: 'waitlist',
      step: 'warmup',
      phone,
      delayMs: 12 * 60 * 60 * 1000,
      text: `Aviso rápido: já estamos preparando os conteúdos mais fortes para o lançamento 🔥\nQuer que eu te avise assim que liberar as vagas?`,
    }),
  ];

  return res.json({ ok: true, jobs: jobs.map((j) => ({ ...j, timeoutId: undefined })) });
});

app.post('/api/automation/checkout-abandon', async (req, res) => {
  const { phone, name = 'Tudo bem?', lead_id } = req.body || {};
  if (!phone || !lead_id) return res.status(400).json({ ok: false, error: 'phone e lead_id são obrigatórios' });

  const jobs = [
    scheduleAutomation({
      leadId: lead_id,
      flow: 'checkout_abandon',
      step: '15m',
      phone,
      delayMs: 15 * 60 * 1000,
      text: `Oi ${name}, vi que você quase concluiu sua inscrição na FastFix.\nSe travou em algo (pagamento, acesso, dúvida), me chama que resolvo agora 👍`,
    }),
    scheduleAutomation({
      leadId: lead_id,
      flow: 'checkout_abandon',
      step: '2h',
      phone,
      delayMs: 2 * 60 * 60 * 1000,
      text: `Passando para te lembrar da sua vaga na FastFix 🚀\nQuer que eu te envie o link direto para finalizar?`,
    }),
    scheduleAutomation({
      leadId: lead_id,
      flow: 'checkout_abandon',
      step: '24h',
      phone,
      delayMs: 24 * 60 * 60 * 1000,
      text: `Último aviso por aqui: sua condição especial pode encerrar em breve ⏳\nSe quiser garantir agora, eu te mando o link em 1 clique.`,
    }),
  ];

  return res.json({ ok: true, jobs: jobs.map((j) => ({ ...j, timeoutId: undefined })) });
});

app.post('/api/meta/events', async (req, res) => {
  try {
    const { ip, ua } = getClientMeta(req);
    const {
      event_name,
      event_time,
      event_id,
      event_source_url,
      action_source = 'website',
      custom_data = {},
      user_data = {},
    } = req.body || {};

    if (!event_name) {
      return res.status(400).json({ ok: false, error: 'event_name é obrigatório' });
    }

    const fbData = await sendMetaEvent({
      event_name,
      event_time,
      event_id,
      event_source_url,
      action_source,
      custom_data,
      user_data,
      ip,
      ua,
    });

    await appendEventLog({
      ts: new Date().toISOString(),
      source: 'site_capi',
      event_name,
      event_id,
      has_em: Boolean(user_data?.email),
      has_ph: Boolean(user_data?.phone),
      has_fbc: Boolean(user_data?.fbc),
      has_fbp: Boolean(user_data?.fbp),
      has_external_id: Boolean(user_data?.external_id),
      meta: fbData,
    });

    res.json({ ok: true, meta: fbData });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.meta || error.message });
  }
});

app.post('/api/hotmart/webhook', async (req, res) => {
  try {
    if (!validateHotmartToken(req)) {
      return res.status(401).json({ ok: false, error: 'Token do webhook Hotmart inválido' });
    }

    const { ip, ua } = getClientMeta(req);
    const parsed = parseHotmartPayload(req.body || {});

    if (!parsed.mappedEvent) {
      await appendEventLog({ ts: new Date().toISOString(), source: 'hotmart_webhook', ignored: true, status: parsed.statusRaw });
      return res.json({ ok: true, ignored: true, reason: `status não mapeado: ${parsed.statusRaw}` });
    }

    const externalId = pickFirst(parsed.tracking.external_id, parsed.orderId);

    const fbData = await sendMetaEvent({
      event_name: parsed.mappedEvent,
      event_time: Math.floor(Date.now() / 1000),
      event_id: parsed.eventId,
      action_source: 'website',
      custom_data: {
        value: parsed.value,
        currency: parsed.currency,
        order_id: parsed.orderId,
        content_name: parsed.productName,
        source: 'hotmart_webhook',
      },
      user_data: {
        email: parsed.buyer.email,
        phone: parsed.buyer.checkout_phone || parsed.buyer.phone,
        first_name: parsed.buyer.name ? String(parsed.buyer.name).split(' ')[0] : undefined,
        external_id: externalId,
        fbc: parsed.tracking.fbc,
        fbp: parsed.tracking.fbp,
      },
      ip,
      ua,
    });

    if (parsed.mappedEvent === 'Purchase') {
      const canceled = cancelLeadAutomations(externalId);
      await appendEventLog({ ts: new Date().toISOString(), source: 'automation', action: 'cancel_on_purchase', leadId: externalId, canceled });
    }

    await appendEventLog({
      ts: new Date().toISOString(),
      source: 'hotmart_webhook',
      event_name: parsed.mappedEvent,
      status: parsed.statusRaw,
      event_id: parsed.eventId,
      order_id: parsed.orderId,
      has_em: Boolean(parsed.buyer?.email),
      has_ph: Boolean(parsed.buyer?.checkout_phone || parsed.buyer?.phone),
      has_fbc: Boolean(parsed.tracking?.fbc),
      has_fbp: Boolean(parsed.tracking?.fbp),
      has_external_id: Boolean(externalId),
      meta: fbData,
    });

    return res.json({ ok: true, mappedEvent: parsed.mappedEvent, status: parsed.statusRaw, meta: fbData });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.meta || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Meta CAPI server rodando na porta ${PORT}`);
});
