import { scrollToOffer } from './shared';
import { trackEvent } from '../lib/metaTracking';

export default function UrgencyBar() {
    return (
        <div id="urgency-bar" className="w-full bg-gradient-to-r from-orange-700 via-primary to-orange-600 text-white py-2.5 px-4 text-center shadow-lg">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-base font-bold tracking-wide">
                <span>🔥 Acesso imediato + Garantia 7 dias — Vagas abertas</span>
                <button
                    type="button"
                    onClick={() => {
                        trackEvent('InitiateCheckout', { currency: 'BRL', value: 497, placement: 'urgency_bar' });
                        scrollToOffer();
                    }}
                    className="ml-2 bg-white text-primary font-extrabold px-4 py-1 rounded-full text-xs hover:scale-105 transition-transform cursor-pointer"
                >
                    GARANTIR AGORA
                </button>
            </div>
        </div>
    );
}
