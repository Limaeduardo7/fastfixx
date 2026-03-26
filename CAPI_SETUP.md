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
PARAM_BUILDER_DOMAINS=fastfixacademy.com,www.fastfixacademy.com
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

## 3) Nginx + IPv6 (proxy para Meta + Hotmart)

No server block do domínio, garanta dual-stack (IPv4 + IPv6):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name fastfixacademy.com www.fastfixacademy.com;

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
}
```

Depois:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 4) DNS para IPv6

No provedor DNS do domínio, mantenha **A** (IPv4) e adicione **AAAA** (IPv6) para os hosts usados no tráfego web/API.

Exemplo:

- `fastfixacademy.com` → A: `SEU_IPV4`
- `fastfixacademy.com` → AAAA: `SEU_IPV6`
- `www.fastfixacademy.com` → CNAME para `fastfixacademy.com` (ou A/AAAA equivalentes)

## 5) Payload CAPI (InitiateCheckout)

O backend agora usa **Meta Parameter Builder (NodeJS)** para:
- gerar/reaproveitar cookies first-party `_fbc` e `_fbp`;
- selecionar melhor `client_ip_address` disponível;
- normalizar/hash de PII no padrão recomendado pela Meta.

Também envia `user_data.client_ip_address` com IP válido (IPv4/IPv6) priorizando o valor vindo da interação do cliente em `InitiateCheckout`, com fallback para `X-Forwarded-For` / socket remoto.

Estrutura esperada:

```json
{
  "event_name": "InitiateCheckout",
  "user_data": {
    "client_ip_address": "2001:db8::1",
    "client_user_agent": "Mozilla/5.0 ..."
  }
}
```

## 6) Build do front-end

```bash
cd /root/fastfixx
npm run build
```

## 7) Validação

- Abra o site e verifique `PageView` no **Meta Events Manager**.
- Clique nos botões de compra (evento `InitiateCheckout`).
- Clique no WhatsApp (evento `Contact`).
- Conferir deduplicação: Pixel + CAPI com o mesmo `event_id`.

## Eventos configurados

- `PageView` (ao carregar a página)
- `InitiateCheckout` (botões de compra/hotmart)
- `Contact` (clique no WhatsApp)
