import { Zap, ArrowDown, Check, FileText, BookOpen, Gift } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';
import DecryptedText from '../components/reactbits/DecryptedText';
import EbookUrgencyBar from './EbookUrgencyBar';
import { trackEvent } from '../lib/metaTracking';

const CHECKOUT_URL = '#offer';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
}

const trustItems = [
  { text: 'PDF imediato', Icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/25' },
  { text: 'Leitura objetiva', Icon: BookOpen, color: 'text-violet-400', bg: 'bg-violet-500/15', border: 'border-violet-500/25' },
  { text: '5 Bônus inclusos', Icon: Gift, color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/25' },
];

/* Floating particle positions */
const particles = [
  { top: '12%', left: '8%', size: 'w-1.5 h-1.5', color: 'bg-cyan-400/30', duration: '6s', delay: '0s' },
  { top: '25%', right: '12%', size: 'w-1 h-1', color: 'bg-violet-400/30', duration: '8s', delay: '1s' },
  { top: '55%', left: '5%', size: 'w-1.5 h-1.5', color: 'bg-violet-400/25', duration: '7s', delay: '2s' },
  { top: '70%', right: '8%', size: 'w-1 h-1', color: 'bg-cyan-400/25', duration: '9s', delay: '0.5s' },
  { top: '85%', left: '15%', size: 'w-1.5 h-1.5', color: 'bg-orange-400/20', duration: '7.5s', delay: '3s' },
  { top: '40%', right: '20%', size: 'w-1 h-1', color: 'bg-emerald-400/20', duration: '6.5s', delay: '1.5s' },
];

export default function EbookHero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] pt-28 pb-12 px-4 sm:px-6 lg:px-20 flex items-center justify-center overflow-hidden"
    >
      <EbookUrgencyBar />
      {/* ---- Ambient glow orbs (3) ---- */}
      <div className="ebook-glow-orange absolute -top-20 -right-32 w-[420px] h-[420px] pointer-events-none" />
      <div className="ebook-glow-cyan absolute -bottom-28 -left-28 w-[380px] h-[380px] pointer-events-none" />
      <div className="ebook-glow-purple absolute top-1/3 -left-16 w-[340px] h-[340px] pointer-events-none" />

      {/* Original hero glows */}
      <div className="hero-glow hero-glow--1" />
      <div className="hero-glow hero-glow--2" />

      {/* Floating tech particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.size} ${p.color} pointer-events-none`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            animation: `particleFloat ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Inline keyframes for particle float */}
      <style>{`
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-18px) translateX(8px); opacity: 0.7; }
          50% { transform: translateY(-8px) translateX(-6px); opacity: 0.5; }
          75% { transform: translateY(-22px) translateX(4px); opacity: 0.8; }
        }
      `}</style>

      {/* Circuit pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
              <circle cx="20" cy="20" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="60" cy="20" r="2" fill="rgba(6,182,212,0.5)"/>
              <circle cx="100" cy="20" r="2" fill="rgba(139,92,246,0.5)"/>
              <circle cx="20" cy="60" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="60" cy="60" r="2" fill="rgba(6,182,212,0.5)"/>
              <circle cx="100" cy="60" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="20" cy="100" r="2" fill="rgba(139,92,246,0.5)"/>
              <circle cx="60" cy="100" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="100" cy="100" r="2" fill="rgba(6,182,212,0.5)"/>
              <line x1="20" y1="20" x2="60" y2="20" stroke="rgba(255,107,0,0.3)" stroke-width="0.5"/>
              <line x1="60" y1="20" x2="60" y2="60" stroke="rgba(6,182,212,0.3)" stroke-width="0.5"/>
              <line x1="60" y1="60" x2="100" y2="60" stroke="rgba(139,92,246,0.3)" stroke-width="0.5"/>
              <line x1="20" y1="60" x2="20" y2="100" stroke="rgba(255,107,0,0.3)" stroke-width="0.5"/>
              <line x1="20" y1="100" x2="60" y2="100" stroke="rgba(6,182,212,0.3)" stroke-width="0.5"/>
              <line x1="100" y1="60" x2="100" y2="100" stroke="rgba(139,92,246,0.3)" stroke-width="0.5"/>
            </svg>
          `)}")`,
          backgroundSize: '120px 120px',
        }}
      />

      <div className="max-w-3xl mx-auto w-full py-6 relative">
        <Reveal className="space-y-6 text-center flex flex-col items-center">
          <Badge className="inline-flex">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            eBook Técnico - Flash 64
          </Badge>

          <div className="flex justify-center">
            <img
              src="/flash64-hero.webp"
              alt="eBook Flash 64 na Prática - Mockup"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1402"
              height="1122"
              className="w-[90vw] max-w-[400px] sm:max-w-[460px] lg:max-w-[520px] rounded-2xl drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 40px rgba(255,107,0,0.25)) drop-shadow(0 0 80px rgba(139,92,246,0.15))' }}
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold leading-[1.08] tracking-tight">
            <span className="text-gradient-fire">
              <DecryptedText
                text="Flash 64 na Prática"
                speed={30}
                maxIterations={15}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                className="text-gradient-fire"
              />
            </span>
          </h1>

          {/* Gradient line under headline */}
          <div className="section-divider max-w-[200px] mx-auto" />

          <p className="text-gray-300 text-lg lg:text-xl max-w-lg leading-relaxed mx-auto">
            Pare de perder peças e tempo na bancada. Domine{' '}
            <span className="text-cyan-400 font-bold">ISP</span>,{' '}
            <span className="text-violet-400 font-bold">UFS</span>,{' '}
            <span className="text-blue-400 font-bold">eMMC</span>,{' '}
            <span className="text-emerald-400 font-bold">chip off</span> e
            estabilidade de comunicação com método.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <a
              href={CHECKOUT_URL}
              onClick={() => trackEvent('InitiateCheckout', { currency: 'BRL', value: 67, placement: 'ebook_hero_cta' })}
              className="hero-cta bg-gradient-to-r from-primary via-orange-500 to-amber-500 hover:brightness-110 text-white font-bold px-10 py-4 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 text-base"
            >
              <Zap className="w-5 h-5" />
              Garantir meu Ebook Agora
            </a>

            <button
              type="button"
              onClick={() => scrollToSection('topics')}
              className="flex items-center justify-center gap-3 text-base font-bold px-8 py-4 rounded-xl border border-cyan-500/30 bg-white/[0.03] backdrop-blur-sm text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <ArrowDown className="w-5 h-5" />
              Ver o que você vai aprender
            </button>
          </div>

          {/* Micro-trust - colored badges */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
            {trustItems.map(({ text, Icon, color, bg, border }) => (
              <span key={text} className="flex items-center gap-1.5 text-gray-400 text-sm">
                <span className={`flex items-center justify-center w-4 h-4 ${bg} border ${border} rounded-full shrink-0`}>
                  <Icon className={`w-2.5 h-2.5 ${color}`} />
                </span>
                {text}
              </span>
            ))}
          </div>
        </Reveal>

      </div>

    </section>
  );
}
