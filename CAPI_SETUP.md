# Configuração Meta Pixel + Conversion API (FastFix)

## 1) Variáveis de ambiente

### Front-end (`/root/fastfixx/.env`)

```env
VITE_META_PIXEL_ID=SEU_PIXEL_ID
VITE_META_CAPI_ENDPOINT=/api/meta/events
```

### Servidor CAPI (`/root/fastfixx/capi-server/.env`)

```env
META_PIXEL_ID=SEU_PIXEL_ID
META_ACCESS_TOKEN=SEU_TOKEN_DE_ACESSO
META_TEST_EVENT_CODE=TEST12345   # opcional para teste
HOTMART_WEBHOOK_TOKEN=SEU_HOTTOK_WEBHOOK
PORT=3100
```

## 2) Rodar o servidor CAPI

```bash
cd /root/fastfixx
set -a && source capi-server/.env && set +a
npm run capi
```

Health check:

```bash
curl http://127.0.0.1:3100/health
```

## 3) Nginx (proxy para Meta + Hotmart)

No server block do domínio, adicione:

```nginx
location /api/meta/events {
    proxy_pass http://127.0.0.1:3100/api/meta/events;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /api/hotmart/webhook {
    proxy_pass http://127.0.0.1:3100/api/hotmart/webhook;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Depois:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 4) Build do front-end

```bash
cd /root/fastfixx
npm run build
```

## 5) Validação

- Abra o site e verifique `PageView` no **Meta Events Manager**.
- Clique nos botões de compra (evento `InitiateCheckout`).
- Clique no WhatsApp (evento `Contact`).
- Conferir deduplicação: Pixel + CAPI com o mesmo `event_id`.

## Eventos configurados

- `PageView` (ao carregar a página)
- `InitiateCheckout` (botões de compra/hotmart)
- `Contact` (clique no WhatsApp)
