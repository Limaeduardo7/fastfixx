import { Icon } from './shared';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/5554981673607?text=Olá! Gostaria de tirar algumas dúvidas sobre o FastFix Academy."
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            title="Falar com o suporte no WhatsApp"
        >
            <span className="whatsapp-bubble">Fale comigo agora</span>
            <Icon name="messageCircle" />
        </a>
    );
}
