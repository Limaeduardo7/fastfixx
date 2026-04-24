import { MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/metaTracking';

const WHATSAPP_URL =
  'https://wa.me/5554991006375?text=Olá! Gostaria de saber mais sobre o eBook Dominando a Flash64.';

export default function EbookWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      onClick={() => trackEvent('Contact', { channel: 'whatsapp', placement: 'ebook_float_button' })}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      title="Falar com o suporte no WhatsApp"
    >
      <span className="whatsapp-bubble">Dúvidas? Fale conosco</span>
      <MessageCircle size={28} />
      <span
        aria-label="1 mensagem não lida"
        style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          width: '20px',
          height: '20px',
          borderRadius: '999px',
          background: '#ef4444',
          border: '2px solid #fff',
          color: '#fff',
          fontSize: '11px',
          fontWeight: '800',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
          animation: 'waBadgePop 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        1
      </span>
    </a>
  );
}
