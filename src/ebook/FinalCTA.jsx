import { Zap } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import ShinyText from '../components/reactbits/ShinyText';
import { buildCheckoutUrl, trackEvent } from '../lib/metaTracking';

const CHECKOUT_URL = 'https://pay.hotmart.com/B105126454X?checkoutMode=10';

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 lg:px-20 relative overflow-hidden">
      {/* Section divider */}
      <div className="section-divider mb-24" />

      {/* Large glow orbs */}
      <div className="ebook-glow-orange absolute -top-40 left-1/2 -translate-x-1/2 -z-10 !w-[min(90vw,700px)] !h-[min(90vw,700px)]" />
      <div className="hidden sm:block ebook-glow-purple absolute top-1/2 -left-64 -translate-y-1/2 -z-10 !w-[600px] !h-[600px]" />
      <div className="hidden sm:block ebook-glow-cyan absolute top-1/2 -right-64 -translate-y-1/2 -z-10 !w-[600px] !h-[600px]" />

      {/* Floating particles */}
      <div
        className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-cyan-400/60 -z-10"
        style={{ animation: 'particleFloat 6s ease-in-out infinite' }}
      />
      <div
        className="absolute top-40 right-[20%] w-2 h-2 rounded-full bg-violet-500/60 -z-10"
        style={{ animation: 'particleFloat 8s ease-in-out infinite 1s' }}
      />
      <div
        className="absolute bottom-32 left-[25%] w-1.5 h-1.5 rounded-full bg-primary/60 -z-10"
        style={{ animation: 'particleFloat 7s ease-in-out infinite 2s' }}
      />
      <div
        className="absolute bottom-20 right-[30%] w-2 h-2 rounded-full bg-emerald-500/60 -z-10"
        style={{ animation: 'particleFloat 9s ease-in-out infinite 0.5s' }}
      />

      <div className="max-w-3xl mx-auto text-center space-y-10">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6">
            Pare de perder <span className="text-gradient-fire">tempo</span> com{' '}
            <span className="text-red-400">tentativa e erro</span>.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Tempo economizado. Critério técnico. Menos improviso. Domínio mais
            rápido da ferramenta. Tudo isso em um único material.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <ShinyText
            text="A decisão mais inteligente que você toma hoje é investir no seu método."
            color="#b5b5b5"
            shineColor="#06B6D4"
            speed={3}
            className="text-lg lg:text-xl font-semibold"
          />
        </Reveal>

        <Reveal delay={300}>
          <a href={buildCheckoutUrl(CHECKOUT_URL)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('InitiateCheckout', { currency: 'BRL', value: 47, placement: 'ebook_final_cta' })}>
            <button className="hero-cta bg-gradient-to-r from-primary via-orange-500 to-amber-500 hover:from-orange-500 hover:to-primary text-white text-base sm:text-lg font-bold py-4 sm:py-5 px-7 sm:px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-primary/30 w-full sm:w-auto">
              <Zap className="w-5 h-5" />
              Garantir meu Ebook Agora
            </button>
          </a>
          <p className="text-gray-500 text-sm mt-4 flex items-center justify-center gap-3">
            <span>Acesso imediato</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            <span>PDF completo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
            <span>Leitura objetiva</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
