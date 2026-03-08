import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json({ limit: '512kb' }));

const PORT = process.env.PORT || 3100;
const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;
const HOTMART_WEBHOOK_TOKEN = process.env.HOTMART_WEBHOOK_TOKEN;

if (!PIXEL_ID || !ACCESS_TOKEN) {
  console.error('Faltando META_PIXEL_ID ou META_ACCESS_TOKEN no ambiente.');
}

function sha256(value) {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

function normalizePhone(phone) {
  if (!phone) return undefined;
  return String(phone).replace(/\D/g, '');
}

function getClientMeta(req) {
  return {
    ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress,
    ua: req.headers['user-agent'],
  };
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
    data.status ||
    transaction.status ||
    purchase.status ||
    payload.status ||
    payload.event ||
    payload.event_name ||
    ''
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

  const valueRaw =
    purchase.price?.value ||
    purchase.value ||
    transaction.value ||
    data.price ||
    payload.price ||
    0;

  const value = Number(valueRaw) || 0;
  const currency =
    purchase.price?.currency_code ||
    purchase.currency ||
    data.currency ||
    payload.currency ||
    'BRL';

  const eventId =
    String(
      transaction.id ||
      purchase.order_id ||
      purchase.transaction ||
      data.id ||
      payload.id ||
      crypto.randomUUID()
    ) + `_${mappedEvent || 'unknown'}`;

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
  };
}

function validateHotmartToken(req) {
  if (!HOTMART_WEBHOOK_TOKEN) return false;
  const token =
    req.headers['x-hotmart-hottok'] ||
    req.headers['hottok'] ||
    req.query?.hottok ||
    req.body?.hottok ||
    req.body?.token;

  return String(token || '') === String(HOTMART_WEBHOOK_TOKEN);
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'meta-capi', pixelConfigured: Boolean(PIXEL_ID), hotmartWebhookConfigured: Boolean(HOTMART_WEBHOOK_TOKEN) });
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
      return res.json({ ok: true, ignored: true, reason: `status não mapeado: ${parsed.statusRaw}` });
    }

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
        external_id: parsed.orderId,
        fbc: parsed.payloadData?.tracking?.fbc,
        fbp: parsed.payloadData?.tracking?.fbp,
      },
      ip,
      ua,
    });

    return res.json({ ok: true, mappedEvent: parsed.mappedEvent, status: parsed.statusRaw, meta: fbData });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.meta || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Meta CAPI server rodando na porta ${PORT}`);
});
