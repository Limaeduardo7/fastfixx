import express from 'express';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import net from 'net';
import { createRequire } from 'module';
import nodemailer from 'nodemailer';

const require = createRequire(import.meta.url);
const { ParamBuilder } = require('capi-param-builder-nodejs');

const app = express();
app.set('trust proxy', true);
app.use(express.json({ limit: '512kb' }));

// Evolution can call /api/evolution/inbound/<event> when webhookByEvents=true
app.use((req, _res, next) => {
  if (req.path.startsWith('/api/evolution/inbound/')) {
    req.url = '/api/evolution/inbound';
  }
  next();
});

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
const CONTACT_MEMORY_DIR = process.env.CONTACT_MEMORY_DIR || '/root/fastfixx/capi-server/data/contacts';
const AGENT_ENABLED = String(process.env.WHATSAPP_AGENT_ENABLED || 'true') === 'true';
const AGENT_NAME = process.env.WHATSAPP_AGENT_NAME || 'Assistente FastFix';
const KIMI_ENABLED = String(process.env.WHATSAPP_KIMI_ENABLED || 'true') === 'true';
const KIMI_API_URL = process.env.KIMI_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';
const KIMI_API_KEY = process.env.KIMI_API_KEY || process.env.NVIDIA_API_KEY || '';
const KIMI_MODEL = process.env.KIMI_MODEL || 'moonshotai/kimi-k2.5';
const AGENT_MEMORY_FILE = process.env.WHATSAPP_AGENT_MEMORY_FILE || '/root/fastfixx/capi-server/whatsapp-agent-memory.md';
const OWNER_NOTIFY_PHONE = normalizePhone(process.env.WHATSAPP_OWNER_NOTIFY_PHONE || '');

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || 'FastFix Academy <contato@fastfixcaxias.com>';
const PARAM_BUILDER_DOMAINS = (process.env.PARAM_BUILDER_DOMAINS || '').split(',').map((d) => d.trim()).filter(Boolean);

function createParamBuilder() {
  return PARAM_BUILDER_DOMAINS.length ? new ParamBuilder(PARAM_BUILDER_DOMAINS) : new ParamBuilder();
}

if (!PIXEL_ID || !ACCESS_TOKEN) {
  console.error('Faltando META_PIXEL_ID ou META_ACCESS_TOKEN no ambiente.');
}

const scheduledJobs = new Map();
const processedHotmartEvents = new Map();
const processedHotmartPurchases = new Map();
let lastHotmartWebhook = null;
let cachedAgentMemory = null;
let cachedAgentMemoryAt = 0;

function contactMemoryPath(phone) {
  return path.join(CONTACT_MEMORY_DIR, `${normalizePhone(phone)}.json`);
}

async function readContactMemory(phone) {
  try {
    const file = contactMemoryPath(phone);
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {
      phone: normalizePhone(phone),
      firstSeenAt: new Date().toISOString(),
      offers: [],
      history: [],
      profile: {},
      tags: [],
    };
  }
}

async function saveContactMemory(phone, memory) {
  const file = contactMemoryPath(phone);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(memory, null, 2), 'utf8');
}

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

function normalizeIp(rawIp) {
  if (!rawIp) return undefined;
  let ip = String(rawIp).trim();

  // Remove formatos como: "for=1.2.3.4" ou "[2001:db8::1]:443"
  ip = ip.replace(/^for=/i, '').replace(/^"|"$/g, '');

  if (ip.startsWith('[') && ip.includes(']')) {
    ip = ip.slice(1, ip.indexOf(']'));
  } else if (/^\d+\.\d+\.\d+\.\d+:\d+$/.test(ip)) {
    ip = ip.split(':')[0];
  }

  // Remove zone id de IPv6 (ex.: fe80::1%eth0)
  ip = ip.split('%')[0];

  // IPv4-mapeado em IPv6 (::ffff:1.2.3.4)
  if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  return net.isIP(ip) ? ip : undefined;
}

function isPublicIp(ip) {
  if (!ip) return false;

  if (net.isIPv4(ip)) {
    if (ip.startsWith('10.') || ip.startsWith('127.') || ip.startsWith('192.168.')) return false;
    const secondOctet = Number(ip.split('.')[1]);
    if (ip.startsWith('172.') && secondOctet >= 16 && secondOctet <= 31) return false;
    if (ip.startsWith('169.254.')) return false;
    return true;
  }

  if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    if (normalized === '::1') return false;
    if (normalized.startsWith('fe80:')) return false; // link-local
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return false; // ULA
    return true;
  }

  return false;
}

function getClientMeta(req, bodyUserData = {}, eventName = '') {
  const xForwardedFor = String(req.headers['x-forwarded-for'] || '');
  const xffCandidates = xForwardedFor
    .split(',')
    .map((v) => normalizeIp(v))
    .filter(Boolean);

  const socketIp = normalizeIp(req.socket?.remoteAddress);
  const payloadIp = normalizeIp(bodyUserData?.client_ip_address);

  // Para InitiateCheckout, prioriza IP vindo da interação do cliente (quando válido).
  const ordered = eventName === 'InitiateCheckout'
    ? [payloadIp, ...xffCandidates, socketIp]
    : [...xffCandidates, socketIp, payloadIp];

  let ip;
  let ip_source;

  if (payloadIp && isPublicIp(payloadIp)) {
    ip = payloadIp;
    ip_source = 'payload_client_ip_address';
  } else {
    const firstPublicFromProxy = xffCandidates.find((candidate) => isPublicIp(candidate));
    if (firstPublicFromProxy) {
      ip = firstPublicFromProxy;
      ip_source = 'x_forwarded_for';
    } else if (socketIp && isPublicIp(socketIp)) {
      ip = socketIp;
      ip_source = 'socket_remote_address';
    }
  }

  return {
    ip: ip || undefined,
    ip_source: ip_source || 'none',
    ua: req.headers['user-agent'],
    ua_source: req.headers['user-agent'] ? 'request_header' : 'none',
    ip_candidates: ordered,
  };
}

function pickFirst(...values) {
  return values.find((v) => v !== undefined && v !== null && String(v).trim() !== '');
}

function parseCookies(rawCookie = '') {
  const cookies = {};
  for (const part of String(rawCookie || '').split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (!key) continue;
    cookies[key] = decodeURIComponent(rest.join('=') || '');
  }
  return cookies;
}

function applyParamBuilderCookies(res, req, cookiesToSet = []) {
  if (!Array.isArray(cookiesToSet) || !cookiesToSet.length) return;

  const isSecure = String(req.headers['x-forwarded-proto'] || '').includes('https') || req.secure;
  for (const cookie of cookiesToSet) {
    if (!cookie?.name || !cookie?.value) continue;

    const parts = [
      `${cookie.name}=${encodeURIComponent(cookie.value)}`,
      'Path=/',
      `Max-Age=${cookie.maxAge || 90 * 24 * 60 * 60}`,
      'SameSite=Lax',
    ];

    if (cookie.domain) parts.push(`Domain=${cookie.domain}`);
    if (isSecure) parts.push('Secure');

    res.append('Set-Cookie', parts.join('; '));
  }
}

function getBuilderContext(req, res) {
  try {
    const builder = createParamBuilder();
    const cookies = parseCookies(req.headers.cookie || '');
    const cookiesToSet = builder.processRequest(
      req.headers.host,
      req.query || {},
      cookies,
      req.headers.referer,
      req.headers['x-forwarded-for'] ?? null,
      req.socket?.remoteAddress ?? null
    );

    applyParamBuilderCookies(res, req, cookiesToSet);

    return {
      fbc: builder.getFbc(),
      fbp: builder.getFbp(),
      client_ip_address: builder.getClientIpAddress(),
    };
  } catch {
    return {};
  }
}

function normalizeForType(value, type) {
  if (!value) return undefined;
  const str = String(value).trim();
  if (!str) return undefined;

  if (type === 'phone') return normalizePhone(str);
  if (type === 'email' || type === 'external_id' || type === 'first_name' || type === 'last_name' || type === 'city' || type === 'state') {
    return str.toLowerCase();
  }

  return str.toLowerCase();
}

function hashPII(value, type) {
  if (!value) return undefined;
  try {
    const hashed = createParamBuilder().getNormalizedAndHashedPII(value, type);
    if (hashed) return hashed;
  } catch {
    // fallback abaixo
  }
  return sha256(normalizeForType(value, type));
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

function getEmailTransport() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const FLASH64_UPSELL_EMAILS = [
  { dayOffset: 0, subject: 'Seu próximo passo depois do Flash64', body: 'Você já fez a parte mais importante: começou.\n\nO Flash64 te dá direção técnica. Agora, pra acelerar resultado de bancada e faturamento, o próximo passo é o FastFix Academy.\n\n👉 https://fastfixcaxias.com' },
  { dayOffset: 1, subject: 'O erro que trava técnico bom', body: 'A maioria não trava por falta de vontade. Trava por falta de método completo.\n\nNo Academy você organiza diagnóstico, execução e tomada de decisão — sem depender de tentativa e erro.\n\n👉 https://fastfixcaxias.com' },
  { dayOffset: 3, subject: 'Como aumentar ticket sem aumentar volume', body: 'Troca simples dá giro. Reparo avançado dá margem.\n\nO Academy foi desenhado pra te levar para serviços mais valorizados, com processo replicável na bancada.\n\n👉 https://fastfixcaxias.com' },
  { dayOffset: 5, subject: '“Será que isso é pra mim?”', body: 'Se você já mexe com celular e quer evoluir no reparo de placas, sim — é pra você.\n\nFoco em prática, clareza de processo e aplicação real.\n\n👉 https://fastfixcaxias.com' },
  { dayOffset: 7, subject: 'Sem tempo? leia isso em 30 segundos', body: 'Resumo direto:\n- conteúdo técnico aplicado\n- foco em resultado de bancada\n- caminho pra aumentar ticket com segurança\n\n👉 https://fastfixcaxias.com' },
  { dayOffset: 10, subject: 'O que muda quando você profissionaliza o processo', body: 'Quando você tem método: reduz retrabalho, melhora confiança no diagnóstico e cresce faturamento com previsibilidade.\n\n👉 https://fastfixcaxias.com' },
  { dayOffset: 14, subject: 'Último convite (por enquanto)', body: 'Se você quer dar o próximo passo depois do Flash64, esse é o momento.\n\n👉 https://fastfixcaxias.com' },
];

async function sendEmailNow({ to, subject, body }) {
  const transport = getEmailTransport();
  if (!transport) throw new Error('SMTP não configurado (SMTP_HOST/SMTP_USER/SMTP_PASS)');
  return transport.sendMail({ from: SMTP_FROM, to, subject, text: body });
}

function scheduleFlash64UpsellEmails({ leadId, email, name = '' }) {
  if (!email) return [];
  const jobs = [];
  for (const step of FLASH64_UPSELL_EMAILS) {
    const id = crypto.randomUUID();
    const delayMs = step.dayOffset * 24 * 60 * 60 * 1000;
    const executeAt = Date.now() + delayMs;
    const personalizedBody = `${name ? `Olá, ${name}!\n\n` : ''}${step.body}`;
    const job = {
      id,
      leadId,
      flow: 'flash64_email_upsell',
      step: `d${step.dayOffset}`,
      email,
      subject: step.subject,
      body: personalizedBody,
      delayMs,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      executeAt: new Date(executeAt).toISOString(),
      meta: { channel: 'email' },
    };

    const timeoutId = setTimeout(async () => {
      const current = scheduledJobs.get(id);
      if (!current || current.status !== 'scheduled') return;
      try {
        const result = await sendEmailNow({ to: current.email, subject: current.subject, body: current.body });
        current.status = 'sent';
        current.sentAt = new Date().toISOString();
        current.emailResult = { messageId: result?.messageId };
        await appendEventLog({ ts: current.sentAt, source: 'automation_email', action: 'sent', leadId, email: current.email, step: current.step });
      } catch (err) {
        current.status = 'failed';
        current.error = err.message;
        current.failedAt = new Date().toISOString();
        await appendEventLog({ ts: current.failedAt, source: 'automation_email', action: 'failed', leadId, email: current.email, step: current.step, error: err.message });
      }
      scheduledJobs.set(id, current);
      await persistJobs();
    }, delayMs);

    job.timeoutId = timeoutId;
    scheduledJobs.set(id, job);
    jobs.push(job);
  }

  persistJobs().catch(() => {});
  return jobs;
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

function cancelFlash64UpsellEmailFlow({ leadId, email }) {
  let canceled = 0;
  const normalizedEmail = email ? String(email).trim().toLowerCase() : null;

  for (const [id, job] of scheduledJobs.entries()) {
    const sameLead = leadId && job.leadId === leadId;
    const sameEmail = normalizedEmail && job.email && String(job.email).trim().toLowerCase() === normalizedEmail;
    const isUpsellEmail = job.flow === 'flash64_email_upsell';

    if (isUpsellEmail && job.status === 'scheduled' && (sameLead || sameEmail)) {
      clearTimeout(job.timeoutId);
      job.status = 'canceled';
      job.canceledAt = new Date().toISOString();
      job.cancelReason = 'upsell_purchased';
      scheduledJobs.set(id, job);
      canceled += 1;
    }
  }

  persistJobs().catch(() => {});
  return canceled;
}

function cancelFlash64UpsellWhatsAppFlow({ leadId, phone }) {
  let canceled = 0;
  const normalizedPhone = normalizePhone(phone);

  for (const [id, job] of scheduledJobs.entries()) {
    const sameLead = leadId && job.leadId === leadId;
    const samePhone = normalizedPhone && job.phone && normalizePhone(job.phone) === normalizedPhone;
    const isUpsellWhatsApp = job.flow === 'flash64_whatsapp_upsell';

    if (isUpsellWhatsApp && job.status === 'scheduled' && (sameLead || samePhone)) {
      clearTimeout(job.timeoutId);
      job.status = 'canceled';
      job.canceledAt = new Date().toISOString();
      job.cancelReason = 'upsell_purchased';
      scheduledJobs.set(id, job);
      canceled += 1;
    }
  }

  persistJobs().catch(() => {});
  return canceled;
}

function detectIntent(message = '') {
  const text = String(message || '').toLowerCase().trim();

  if (/\b(sair|parar|cancelar|remover|descadastrar|não quero|nao quero|stop)\b/.test(text)) return 'opt_out';
  if (/\b(voltar|retomar|quero voltar|ativar)\b/.test(text)) return 'resume';
  if (/\b(link|comprar|checkout|inscri|matr[ií]cula|quero entrar|quero comprar|tenho interesse|manda o link)\b/.test(text)) return 'checkout';
  if (/\b(preço|preco|valor|quanto|custa|investimento)\b/.test(text)) return 'price';
  if (/\b(parcela|parcelado|parcelamento|cart[aã]o|pix|boleto|pagamento)\b/.test(text)) return 'payment';
  if (/\b(conte[uú]do|m[oó]dulo|aula|acesso|garantia|certificado|suporte)\b/.test(text)) return 'content';
  if (/\b(n[aã]o confio|golpe|confi[aá]vel|funciona mesmo|vale a pena)\b/.test(text)) return 'trust';
  if (/\b(caro|sem dinheiro|sem grana|depois|agora n[aã]o|to sem)\b/.test(text)) return 'objection_price';
  if (/\b(atendente|humano|falar com pessoa|falar com vendedor)\b/.test(text)) return 'human';
  if (/\b(diagn[oó]stico|diagnostico|an[aá]lise|analise|defeito)\b/.test(text)) return 'need_diagnosis';
  if (/\b(execu[cç][aã]o|execucao|bancada|procedimento|reparo)\b/.test(text)) return 'need_execution';
  if (/\b(fechamento|or[cç]amento|orcamento|cliente|venda|aprova[cç][aã]o|aprovacao)\b/.test(text)) return 'need_closing';
  if (/\b(oi|olá|ola|bom dia|boa tarde|boa noite)\b/.test(text)) return 'greeting';
  return 'fallback';
}

async function getAgentMemoryText() {
  const now = Date.now();
  if (cachedAgentMemory && now - cachedAgentMemoryAt < 60_000) {
    return cachedAgentMemory;
  }

  try {
    const text = await fs.readFile(AGENT_MEMORY_FILE, 'utf8');
    cachedAgentMemory = text;
    cachedAgentMemoryAt = now;
    return text;
  } catch {
    const fallback = 'Atendimento consultivo para vender o FastFix Academy com tom humano, curto e focado em conversão.';
    cachedAgentMemory = fallback;
    cachedAgentMemoryAt = now;
    return fallback;
  }
}

async function generateAgentReply(message = '', contactMemory = {}) {
  const intent = detectIntent(message);
  const lastOffer = contactMemory?.offers?.[contactMemory.offers.length - 1]?.name || 'FastFix Academy';

  if (contactMemory?.status === 'opted_out' && intent !== 'resume') {
    return { intent: 'opted_out_silence', reply: null };
  }

  if (intent === 'opt_out') {
    return { intent, reply: 'Perfeito, vou pausar as mensagens por aqui ✅ Se quiser voltar, é só me mandar "voltar".' };
  }

  if (intent === 'resume') {
    return { intent, reply: `Fechado! Reativei seu atendimento 🙌 Eu sou o ${AGENT_NAME}.` };
  }

  if (!KIMI_ENABLED || !KIMI_API_KEY) {
    return { intent, reply: 'Posso te ajudar com valores, conteúdo, pagamento e link de inscrição. Me diz em uma frase o que você precisa agora.' };
  }

  const history = Array.isArray(contactMemory?.history) ? contactMemory.history.slice(-8) : [];
  const historyText = history
    .map((item) => `Cliente: ${item.inbound || ''}\nAssistente: ${item.reply || ''}`)
    .join('\n\n');

  const agentMemory = await getAgentMemoryText();

  const systemPrompt = `Você é ${AGENT_NAME}, atendente comercial no WhatsApp da FastFix Academy.
Responda em português do Brasil, tom humano, curto (máx. 3 frases), sem cara de robô.
Não use mensagens prontas repetitivas.
Objetivo: entender a dúvida e avançar a conversa para conversão com naturalidade.
Se o cliente pedir link/compra, use exatamente: https://fastfixcaxias.com
Se pedirem para parar, confirme pausa e diga que pode voltar com "voltar".
Não invente preços se não tiver certeza; ofereça enviar o link oficial para detalhes.
Produto principal: ${lastOffer}.

MEMÓRIA E INSTRUÇÕES DO AGENTE (obrigatório seguir):
${agentMemory}`;

  const userPrompt = `Último texto do cliente: ${String(message || '').trim()}
Intent detectada: ${intent}

Contexto recente (se houver):
${historyText || 'Sem histórico'}

Gere apenas a resposta que será enviada no WhatsApp.`;

  const payload = {
    model: KIMI_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: 800,
    temperature: 0.7,
    top_p: 1,
    stream: false,
    chat_template_kwargs: { thinking: true },
  };

  try {
    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KIMI_API_KEY}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Kimi API falhou (${response.status})`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return { intent, reply: 'Perfeito. Me diz sua principal dúvida agora e eu te respondo direto.' };
    }

    return { intent, reply };
  } catch (error) {
    console.error('Erro Kimi WhatsApp agent:', error?.message || error);
    return { intent, reply: 'Tive uma instabilidade rápida aqui. Me diz sua dúvida em uma frase que eu já te respondo.' };
  }
}

function compactObject(obj = {}) {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value !== ''));
}

function buildMetaPayload({
  event_name,
  event_time,
  event_id,
  event_source_url,
  action_source = 'website',
  custom_data = {},
  user_data = {},
  ip,
  ua,
  data_processing_options,
  data_processing_options_country,
  data_processing_options_state,
  opt_out,
  partner_agent,
  test_event_code,
}) {
  const normalizedUserData = compactObject({
    client_ip_address: ip,
    client_user_agent: ua,
    fbc: user_data.fbc,
    fbp: user_data.fbp,
    em: hashPII(user_data.email, 'email'),
    ph: hashPII(user_data.phone, 'phone'),
    fn: hashPII(user_data.first_name, 'first_name'),
    ln: hashPII(user_data.last_name, 'last_name'),
    external_id: hashPII(user_data.external_id, 'external_id'),
  });

  const dataItem = compactObject({
    event_name,
    event_time: event_time || Math.floor(Date.now() / 1000),
    event_id,
    event_source_url,
    action_source,
    custom_data: compactObject(custom_data),
    user_data: normalizedUserData,
    data_processing_options,
    data_processing_options_country,
    data_processing_options_state,
    opt_out,
  });

  const payload = {
    data: [dataItem],
  };

  if (partner_agent) payload.partner_agent = partner_agent;
  if (test_event_code || TEST_EVENT_CODE) payload.test_event_code = test_event_code || TEST_EVENT_CODE;

  return payload;
}

function validatePayloadLikeMetaHelper(payload = {}) {
  const issues = [];
  const event = payload?.data?.[0] || {};
  const user = event.user_data || {};

  if (!event.event_name) issues.push('event_name ausente');
  if (!event.action_source) issues.push('action_source ausente');
  if (!event.event_time) issues.push('event_time ausente');
  if (event.action_source === 'website' && !event.event_source_url) {
    issues.push('event_source_url recomendado para action_source=website');
  }

  if (!user.fbc && !user.fbp) issues.push('fbc/fbp ausentes (recomendado ter pelo menos um)');
  if (!user.client_ip_address) issues.push('client_ip_address ausente');
  if (!user.client_user_agent) issues.push('client_user_agent ausente');

  return {
    ok: issues.length === 0,
    issues,
  };
}

async function sendMetaEvent(input) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    throw new Error('Servidor CAPI sem configuração de credenciais');
  }

  const payload = buildMetaPayload(input);
  const validation = validatePayloadLikeMetaHelper(payload);

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
    err.payloadValidation = validation;
    throw err;
  }

  return { fbData, payload, payloadValidation: validation };
}

function parseEventTime(value) {
  if (value === undefined || value === null || value === '') return undefined;

  if (typeof value === 'number') {
    // Se vier em milissegundos
    if (value > 1e12) return Math.floor(value / 1000);
    // Se vier em segundos unix
    if (value > 1e9) return Math.floor(value);
  }

  const str = String(value).trim();
  if (!str) return undefined;

  // Numérico em string
  if (/^\d+$/.test(str)) {
    const num = Number(str);
    if (num > 1e12) return Math.floor(num / 1000);
    if (num > 1e9) return Math.floor(num);
  }

  const parsed = Date.parse(str);
  if (!Number.isNaN(parsed)) return Math.floor(parsed / 1000);
  return undefined;
}

function normalizeCurrencyValue(raw) {
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0) return 0;

  // Hotmart costuma enviar em unidades monetárias (347.00),
  // mas alguns payloads podem vir em centavos (34700).
  // Heurística conservadora para ticket baixo/médio de infoproduto.
  if (Number.isInteger(num) && num >= 1000) {
    return Number((num / 100).toFixed(2));
  }

  return Number(num.toFixed(2));
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

  const rawEventName = (payload.event_name || payload.event || data.event || '').toString().toLowerCase();

  let mappedEvent = null;
  const isApproved = statusRaw.includes('purchase_approved') || statusRaw === 'approved' || statusRaw.includes('_approved');
  const isPurchaseCompleted = rawEventName.includes('purchase') && statusRaw.includes('completed');

  if (isApproved || isPurchaseCompleted) {
    mappedEvent = 'Purchase';
  } else if (statusRaw.includes('billet') || statusRaw.includes('pix') || statusRaw.includes('generated') || statusRaw.includes('printed')) {
    mappedEvent = 'AddPaymentInfo';
  } else if (statusRaw.includes('refunded') || statusRaw.includes('chargeback') || statusRaw.includes('canceled')) {
    mappedEvent = 'Refund';
  }

  const valueRaw = purchase.price?.value || purchase.value || transaction.value || data.price || payload.price || 0;
  const value = normalizeCurrencyValue(valueRaw);
  const currency = purchase.price?.currency_code || purchase.currency || data.currency || payload.currency || 'BRL';
  const orderId = purchase.order_id || transaction.order_id || data.order_id || payload.order_id;
  const transactionId = transaction.id || purchase.transaction || data.transaction_id || payload.transaction;
  const tracking = extractTracking(payload);
  const userId = pickFirst(
    data.user_id,
    payload.user_id,
    buyer.user_id,
    buyer.id,
    buyer.code,
    data.subscriber_code,
    data.user_code
  );
  const eventTime =
    parseEventTime(data.event_date) ||
    parseEventTime(data.purchase_date) ||
    parseEventTime(transaction.date_approved) ||
    parseEventTime(transaction.approved_date) ||
    parseEventTime(transaction.created_at) ||
    parseEventTime(purchase.approved_date) ||
    parseEventTime(purchase.created_at) ||
    parseEventTime(payload.event_date) ||
    parseEventTime(payload.created_at);

  const baseIdRaw = pickFirst(transactionId, orderId, data.id, payload.id);
  const fallbackStableId = crypto
    .createHash('sha1')
    .update(JSON.stringify({
      mappedEvent,
      statusRaw,
      eventTime,
      email: buyer?.email,
      phone: buyer?.checkout_phone || buyer?.phone,
      value,
      currency,
      product: product.name || data.product_name,
    }))
    .digest('hex');
  const baseId = String(baseIdRaw || fallbackStableId);
  const eventId = `${mappedEvent || 'unknown'}_${baseId}`;

  return {
    mappedEvent,
    statusRaw,
    eventId,
    eventTime,
    value,
    currency,
    orderId: orderId || transactionId || baseIdRaw,
    transactionId: transactionId || orderId || baseIdRaw,
    userId,
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

function isDuplicateHotmartEvent(eventId) {
  const now = Date.now();
  const ttlMs = 72 * 60 * 60 * 1000; // 72h

  for (const [id, ts] of processedHotmartEvents.entries()) {
    if (now - ts > ttlMs) processedHotmartEvents.delete(id);
  }

  if (processedHotmartEvents.has(eventId)) return true;
  processedHotmartEvents.set(eventId, now);
  return false;
}

function getHotmartPurchaseDedupKey(parsed = {}) {
  if (parsed.mappedEvent !== 'Purchase') return null;
  return pickFirst(
    parsed.transactionId && `txn:${parsed.transactionId}`,
    parsed.orderId && `order:${parsed.orderId}`
  );
}

function isDuplicateHotmartPurchase(parsed = {}) {
  const dedupKey = getHotmartPurchaseDedupKey(parsed);
  if (!dedupKey) return false;

  const now = Date.now();
  const ttlMs = 30 * 24 * 60 * 60 * 1000; // 30 dias

  for (const [id, ts] of processedHotmartPurchases.entries()) {
    if (now - ts > ttlMs) processedHotmartPurchases.delete(id);
  }

  if (processedHotmartPurchases.has(dedupKey)) return true;
  processedHotmartPurchases.set(dedupKey, now);
  return false;
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

app.get('/api/hotmart/last', async (_req, res) => {
  return res.json({ ok: true, last: lastHotmartWebhook });
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

function scheduleCheckoutAbandonFlow({ phone, name = 'Tudo bem?', leadId, source = 'manual' }) {
  const canceled = cancelLeadAutomations(leadId);

  const jobs = [
    scheduleAutomation({
      leadId,
      flow: 'checkout_abandon',
      step: '15m',
      phone,
      delayMs: 15 * 60 * 1000,
      text: `Oi ${name}, vi que você quase concluiu sua inscrição na FastFix.\nSe travou em algo (pagamento, acesso, dúvida), me chama que resolvo agora 👍`,
      meta: { source },
    }),
    scheduleAutomation({
      leadId,
      flow: 'checkout_abandon',
      step: '2h',
      phone,
      delayMs: 2 * 60 * 60 * 1000,
      text: `Passando para te lembrar da sua vaga na FastFix 🚀\nQuer que eu te envie o link direto para finalizar?`,
      meta: { source },
    }),
    scheduleAutomation({
      leadId,
      flow: 'checkout_abandon',
      step: '24h',
      phone,
      delayMs: 24 * 60 * 60 * 1000,
      text: `Último aviso por aqui: sua condição especial pode encerrar em breve ⏳\nSe quiser garantir agora, eu te mando o link em 1 clique.`,
      meta: { source },
    }),
  ];

  appendEventLog({
    ts: new Date().toISOString(),
    source: 'automation',
    action: 'checkout_abandon_scheduled',
    leadId,
    phone: normalizePhone(phone),
    canceled_previous_jobs: canceled,
    jobs: jobs.map((j) => ({ id: j.id, step: j.step, executeAt: j.executeAt })),
  }).catch(() => {});

  return jobs;
}

function scheduleFlash64WhatsAppUpsellFlow({ phone, name = 'Tudo bem?', leadId, source = 'manual' }) {
  const canceled = cancelFlash64UpsellWhatsAppFlow({ leadId, phone });

  const jobs = [
    scheduleAutomation({
      leadId,
      flow: 'flash64_whatsapp_upsell',
      step: 'd0',
      phone,
      delayMs: 15 * 1000,
      text: `Fala, ${name}! 👊 Vi que você adquiriu o Flash 64.\nSe quiser evoluir para reparo avançado e aumentar ticket de bancada, o próximo passo é o FastFix Academy.\nQuer que eu te envie o link?`,
      meta: { source },
    }),
    scheduleAutomation({
      leadId,
      flow: 'flash64_whatsapp_upsell',
      step: 'd1',
      phone,
      delayMs: 24 * 60 * 60 * 1000,
      text: `Passando pra reforçar: o Academy é o caminho mais rápido pra transformar o conteúdo do Flash64 em resultado de bancada.\nQuer o link da página?`,
      meta: { source },
    }),
    scheduleAutomation({
      leadId,
      flow: 'flash64_whatsapp_upsell',
      step: 'd3',
      phone,
      delayMs: 3 * 24 * 60 * 60 * 1000,
      text: `Sem pressão, ${name}. Mas se a ideia é subir faturamento com reparo avançado, vale muito conhecer o FastFix Academy.\nTe mando o link agora?`,
      meta: { source },
    }),
    scheduleAutomation({
      leadId,
      flow: 'flash64_whatsapp_upsell',
      step: 'd7',
      phone,
      delayMs: 7 * 24 * 60 * 60 * 1000,
      text: `Último lembrete por aqui: se quiser entrar no FastFix Academy, eu te envio o link da página e te explico as condições atuais.`,
      meta: { source },
    }),
  ];

  appendEventLog({
    ts: new Date().toISOString(),
    source: 'automation',
    action: 'flash64_whatsapp_upsell_scheduled',
    leadId,
    phone: normalizePhone(phone),
    canceled_previous_jobs: canceled,
    jobs: jobs.map((j) => ({ id: j.id, step: j.step, executeAt: j.executeAt })),
  }).catch(() => {});

  return jobs;
}

app.post('/api/automation/checkout-abandon', async (req, res) => {
  const { phone, name = 'Tudo bem?', lead_id } = req.body || {};
  if (!phone || !lead_id) return res.status(400).json({ ok: false, error: 'phone e lead_id são obrigatórios' });

  const jobs = scheduleCheckoutAbandonFlow({ phone, name, leadId: lead_id, source: 'manual_api' });

  return res.json({ ok: true, jobs: jobs.map((j) => ({ ...j, timeoutId: undefined })) });
});

app.post('/api/automation/whatsapp/flash64-upsell', async (req, res) => {
  try {
    const { lead_id, phone, name } = req.body || {};
    if (!lead_id || !phone) return res.status(400).json({ ok: false, error: 'lead_id e phone são obrigatórios' });

    const jobs = scheduleFlash64WhatsAppUpsellFlow({ leadId: lead_id, phone, name: name || 'Tudo bem?', source: 'manual_api' });
    return res.json({ ok: true, jobs: jobs.map((j) => ({ ...j, timeoutId: undefined })) });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/automation/email/flash64-upsell', async (req, res) => {
  try {
    const { lead_id, email, name } = req.body || {};
    if (!lead_id || !email) return res.status(400).json({ ok: false, error: 'lead_id e email são obrigatórios' });

    const jobs = scheduleFlash64UpsellEmails({ leadId: lead_id, email, name });
    await appendEventLog({
      ts: new Date().toISOString(),
      source: 'automation_email',
      action: 'scheduled_manual',
      leadId: lead_id,
      email,
      jobs: jobs.map((j) => ({ id: j.id, step: j.step, executeAt: j.executeAt })),
    });

    return res.json({ ok: true, jobs: jobs.map((j) => ({ ...j, timeoutId: undefined, body: undefined })) });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/evolution/inbound', async (req, res) => {
  try {
    const payload = req.body || {};
    let data = payload.data || payload;

    // Evolution may deliver base64 payloads depending on webhook settings
    if (typeof data === 'string') {
      try {
        const decoded = Buffer.from(data, 'base64').toString('utf8');
        const parsed = JSON.parse(decoded);
        data = parsed?.data || parsed;
      } catch {
        // keep original data when decode fails
      }
    }

    if (data.key?.fromMe === true || data.fromMe === true) {
      return res.json({ ok: true, ignored: true, reason: 'from_me' });
    }

    const phone = normalizePhone(
      data.key?.remoteJid?.replace('@s.whatsapp.net', '') ||
      data.from ||
      data.sender ||
      data.phone
    );

    const text =
      data.message?.conversation ||
      data.message?.extendedTextMessage?.text ||
      data.text ||
      '';

    if (!phone || !text) {
      await appendEventLog({
        ts: new Date().toISOString(),
        source: 'whatsapp_agent',
        ignored: true,
        reason: 'missing_phone_or_text',
        hasPhone: Boolean(phone),
        hasText: Boolean(text),
      });
      return res.json({ ok: true, ignored: true, reason: 'sem phone/text' });
    }

    let contactMemory = await readContactMemory(phone);

    const hasPriorConversation =
      Boolean(contactMemory?.lastInboundAt) ||
      (Array.isArray(contactMemory?.history) && contactMemory.history.length > 0) ||
      Boolean(contactMemory?.ownerConversationNotifiedAt);

    if (OWNER_NOTIFY_PHONE && OWNER_NOTIFY_PHONE !== phone && !hasPriorConversation) {
      const now = new Date().toISOString();
      const inboundPreview = String(text).slice(0, 700);
      const notifyText = `📩 Nova conversa no WhatsApp\nDe: ${phone}\nMensagem: ${inboundPreview}`;
      try {
        await sendWhatsAppText(OWNER_NOTIFY_PHONE, notifyText);
        contactMemory.ownerConversationNotifiedAt = now;
        contactMemory.updatedAt = now;
        await saveContactMemory(phone, contactMemory);
        await appendEventLog({
          ts: now,
          source: 'whatsapp_notify',
          action: 'owner_notified_new_conversation',
          from: phone,
          to: OWNER_NOTIFY_PHONE,
        });
      } catch (notifyError) {
        await appendEventLog({
          ts: now,
          source: 'whatsapp_notify',
          action: 'owner_notify_failed',
          from: phone,
          to: OWNER_NOTIFY_PHONE,
          error: notifyError.message,
        });
      }
    }

    if (!AGENT_ENABLED) {
      await appendEventLog({ ts: new Date().toISOString(), source: 'whatsapp_agent', ignored: true, reason: 'agent_disabled' });
      return res.json({ ok: true, ignored: true, reason: 'agent desativado' });
    }

    contactMemory = await readContactMemory(phone);
    const { intent, reply } = await generateAgentReply(text, contactMemory);

    const now = new Date().toISOString();
    if (!reply) {
      await appendEventLog({ ts: now, source: 'whatsapp_agent', phone, inbound: text, intent, ignored: true, reason: 'no_reply' });
      return res.json({ ok: true, phone, intent, ignored: true, reason: 'no_reply' });
    }

    const evolution = await sendWhatsAppText(phone, reply);
    contactMemory.phone = phone;
    contactMemory.lastIntent = intent;
    contactMemory.lastInboundAt = now;
    contactMemory.lastReplyAt = now;
    contactMemory.updatedAt = now;
    contactMemory.history = Array.isArray(contactMemory.history) ? contactMemory.history : [];
    contactMemory.tags = Array.isArray(contactMemory.tags) ? contactMemory.tags : [];
    contactMemory.offers = Array.isArray(contactMemory.offers) ? contactMemory.offers : [];
    contactMemory.history.push({ at: now, inbound: text, intent, reply });
    if (contactMemory.history.length > 50) contactMemory.history = contactMemory.history.slice(-50);

    if (intent === 'opt_out') {
      contactMemory.status = 'opted_out';
      if (!contactMemory.tags.includes('opt_out')) contactMemory.tags.push('opt_out');
    } else if (intent === 'resume') {
      contactMemory.status = 'active';
      contactMemory.tags = (contactMemory.tags || []).filter((t) => t !== 'opt_out');
    }

    await saveContactMemory(phone, contactMemory);

    await appendEventLog({
      ts: now,
      source: 'whatsapp_agent',
      phone,
      inbound: text,
      intent,
      reply,
    });

    return res.json({ ok: true, phone, intent, reply, evolution });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/meta/payload-helper', async (req, res) => {
  try {
    const {
      event_name,
      event_time,
      event_id,
      event_source_url,
      action_source = 'website',
      custom_data = {},
      user_data = {},
      data_processing_options,
      data_processing_options_country,
      data_processing_options_state,
      opt_out,
      partner_agent,
      test_event_code,
    } = req.body || {};

    const builderCtx = getBuilderContext(req, res);
    const enrichedUserData = {
      ...user_data,
      fbc: pickFirst(user_data?.fbc, builderCtx.fbc),
      fbp: pickFirst(user_data?.fbp, builderCtx.fbp),
      client_ip_address: pickFirst(user_data?.client_ip_address, builderCtx.client_ip_address),
    };

    const clientMeta = getClientMeta(req, enrichedUserData, event_name);
    const finalIp = pickFirst(clientMeta.ip, normalizeIp(enrichedUserData.client_ip_address));
    const finalUa = pickFirst(req.headers['user-agent'], enrichedUserData.client_user_agent);

    const payload = buildMetaPayload({
      event_name,
      event_time,
      event_id,
      event_source_url,
      action_source,
      custom_data,
      user_data: enrichedUserData,
      ip: finalIp,
      ua: finalUa,
      data_processing_options,
      data_processing_options_country,
      data_processing_options_state,
      opt_out,
      partner_agent,
      test_event_code,
    });

    const validation = validatePayloadLikeMetaHelper(payload);

    return res.json({
      ok: true,
      payload,
      validation,
      hints: {
        ip_source: clientMeta.ip_source,
        ua_source: clientMeta.ua_source,
      },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/meta/events', async (req, res) => {
  try {
    const {
      event_name,
      event_time,
      event_id,
      event_source_url,
      action_source = 'website',
      custom_data = {},
      user_data = {},
      data_processing_options,
      data_processing_options_country,
      data_processing_options_state,
      opt_out,
      partner_agent,
      test_event_code,
    } = req.body || {};

    const builderCtx = getBuilderContext(req, res);
    const enrichedUserData = {
      ...user_data,
      fbc: pickFirst(user_data?.fbc, builderCtx.fbc),
      fbp: pickFirst(user_data?.fbp, builderCtx.fbp),
      client_ip_address: pickFirst(user_data?.client_ip_address, builderCtx.client_ip_address),
    };

    const clientMeta = getClientMeta(req, enrichedUserData, event_name);
    const finalIp = pickFirst(clientMeta.ip, normalizeIp(enrichedUserData.client_ip_address));
    const finalUa = pickFirst(req.headers['user-agent'], enrichedUserData.client_user_agent);

    if (!event_name) {
      return res.status(400).json({ ok: false, error: 'event_name é obrigatório' });
    }

    const { fbData, payload, payloadValidation } = await sendMetaEvent({
      event_name,
      event_time,
      event_id,
      event_source_url,
      action_source,
      custom_data,
      user_data: enrichedUserData,
      ip: finalIp,
      ua: finalUa,
      data_processing_options,
      data_processing_options_country,
      data_processing_options_state,
      opt_out,
      partner_agent,
      test_event_code,
    });

    await appendEventLog({
      ts: new Date().toISOString(),
      source: 'site_capi',
      event_name,
      event_id,
      has_em: Boolean(enrichedUserData?.email),
      has_ph: Boolean(enrichedUserData?.phone),
      has_fbc: Boolean(enrichedUserData?.fbc),
      has_fbp: Boolean(enrichedUserData?.fbp),
      has_external_id: Boolean(enrichedUserData?.external_id),
      external_id: enrichedUserData?.external_id || null,
      has_client_ip_address: Boolean(finalIp),
      ip_source: clientMeta.ip_source,
      has_client_user_agent: Boolean(finalUa),
      payload_validation_ok: payloadValidation.ok,
      payload_validation_issues: payloadValidation.issues,
      meta: fbData,
    });

    res.json({ ok: true, meta: fbData, payload_validation: payloadValidation, sent_payload_preview: payload });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.meta || error.message, payload_validation: error.payloadValidation });
  }
});

app.post('/api/hotmart/webhook', async (req, res) => {
  try {
    if (!validateHotmartToken(req)) {
      return res.status(401).json({ ok: false, error: 'Token do webhook Hotmart inválido' });
    }

    const clientMeta = getClientMeta(req);
    const parsed = parseHotmartPayload(req.body || {});

    lastHotmartWebhook = {
      at: new Date().toISOString(),
      statusRaw: parsed.statusRaw,
      mappedEvent: parsed.mappedEvent,
      eventId: parsed.eventId,
      eventTime: parsed.eventTime,
      value: parsed.value,
      currency: parsed.currency,
      orderId: parsed.orderId,
      buyer: {
        email: parsed.buyer?.email,
        phone: parsed.buyer?.checkout_phone || parsed.buyer?.phone,
        name: parsed.buyer?.name,
      },
      tracking: parsed.tracking,
    };

    if (!parsed.mappedEvent) {
      await appendEventLog({ ts: new Date().toISOString(), source: 'hotmart_webhook', ignored: true, status: parsed.statusRaw });
      return res.json({ ok: true, ignored: true, reason: `status não mapeado: ${parsed.statusRaw}` });
    }

    if (isDuplicateHotmartEvent(parsed.eventId)) {
      await appendEventLog({ ts: new Date().toISOString(), source: 'hotmart_webhook', ignored: true, reason: 'duplicate_event_id', event_id: parsed.eventId });
      return res.json({ ok: true, ignored: true, reason: 'duplicate_event_id', eventId: parsed.eventId });
    }

    if (isDuplicateHotmartPurchase(parsed)) {
      const dedupKey = getHotmartPurchaseDedupKey(parsed);
      await appendEventLog({
        ts: new Date().toISOString(),
        source: 'hotmart_webhook',
        ignored: true,
        reason: 'duplicate_purchase_transaction',
        event_id: parsed.eventId,
        order_id: parsed.orderId,
        transaction_id: parsed.transactionId,
        dedup_key: dedupKey,
      });
      return res.json({ ok: true, ignored: true, reason: 'duplicate_purchase_transaction', dedupKey });
    }

    const externalId = pickFirst(parsed.tracking.external_id, parsed.orderId, parsed.transactionId);

    const { fbData, payloadValidation } = await sendMetaEvent({
      event_name: parsed.mappedEvent,
      event_time: parsed.eventTime || Math.floor(Date.now() / 1000),
      event_id: parsed.eventId,
      action_source: 'website',
      custom_data: {
        value: parsed.value,
        currency: parsed.currency,
        order_id: parsed.orderId,
        transaction_id: parsed.transactionId,
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
      ip: clientMeta.ip,
      ua: clientMeta.ua,
    });

    if (parsed.mappedEvent === 'Purchase') {
      const canceled = cancelLeadAutomations(externalId);
      await appendEventLog({ ts: new Date().toISOString(), source: 'automation', action: 'cancel_on_purchase', leadId: externalId, canceled });

      const productName = String(parsed.productName || '').toLowerCase();
      const isFlash64 = productName.includes('flash 64');
      const isFastFixUpsell = productName.includes('fastfix academy') || productName.includes('fastfix');
      const buyerEmail = parsed.buyer?.email;
      const buyerPhone = parsed.buyer?.checkout_phone || parsed.buyer?.phone;
      const buyerName = parsed.buyer?.name;
      const firstName = buyerName ? String(buyerName).split(' ')[0] : 'Tudo bem?';

      if (isFlash64 && buyerEmail && externalId) {
        const emailJobs = scheduleFlash64UpsellEmails({
          leadId: externalId,
          email: buyerEmail,
          name: firstName,
        });

        await appendEventLog({
          ts: new Date().toISOString(),
          source: 'automation_email',
          action: 'scheduled_from_hotmart_purchase',
          leadId: externalId,
          orderId: parsed.orderId,
          email: buyerEmail,
          jobs: emailJobs.map((j) => ({ id: j.id, step: j.step, executeAt: j.executeAt })),
        });
      }

      if (isFlash64 && buyerPhone && externalId) {
        const whatsappJobs = scheduleFlash64WhatsAppUpsellFlow({
          leadId: externalId,
          phone: buyerPhone,
          name: firstName,
          source: 'hotmart_flash64_purchase',
        });

        await appendEventLog({
          ts: new Date().toISOString(),
          source: 'automation',
          action: 'scheduled_whatsapp_from_hotmart_purchase',
          leadId: externalId,
          orderId: parsed.orderId,
          phone: normalizePhone(buyerPhone),
          jobs: whatsappJobs.map((j) => ({ id: j.id, step: j.step, executeAt: j.executeAt })),
        });
      }

      if (isFastFixUpsell) {
        const canceledEmailJobs = cancelFlash64UpsellEmailFlow({ leadId: externalId, email: buyerEmail });
        const canceledWhatsAppJobs = cancelFlash64UpsellWhatsAppFlow({ leadId: externalId, phone: buyerPhone });
        await appendEventLog({
          ts: new Date().toISOString(),
          source: 'automation_email',
          action: 'canceled_on_upsell_purchase',
          leadId: externalId,
          orderId: parsed.orderId,
          email: buyerEmail,
          canceledEmailJobs,
          canceledWhatsAppJobs,
        });
      }
    }

    if (parsed.mappedEvent === 'AddPaymentInfo') {
      const phone = parsed.buyer.checkout_phone || parsed.buyer.phone;
      const name = parsed.buyer.name ? String(parsed.buyer.name).split(' ')[0] : 'Tudo bem?';

      if (phone && externalId) {
        const jobs = scheduleCheckoutAbandonFlow({
          phone,
          name,
          leadId: externalId,
          source: 'hotmart_add_payment_info',
        });

        await appendEventLog({
          ts: new Date().toISOString(),
          source: 'automation',
          action: 'scheduled_from_hotmart',
          leadId: externalId,
          orderId: parsed.orderId,
          jobs: jobs.map((j) => ({ id: j.id, step: j.step, executeAt: j.executeAt })),
        });
      } else {
        await appendEventLog({
          ts: new Date().toISOString(),
          source: 'automation',
          action: 'hotmart_add_payment_info_without_phone_or_lead',
          leadId: externalId,
          orderId: parsed.orderId,
          hasPhone: Boolean(phone),
          hasLeadId: Boolean(externalId),
        });
      }
    }

    await appendEventLog({
      ts: new Date().toISOString(),
      source: 'hotmart_webhook',
      event_name: parsed.mappedEvent,
      status: parsed.statusRaw,
      event_id: parsed.eventId,
      order_id: parsed.orderId,
      transaction_id: parsed.transactionId,
      user_id: parsed.userId || null,
      external_id: externalId || null,
      has_em: Boolean(parsed.buyer?.email),
      has_ph: Boolean(parsed.buyer?.checkout_phone || parsed.buyer?.phone),
      has_fbc: Boolean(parsed.tracking?.fbc),
      has_fbp: Boolean(parsed.tracking?.fbp),
      has_external_id: Boolean(externalId),
      has_client_ip_address: Boolean(clientMeta.ip),
      ip_source: clientMeta.ip_source,
      payload_validation_ok: payloadValidation.ok,
      payload_validation_issues: payloadValidation.issues,
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
