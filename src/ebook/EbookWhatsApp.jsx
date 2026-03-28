import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/5554981673607?text=Olá! Gostaria de saber mais sobre o eBook Dominando a Flash64.';

export default function EbookWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
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
