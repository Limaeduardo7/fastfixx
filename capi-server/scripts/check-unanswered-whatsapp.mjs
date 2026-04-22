#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const CAPI_ROOT = '/root/fastfixx/capi-server';
const CONTACTS_DIR = path.join(CAPI_ROOT, 'data', 'contacts');
const STATE_FILE = path.join(CAPI_ROOT, 'data', 'unanswered-alert-state.json');
const LOG_FILE = path.join(CAPI_ROOT, 'logs', 'events.log');
const ENV_FILE = path.join(CAPI_ROOT, '.env');

function parseEnv(raw) { const out = {}; for (const line of raw.split('\n')) { if (!line || line.trim().startsWith('#') || !line.includes('=')) continue; const i = line.indexOf('='); out[line.slice(0, i).trim()] = line.slice(i + 1).trim(); } return out; }
const normalizePhone = (p) => String(p || '').replace(/\D/g, '');
const toDate = (v) => { const d = new Date(v); return Number.isNaN(d.getTime()) ? null : d; };
const readJson = async (f, fb) => { try { return JSON.parse(await fs.readFile(f, 'utf8')); } catch { return fb; } };
async function appendEvent(obj) { await fs.appendFile(LOG_FILE, `${JSON.stringify(obj)}\n`, 'utf8').catch(() => {}); }
function findLastInboundText(c) { const h = Array.isArray(c.history) ? c.history : []; for (let i=h.length-1;i>=0;i--){ if (h[i]?.inbound) return String(h[i].inbound);} return ''; }

async function sendWhatsAppText({ baseUrl, instance, sendPath, apiKey, number, text }) {
  const endpoint = `${baseUrl}${sendPath.replace('{instance}', instance)}`;
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: apiKey }, body: JSON.stringify({ number, text, options: { delay: 500, presence: 'composing' } }) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Evolution error ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

async function main() {
  const env = parseEnv(await fs.readFile(ENV_FILE, 'utf8'));
  const OWNER = normalizePhone(env.WHATSAPP_OWNER_NOTIFY_PHONE || '');
  const API_KEY = env.EVOLUTION_API_KEY;
  const BASE_URL = env.EVOLUTION_BASE_URL || 'https://api-evolution.fastfixcaxias.com';
  const INSTANCE = env.EVOLUTION_INSTANCE || 'fastfix';
  const SEND_PATH = env.EVOLUTION_SEND_PATH || '/message/sendText/{instance}';
  const MIN_WAIT_MIN = Number(env.UNANSWERED_MIN_WAIT_MIN || 10);
  if (!OWNER || !API_KEY) return;

  const state = await readJson(STATE_FILE, { alerts: {} });
  state.alerts = state.alerts || {};

  const files = await fs.readdir(CONTACTS_DIR).catch(() => []);
  const now = new Date();
  const pending = [];

  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const c = await readJson(path.join(CONTACTS_DIR, f), null);
    if (!c) continue;
    const phone = normalizePhone(c.phone || f.replace('.json',''));
    if (!phone || phone === OWNER) continue;
    const li = toDate(c.lastInboundAt);
    const lr = toDate(c.lastReplyAt);
    if (!li) continue;
    if (lr && li <= lr) continue;
    const waitMin = (now - li) / 60000;
    if (waitMin < MIN_WAIT_MIN) continue;
    const iso = li.toISOString();
    if (state.alerts[phone]?.lastInboundAt === iso) continue;
    pending.push({ phone, waitMin: Math.floor(waitMin), inbound: findLastInboundText(c).slice(0,180), lastInboundAt: iso });
  }

  if (!pending.length) return;
  const lines = pending.slice(0,20).map((p,i)=>`${i+1}) ${p.phone} • ${p.waitMin} min\n   \"${p.inbound || '...'}\"`).join('\n');
  const text = `⚠️ Conversas sem resposta no WhatsApp\nTotal: ${pending.length}\n\n${lines}`;

  await sendWhatsAppText({ baseUrl: BASE_URL, instance: INSTANCE, sendPath: SEND_PATH, apiKey: API_KEY, number: OWNER, text });
  const ts = new Date().toISOString();
  for (const p of pending) state.alerts[p.phone] = { lastInboundAt: p.lastInboundAt, alertedAt: ts };
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  await appendEvent({ ts, source: 'whatsapp_notify', action: 'owner_notified_unanswered_contacts', to: OWNER, count: pending.length });
}

main().catch(async (err) => { await appendEvent({ ts: new Date().toISOString(), source: 'whatsapp_notify', action: 'owner_notify_unanswered_failed', error: err.message }); });
