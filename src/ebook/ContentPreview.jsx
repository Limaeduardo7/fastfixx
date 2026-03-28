import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';

function ParamBlock({ label, color, lines }) {
  return (
    <div className="w-full rounded-sm p-2" style={{ borderLeft: `2px solid ${color}`, background: `${color}08` }}>
      <div className="text-[6px] font-bold mb-1" style={{ color, fontFamily: 'monospace' }}>{label}</div>
      {lines.map((line, i) => (
        <div key={i} className="text-[5px] text-white/50 leading-[1.6]">{line}</div>
      ))}
    </div>
  );
}

function PageUFS() {
  return (
    <div className="relative bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden w-[200px] sm:w-[220px] shrink-0"
      style={{ aspectRatio: '3/4', boxShadow: '0 0 40px #3B82F615, 0 0 80px #3B82F608', transform: 'rotate(-6deg)', zIndex: 5 }}>
      <div className="p-3.5 flex flex-col gap-1.5 h-full">
        <div className="text-[6px] uppercase tracking-[0.2em] text-gray-500">DOMINANDO A FLASH64</div>
        <div className="h-[1px] bg-white/10 w-full" />
        <div className="text-[8px] font-bold text-white mt-0.5">Parâmetros UFS (continuação)</div>
        <div className="h-[1.5px] w-8 rounded-full bg-[#3B82F6] mb-1" />
        <ParamBlock label="GEAR (Velocidade de comunicação)" color="#06B6D4"
          lines={['G1 (mais lento) > G2 > G3 > G4 (mais rápido)', 'GEAR baixo = mais estável, menor velocidade', 'Recomendação: AUTO para ajuste automático.']} />
        <ParamBlock label="RATE (Modo de transmissão)" color="#FF6B00"
          lines={['PWM (modo básico, mais lento) | HS (High Speed)', 'HS: equilíbrio | A-series: maior desempenho']} />
        <ParamBlock label="R.CLOCK (Frequência de comunicação)" color="#10B981"
          lines={['Valores: 19 MHz | 26 MHz | 52 MHz', 'Clock baixo = mais estável | Clock alto = mais rápido', 'Recomendação: 26 MHz como padrão.']} />
        <ParamBlock label="TX_N (Resistência da Linha de Transmissão)" color="#EAB308"
          lines={['Valores: 5 a 22 Ohm | Baixo (5-10): sinal rápido', 'Comece com 10 Ohm. Não conecta? Aumente.']} />
        <div className="mt-auto rounded-sm p-2 bg-[#3B82F6]/10 border border-[#3B82F6]/20">
          <div className="text-[4.5px] text-[#3B82F6]/80 leading-[1.5]">O TX_N é um ajuste fino. A <span className="font-bold text-[#3B82F6]">qualidade dos fios, solda e conexão ISP</span> tem impacto maior que esse parâmetro.</div>
        </div>
        <div className="text-[5px] text-center text-gray-600 mt-auto">Página 9</div>
      </div>
    </div>
  );
}

function PageChipOff() {
  const steps = [
    { label: 'Pré-aquecimento', color: '#06B6D4', text: '250°C por 40s a 1 min — chip e área ao redor' },
    { label: 'Extração', color: '#FF6B00', text: 'Aumentar temperatura — não ultrapassar ~40 segundos' },
    { label: 'Limpeza', color: '#10B981', text: 'Ferro a 330°C máx (resina) + malha dessoldadora + thinner Farben 5000/6000' },
    { label: 'Reballing', color: '#EAB308', text: 'Solda de fusão 153°C ou 183°C — evitar 138°C e 217°C' },
  ];
  return (
    <div className="relative bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden w-[200px] sm:w-[220px] shrink-0"
      style={{ aspectRatio: '3/4', boxShadow: '0 0 40px #10B98115, 0 0 80px #10B98108', zIndex: 10 }}>
      <div className="p-3.5 flex flex-col gap-1.5 h-full">
        <div className="text-[6px] uppercase tracking-[0.2em] text-gray-500">DOMINANDO A FLASH64</div>
        <div className="h-[1px] bg-white/10 w-full" />
        <div className="text-[7px] font-bold text-[#10B981]">05</div>
        <div className="text-[9px] font-bold text-white">Chip Off</div>
        <div className="h-[1.5px] w-8 rounded-full bg-[#10B981] mb-0.5" />
        <div className="text-[5px] text-white/50 leading-[1.6]">Esse tipo de conexão só é válido a partir do momento em que já foi realizado o procedimento de reballing da CPU e você deseja reprogramar a memória do zero.</div>
        <div className="text-[6px] font-semibold text-white/70 mt-1">Procedimento padrão (Samsung/SEC):</div>
        {steps.map((s, i) => (
          <div key={i} className="rounded-sm p-1.5" style={{ borderLeft: `2px solid ${s.color}`, background: `${s.color}08` }}>
            <div className="text-[5.5px] font-bold mb-0.5" style={{ color: s.color }}>{s.label}</div>
            <div className="text-[5px] text-white/50">{s.text}</div>
          </div>
        ))}
        <div className="mt-auto rounded-sm p-1.5 bg-[#FF6B00]/10 border border-[#FF6B00]/20">
          <div className="text-[4.5px] text-white/60 leading-[1.5]"><span className="font-bold text-white/80">A memória deve ser manuseada com total cuidado</span>, evitando tocar nos pads — pode gerar antiestática e danificar algum bloco interno.</div>
        </div>
        <div className="text-[5px] text-center text-gray-600 mt-1">Página 6</div>
      </div>
    </div>
  );
}

function PageEMMC() {
  const params = [
    { label: 'VCC', color: '#06B6D4', text: '2.8V — tensão principal, alimenta o chip e permite inicialização' },
    { label: 'VCCQ', color: '#10B981', text: '1.8V (aparelhos atuais) / 3.3V (modelos antigos) — nível lógico da comunicação' },
    { label: 'CLOCK', color: '#FF6B00', text: '26 MHz | 52 MHz | 104 MHz — Clock baixo: mais estável | Clock alto: mais rápido. Recomendação: 104 MHz estável.' },
  ];
  const modes = ['AI Connect', 'Reconnection Loop', 'ISP Mode', 'Boot Mode', 'SPR', 'CLK Booster', 'Slow Read/Write'];
  return (
    <div className="relative bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden w-[200px] sm:w-[220px] shrink-0"
      style={{ aspectRatio: '3/4', boxShadow: '0 0 40px #06B6D415, 0 0 80px #06B6D408', transform: 'rotate(6deg)', zIndex: 5 }}>
      <div className="p-3.5 flex flex-col gap-1.5 h-full">
        <div className="text-[6px] uppercase tracking-[0.2em] text-gray-500">DOMINANDO A FLASH64</div>
        <div className="h-[1px] bg-white/10 w-full" />
        <div className="text-[7px] font-bold text-[#06B6D4]">09</div>
        <div className="text-[9px] font-bold text-white">Aba eMMC da Flash64</div>
        <div className="h-[1.5px] w-8 rounded-full bg-[#06B6D4] mb-0.5" />
        <div className="text-[5px] text-white/50 leading-[1.6]">A aba eMMC é utilizada para comunicação com memórias eMMC, permitindo leitura, escrita e diagnóstico através de conexão direta ou via ISP.</div>
        <div className="text-[6px] font-semibold text-white/70 mt-0.5">Parâmetros principais:</div>
        {params.map((p, i) => (
          <div key={i} className="rounded-sm p-1.5" style={{ borderLeft: `2px solid ${p.color}`, background: `${p.color}08` }}>
            <div className="text-[5.5px] font-bold mb-0.5" style={{ color: p.color }}>{p.label}</div>
            <div className="text-[4.5px] text-white/50 leading-[1.5]">{p.text}</div>
          </div>
        ))}
        <div className="text-[6px] font-semibold text-white/70 mt-0.5">Modos de operação:</div>
        <div className="flex flex-col gap-1">
          {modes.map((m, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-sm bg-[#06B6D4]/60 shrink-0" />
              <div className="text-[4.5px] text-white/40">{m}</div>
            </div>
          ))}
        </div>
        <div className="text-[5px] text-center text-gray-600 mt-auto">Página 11</div>
      </div>
    </div>
  );
}

export default function ContentPreview() {
  return (
    <section className="py-24 px-6 lg:px-20 relative overflow-hidden">
      <div className="section-divider" />
      <div className="ebook-glow-purple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Preview</Badge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Material técnico de <span className="text-gradient-purple">alto nível</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Conteúdo direto ao ponto, construído para quem trabalha na bancada e precisa de respostas claras.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative flex items-center justify-center gap-4 sm:gap-0 flex-wrap sm:flex-nowrap h-auto sm:h-[400px] py-8 sm:py-0">
            {/* Page left - UFS Params */}
            <div className="sm:absolute" style={{ left: 'calc(50% - 270px)' }}>
              <PageUFS />
            </div>

            {/* Page center - Chip Off (main) */}
            <div className="relative sm:absolute" style={{ zIndex: 10 }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-primary/30">
                  Preview Real
                </span>
              </div>
              <PageChipOff />
            </div>

            {/* Page right - eMMC */}
            <div className="sm:absolute" style={{ right: 'calc(50% - 270px)' }}>
              <PageEMMC />
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="text-gray-500 text-xs text-center mt-8">
            Páginas reais do eBook — Chip Off (p.6), Parâmetros UFS (p.9), Aba eMMC (p.11).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
