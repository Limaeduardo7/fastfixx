import { Cpu } from 'lucide-react';

const CIRCUIT_SVG = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <circle cx="20" cy="20" r="2" fill="rgba(255,107,0,0.3)"/>
  <circle cx="60" cy="20" r="2" fill="rgba(255,107,0,0.3)"/>
  <circle cx="100" cy="20" r="2" fill="rgba(255,107,0,0.3)"/>
  <circle cx="20" cy="60" r="2" fill="rgba(255,107,0,0.3)"/>
  <circle cx="60" cy="60" r="2" fill="rgba(255,107,0,0.3)"/>
  <circle cx="100" cy="60" r="2" fill="rgba(255,107,0,0.3)"/>
  <circle cx="20" cy="100" r="2" fill="rgba(255,107,0,0.3)"/>
  <circle cx="60" cy="100" r="2" fill="rgba(255,107,0,0.3)"/>
  <circle cx="100" cy="100" r="2" fill="rgba(255,107,0,0.3)"/>
  <line x1="20" y1="20" x2="60" y2="20" stroke="rgba(255,107,0,0.15)" stroke-width="0.5"/>
  <line x1="60" y1="20" x2="60" y2="60" stroke="rgba(255,107,0,0.15)" stroke-width="0.5"/>
  <line x1="60" y1="60" x2="100" y2="60" stroke="rgba(255,107,0,0.15)" stroke-width="0.5"/>
  <line x1="20" y1="60" x2="20" y2="100" stroke="rgba(255,107,0,0.15)" stroke-width="0.5"/>
  <line x1="20" y1="100" x2="60" y2="100" stroke="rgba(255,107,0,0.15)" stroke-width="0.5"/>
  <line x1="100" y1="60" x2="100" y2="100" stroke="rgba(255,107,0,0.15)" stroke-width="0.5"/>
  <line x1="100" y1="20" x2="100" y2="60" stroke="rgba(255,107,0,0.15)" stroke-width="0.5"/>
  <line x1="60" y1="60" x2="60" y2="100" stroke="rgba(255,107,0,0.15)" stroke-width="0.5"/>
</svg>
`)}`;

export default function EbookMockup({ className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ perspective: '1200px' }}>
      {/* Glow underneath */}
      <div
        className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[70%] h-[40px] rounded-full blur-2xl"
        style={{ background: 'rgba(255, 107, 0, 0.18)' }}
      />

      {/* Book wrapper with 3D transform */}
      <div
        className="relative w-[280px] sm:w-[340px] mx-auto"
        style={{
          aspectRatio: '3 / 4',
          transform: 'rotateY(-8deg) rotateX(3deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Spine shadow (left edge) */}
        <div
          className="absolute top-0 left-0 w-[14px] h-full rounded-l-sm z-20"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.15), transparent)',
            transform: 'translateZ(-2px)',
          }}
        />

        {/* Page edges (right side) */}
        <div
          className="absolute top-[3px] -right-[8px] w-[8px] h-[calc(100%-6px)] rounded-r-[2px] z-0"
          style={{
            background: 'linear-gradient(to right, #d4d0c8, #e8e4dc, #f0ece4, #e8e4dc, #d4d0c8)',
            boxShadow: '2px 0 6px rgba(0,0,0,0.3)',
          }}
        />

        {/* Front cover */}
        <div
          className="relative w-full h-full rounded-r-sm rounded-l-[2px] overflow-hidden z-10 flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(160deg, #0F1923 0%, #0B0E14 40%, #111827 100%)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Circuit pattern overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `url("${CIRCUIT_SVG}")`, backgroundSize: '120px 120px' }}
          />

          {/* Top gradient accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: 'linear-gradient(90deg, transparent, #FF6B00, transparent)' }}
          />

          {/* Inner border glow */}
          <div className="absolute inset-[12px] rounded-sm border border-white/[0.06] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 gap-4">
            {/* Brand */}
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
              FastFix Academy
            </p>

            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20">
              <Cpu className="w-6 h-6 text-primary" />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight tracking-tight">
              Dominando
              <br />
              a Flash64
            </h3>

            {/* Divider */}
            <div className="w-12 h-[2px] rounded-full bg-primary" />

            {/* Subtitle */}
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
              ISP &middot; UFS &middot; eMMC &middot; Chip Off
            </p>
          </div>

          {/* Bottom gradient accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{ background: 'linear-gradient(90deg, transparent, #FF6B00, transparent)' }}
          />
        </div>
      </div>
    </div>
  );
}
