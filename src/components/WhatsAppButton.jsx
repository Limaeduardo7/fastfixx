import { Icon } from './shared';
import { trackEvent } from '../lib/metaTracking';

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/5554981673607?text=Olá! Estou na página do FastFix Academy e tenho uma dúvida antes de decidir."
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            title="Falar com o suporte no WhatsApp"
            onClick={() => trackEvent('Contact', { channel: 'whatsapp' })}
        >
            <span className="whatsapp-bubble">Fale comigo agora</span>
            <Icon name="messageCircle" />
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
