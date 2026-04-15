import { Icon } from './shared';
import { trackEvent } from '../lib/metaTracking';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/5554991006375?text=Olá! Gostaria de tirar algumas dúvidas sobre o FastFix Academy."
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            title="Falar com o suporte no WhatsApp"
            onClick={() => trackEvent('Contact', { channel: 'whatsapp' })}
        >
            <span className="whatsapp-bubble">Fale comigo agora</span>
            <Icon name="messageCircle" />
        </a>
    );
}
