const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const CAPI_ENDPOINT = import.meta.env.VITE_META_CAPI_ENDPOINT || '/api/meta/events';
const LEAD_ID_KEY = 'fastfix_lead_id';
const TRACKING_CTX_KEY = 'fastfix_tracking_ctx';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function setCookie(name, value, days = 90) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function ensureLeadId() {
  let leadId = localStorage.getItem(LEAD_ID_KEY);
  if (!leadId) {
    leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(LEAD_ID_KEY, leadId);
  }
  return leadId;
}

function captureTrackingContext() {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  const ctx = {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_term: params.get('utm_term') || undefined,
    fbclid: params.get('fbclid') || undefined,
    gclid: params.get('gclid') || undefined,
  };

  const existing = JSON.parse(localStorage.getItem(TRACKING_CTX_KEY) || '{}');
  const merged = { ...existing, ...Object.fromEntries(Object.entries(ctx).filter(([, v]) => v)) };

  localStorage.setItem(TRACKING_CTX_KEY, JSON.stringify(merged));

  // Se vier fbclid e não houver fbc, gera fbc padrão Meta
  if (merged.fbclid && !getCookie('_fbc')) {
    setCookie('_fbc', `fb.1.${Date.now()}.${merged.fbclid}`);
  }

  return merged;
}

function getTrackingContext() {
  return JSON.parse(localStorage.getItem(TRACKING_CTX_KEY) || '{}');
}

function ensureFbqLoaded() {
  if (window.fbq) return;

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
}

function eventId(eventName) {
  return `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function initMetaPixel() {
  if (!PIXEL_ID || window.__metaPixelInitialized) return;
  ensureFbqLoaded();
  ensureLeadId();
  captureTrackingContext();
  window.fbq('init', PIXEL_ID);
  window.__metaPixelInitialized = true;
}

export function trackEvent(eventName, customData = {}) {
  const id = eventId(eventName);
  const leadId = ensureLeadId();
  const tracking = captureTrackingContext();

  const enrichedCustomData = {
    ...tracking,
    ...customData,
    lead_id: leadId,
  };

  if (PIXEL_ID && window.fbq) {
    window.fbq('track', eventName, enrichedCustomData, { eventID: id });
  }

  const payload = {
    event_name: eventName,
    event_id: id,
    event_source_url: window.location.href,
    action_source: 'website',
    custom_data: enrichedCustomData,
    user_data: {
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      external_id: leadId,
    },
  };

  fetch(CAPI_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});

  return id;
}

export function trackPageView() {
  return trackEvent('PageView');
}

// Inicializa contexto de tracking assim que módulo for carregado no browser
if (typeof window !== 'undefined') {
  ensureLeadId();
  captureTrackingContext();
}
