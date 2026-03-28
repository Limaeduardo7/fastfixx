import { Zap, ArrowDown, Check } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';
import DecryptedText from '../components/reactbits/DecryptedText';
import EbookMockup from './EbookMockup';

const CHECKOUT_URL = '#checkout'; // Replace with actual checkout URL

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
}

const trustItems = [
  'PDF imediato',
  'Leitura objetiva',
  'Sem enrolação',
];

export default function EbookHero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 px-6 lg:px-20 flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow effects */}
      <div className="hero-glow hero-glow--1" />
      <div className="hero-glow hero-glow--2" />

      {/* Circuit pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
              <circle cx="20" cy="20" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="60" cy="20" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="100" cy="20" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="20" cy="60" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="60" cy="60" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="100" cy="60" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="20" cy="100" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="60" cy="100" r="2" fill="rgba(255,107,0,0.5)"/>
              <circle cx="100" cy="100" r="2" fill="rgba(255,107,0,0.5)"/>
              <line x1="20" y1="20" x2="60" y2="20" stroke="rgba(255,107,0,0.3)" stroke-width="0.5"/>
              <line x1="60" y1="20" x2="60" y2="60" stroke="rgba(255,107,0,0.3)" stroke-width="0.5"/>
              <line x1="60" y1="60" x2="100" y2="60" stroke="rgba(255,107,0,0.3)" stroke-width="0.5"/>
              <line x1="20" y1="60" x2="20" y2="100" stroke="rgba(255,107,0,0.3)" stroke-width="0.5"/>
              <line x1="20" y1="100" x2="60" y2="100" stroke="rgba(255,107,0,0.3)" stroke-width="0.5"/>
              <line x1="100" y1="60" x2="100" y2="100" stroke="rgba(255,107,0,0.3)" stroke-width="0.5"/>
            </svg>
          `)}")`,
          backgroundSize: '120px 120px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-center py-8">
        {/* Left: Copy */}
        <Reveal className="space-y-6">
          <Badge>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            eBook Tecnico &middot; Flash64
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold leading-[1.08] tracking-tight">
            <DecryptedText
              text="Dominando a"
              speed={30}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              animateOn="view"
              className="text-white"
            />
            <br />
            <span className="text-primary">
              <DecryptedText
                text="Flash64"
                speed={30}
                maxIterations={15}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                className="text-primary"
              />
            </span>
          </h1>

          <p className="text-gray-300 text-lg lg:text-xl max-w-lg leading-relaxed">
            Aprenda em horas o que muitos tecnicos demoram dias para descobrir sobre
            conexao <strong className="text-white font-bold">ISP, UFS, eMMC, chip off</strong> e
            estabilidade de bancada.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href={CHECKOUT_URL}
              className="hero-cta bg-primary hover:bg-primary-hover text-white font-bold px-10 py-4 rounded-xl transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 text-base"
            >
              <Zap className="w-5 h-5" />
              Quero o eBook
            </a>

            <button
              type="button"
              onClick={() => scrollToSection('topics')}
              className="flex items-center justify-center gap-3 text-base font-bold px-8 py-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-gray-200 hover:bg-white/[0.07] hover:border-white/20 transition-all cursor-pointer"
            >
              <ArrowDown className="w-5 h-5" />
              Ver o que voce vai aprender
            </button>
          </div>

          {/* Micro-trust */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
            {trustItems.map((text) => (
              <span key={text} className="flex items-center gap-1.5 text-gray-400 text-sm">
                <span className="flex items-center justify-center w-4 h-4 bg-green-500/15 border border-green-500/25 rounded-full shrink-0">
                  <Check className="w-2.5 h-2.5 text-green-400" />
                </span>
                {text}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Right: Mockup */}
        <Reveal delay={300} className="relative flex items-center justify-center">
          {/* Glow ring behind mockup */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)' }}
            />
          </div>

          <div className="hero-image-wrapper relative">
            <EbookMockup />
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs">
        <span>Role para baixo</span>
        <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-gray-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
