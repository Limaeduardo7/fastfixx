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
    </a>
  );
}
