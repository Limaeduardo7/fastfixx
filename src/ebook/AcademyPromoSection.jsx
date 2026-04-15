import { Zap, TrendingUp, Users, BookOpen, ArrowRight, Star } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import ShinyText from '../components/reactbits/ShinyText';
import { trackEvent } from '../lib/metaTracking';

const academyUrl = 'https://fastfixcaxias.com';

const pillars = [
  { icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', label: 'Feche mais orçamentos', desc: 'Diagnóstico mais rápido = mais clientes atendidos e mais faturamento' },
  { icon: BookOpen, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', label: 'Método completo', desc: 'Do hardware ao software — tudo o que você precisa para se tornar referência' },
  { icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', label: 'Comunidade de elite', desc: 'Técnicos sérios que compartilham casos reais e crescem juntos' },
];

const stars = [1, 2, 3, 4, 5];

export default function AcademyPromoSection() {
  return (
    <section className="py-24 px-6 lg:px-20 relative overflow-hidden">
      {/* Section divider */}
      <div className="section-divider mb-12" />

      {/* Glow orbs */}
      <div className="ebook-glow-orange absolute -top-32 left-1/2 -translate-x-1/2 -z-10 !w-[min(90vw,700px)] !h-[min(90vw,700px)]" />
      <div className="hidden sm:block ebook-glow-purple absolute bottom-0 -left-40 -z-10 !w-[500px] !h-[500px]" />
      <div className="hidden sm:block ebook-glow-cyan absolute bottom-0 -right-40 -z-10 !w-[500px] !h-[500px]" />

      {/* Floating particles */}
      {[
        { top: '10%', left: '8%', size: 'w-2 h-2', color: 'bg-orange-400/50', dur: '7s', delay: '0s' },
        { top: '20%', right: '10%', size: 'w-1.5 h-1.5', color: 'bg-violet-400/50', dur: '9s', delay: '1s' },
        { top: '60%', left: '5%', size: 'w-2 h-2', color: 'bg-cyan-400/50', dur: '6s', delay: '2s' },
        { bottom: '20%', right: '8%', size: 'w-1.5 h-1.5', color: 'bg-amber-400/50', dur: '8s', delay: '0.5s' },
        { top: '40%', left: '20%', size: 'w-1 h-1', color: 'bg-orange-300/40', dur: '11s', delay: '3s' },
        { bottom: '30%', right: '20%', size: 'w-1 h-1', color: 'bg-violet-300/40', dur: '10s', delay: '1.5s' },
      ].map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.size} ${p.color} -z-10`}
          style={{
            top: p.top, left: p.left, right: p.right, bottom: p.bottom,
            animation: `particleFloat ${p.dur} ease-in-out infinite ${p.delay}`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto">
        {/* Top label */}
        <Reveal>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              Conheça o FastFix Academy
            </span>
          </div>
        </Reveal>

        {/* Main card */}
        <Reveal delay={100}>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated border glow */}
            <div
              className="absolute inset-0 rounded-3xl -z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.4) 0%, rgba(139,92,246,0.3) 50%, rgba(6,182,212,0.3) 100%)',
                padding: '1px',
                animation: 'borderPulse 3s ease-in-out infinite',
              }}
            />
            <div
              className="absolute inset-[1px] rounded-3xl -z-10"
              style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #0a0a16 100%)' }}
            />

            <div className="relative bg-gradient-to-br from-orange-500/[0.07] via-white/[0.02] to-violet-500/[0.07] border border-orange-500/20 rounded-3xl p-7 sm:p-10 md:p-14">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {stars.map(s => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" style={{ animation: `ff-logoIn 0.4s ${s * 0.1}s ease-out both` }} />
                ))}
              </div>

              {/* Headline */}
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Quer ser um técnico{' '}
                  <span className="relative inline-block">
                    de referência?
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-primary via-orange-500 to-amber-400"
                      style={{ animation: 'expandWidth 0.8s 0.5s ease-out both' }}
                    />
                  </span>
                </h2>
                <ShinyText
                  text="FastFix Academy"
                  color="#f97316"
                  shineColor="#fbbf24"
                  speed={2.5}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold"
                />
                <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
                  Técnicos medianos improvisam. <span className="text-white font-semibold">Técnicos de referência têm método.</span>{' '}
                  O Academy é o treinamento completo para você <span className="text-white font-semibold">cobrar mais, errar menos</span> e construir uma bancada que funciona de verdade.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {pillars.map(({ icon: Icon, color, bg, label, desc }, i) => (
                  <Reveal key={label} delay={200 + i * 100}>
                    <div className={`flex flex-col items-center text-center gap-3 p-5 rounded-2xl border ${bg} transition-transform duration-300 hover:-translate-y-1`}>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <span className="text-white font-bold text-sm">{label}</span>
                      <span className="text-gray-400 text-xs leading-relaxed">{desc}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* CTAs */}
              <Reveal delay={500}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={academyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('ViewContent', { content_name: 'academy_section_flash64', placement: 'flash64_bottom' })}
                    className="hero-cta inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-orange-500 to-amber-500 hover:from-orange-500 hover:to-primary text-white font-bold px-6 py-3.5 sm:px-9 sm:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 text-sm sm:text-base whitespace-nowrap"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    Quero ser referência
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>
                  <a
                    href="https://wa.me/5554991006375?text=Olá!%20Quero%20saber%20mais%20sobre%20o%20FastFix%20Academy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3.5 sm:px-9 sm:py-4 rounded-xl transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
                  >
                    Falar com suporte
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes borderPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes expandWidth {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
