import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';
import { trackEvent } from '../lib/metaTracking';

const pages = [
  {
    src: '/images/preview-ufs.png',
    alt: 'Parâmetros UFS - página 9',
    label: 'Parâmetros UFS · p.9',
    color: '#3B82F6',
    rotation: -6,
    shadow: 'rgba(59,130,246,0.2)',
  },
  {
    src: '/images/preview-chipoff.png',
    alt: 'Chip Off - página 6',
    label: 'Chip Off · p.6',
    color: '#FF6B00',
    rotation: 0,
    shadow: 'rgba(255,107,0,0.25)',
    badge: true,
  },
  {
    src: '/images/preview-emmc.png',
    alt: 'Aba eMMC da Flash64 - página 11',
    label: 'Aba eMMC · p.11',
    color: '#06B6D4',
    rotation: 6,
    shadow: 'rgba(6,182,212,0.2)',
  },
];

function PageCard({ page, isFanout = false }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-white/10 w-[200px] xs:w-[230px] sm:w-[260px] md:w-[290px] shrink-0"
      style={{
        transform: isFanout ? `rotate(${page.rotation}deg)` : 'none',
        zIndex: page.badge ? 10 : 5,
        boxShadow: `0 8px 40px ${page.shadow}, 0 0 0 1px rgba(255,255,255,0.05)`,
        aspectRatio: '3/4',
      }}
    >
      <img
        src={page.src}
        alt={page.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top"
      />
      <div
        className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-[9px] font-semibold text-center"
        style={{ background: `linear-gradient(to top, ${page.color}33, transparent)`, color: page.color }}
      >
        {page.label}
      </div>
    </div>
  );
}

export default function ContentPreview() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative">
      <div className="section-divider" />
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="ebook-glow-purple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-10 sm:mb-16">
            <Badge className="mb-4">Preview</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Material técnico de <span className="text-gradient-purple">alto nível</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              Conteúdo direto ao ponto, construído para quem trabalha na bancada e precisa de respostas claras.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          {/* Mobile: horizontal scroll */}
          <div className="sm:hidden overflow-hidden w-full">
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-none">
              {pages.map((page, i) => (
                <div key={i} className="snap-center shrink-0 relative">
                  <PageCard page={page} />
                </div>
              ))}
            </div>
            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-2">
              {pages.map((page, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: page.color, opacity: i === 1 ? 1 : 0.4 }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: fan-out */}
          <div className="hidden sm:flex items-center justify-center h-[340px] sm:h-[380px] md:h-[420px] relative">
            {pages.map((page, i) => (
              <div
                key={i}
                className={i === 1 ? 'relative' : 'absolute'}
                style={
                  i === 0
                    ? { left: 'calc(50% - 270px)' }
                    : i === 2
                    ? { right: 'calc(50% - 270px)' }
                    : {}
                }
              >
                <PageCard page={page} isFanout />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-gray-500 text-xs text-center mt-6 sm:mt-8">
            Isso é o que você recebe. Sem surpresa. — Chip Off (p.6), Parâmetros UFS (p.9), Aba eMMC (p.11).
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-8 text-center">
            <a href="#offer" onClick={() => trackEvent('InitiateCheckout', { currency: 'BRL', value: 67, placement: 'ebook_preview_cta' })} className="hero-cta inline-flex items-center justify-center bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white font-bold px-8 py-3 rounded-xl">
              Garantir meu Ebook Agora
            </a>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
