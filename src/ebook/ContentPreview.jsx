import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';

function TextLine({ width = '100%', className = '' }) {
  return (
    <div
      className={`h-[6px] rounded-full bg-white/[0.06] ${className}`}
      style={{ width }}
    />
  );
}

function SimulatedPage({ chapter, title, color = '#FF6B00', rotation = 0, zIndex = 10, className = '' }) {
  return (
    <div
      className={`relative bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden aspect-[3/4] w-[220px] sm:w-[240px] shrink-0 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        zIndex,
      }}
    >
      <div className="p-5 flex flex-col gap-3 h-full">
        {/* Chapter label */}
        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-medium">
          {chapter}
        </span>

        {/* Title */}
        <h4 className="text-sm font-bold text-white leading-tight">{title}</h4>

        {/* Divider */}
        <div className="h-[2px] rounded-full w-10" style={{ background: color }} />

        {/* Simulated text paragraphs */}
        <div className="flex flex-col gap-2 mt-1">
          <TextLine width="100%" />
          <TextLine width="85%" />
          <TextLine width="92%" />
          <TextLine width="60%" />
        </div>

        {/* Simulated diagram / image */}
        <div
          className="w-full h-16 rounded-md mt-2"
          style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)`, border: `1px solid ${color}20` }}
        />

        {/* More text lines */}
        <div className="flex flex-col gap-2 mt-auto">
          <TextLine width="95%" />
          <TextLine width="78%" />
          <TextLine width="88%" />
        </div>
      </div>
    </div>
  );
}

export default function ContentPreview() {
  return (
    <section className="py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Preview</Badge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Material técnico de alto nível
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Conteúdo direto ao ponto, construído para quem trabalha na bancada e precisa de respostas claras.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          {/* Fan-out page previews */}
          <div className="relative flex items-center justify-center h-[380px] sm:h-[420px]">
            {/* Page 2 - Left */}
            <div className="absolute hidden sm:block" style={{ left: 'calc(50% - 260px)' }}>
              <SimulatedPage
                chapter="Capítulo 05"
                title="Parâmetros UFS"
                rotation={-6}
                zIndex={5}
                color="#3B82F6"
              />
            </div>

            {/* Page 1 - Center (main) */}
            <div className="relative" style={{ zIndex: 10 }}>
              <SimulatedPage
                chapter="Capítulo 03"
                title="Conexão ISP"
                rotation={0}
                zIndex={10}
                color="#FF6B00"
                className="shadow-2xl shadow-black/40"
              />
            </div>

            {/* Page 3 - Right */}
            <div className="absolute hidden sm:block" style={{ right: 'calc(50% - 260px)' }}>
              <SimulatedPage
                chapter="Capítulo 07"
                title="Chip Off"
                rotation={6}
                zIndex={5}
                color="#10B981"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-gray-500 text-xs text-center mt-8">
            Conteúdo real do eBook. Visual ilustrativo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
