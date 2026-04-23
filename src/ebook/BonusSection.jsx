import { Gift, Check, Bot, FileSpreadsheet, ClipboardList, Radio } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';

const bonusFeatures = [
  'Troca de eMMC passo a passo',
  'Troca de UFS com segurança',
  'Escolha correta de memória',
  'Cuidados com temperatura e fluxo',
];

const bonuses = [
  {
    id: 'ebook',
    icon: Gift,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/15',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/[0.04]',
    label: 'eBook Bônus',
    title: 'Troca de Memória Flash64',
    description: 'O guia essencial para técnicos que querem dominar a troca de eMMC/UFS. Procedimentos claros, sem improviso.',
    image: '/bonus1-image.webp',
    price: 'R$ 37,00',
    features: bonusFeatures,
  },
  {
    id: 'ia',
    icon: Bot,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/15',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/[0.04]',
    label: 'Acesso Exclusivo',
    title: 'Assistente de IA para Técnicos',
    price: 'R$ 47,00',
    video: '/Animação ROBO LOOP.mp4',
    description: 'IA treinada especificamente para o universo do reparo de placas. Tire dúvidas técnicas, receba orientações de diagnóstico e acelere seu aprendizado.',
    features: [
      'Dúvidas técnicas em tempo real',
      'Orientações de diagnóstico',
      'Treinado para reparo de placas',
      'Disponível 24h por dia',
    ],
  },
  {
    id: 'planilha',
    icon: FileSpreadsheet,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/15',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/[0.04]',
    label: 'Planilha Bônus',
    title: 'Planilha de Precificação',
    price: 'R$ 27,00',
    video: '/video-planilha-precificacao.mp4',
    description: 'Pare de cobrar no achismo. Calcule o valor ideal de cada serviço com base em custos, tempo e margem de lucro.',
    features: [
      'Cálculo por tipo de serviço',
      'Margem de lucro configurável',
      'Custos de insumos inclusos',
      'Pronta para usar imediatamente',
    ],
  },
  {
    id: 'checklist',
    icon: ClipboardList,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/[0.04]',
    label: 'Checklist Bônus',
    title: 'Checklist – Troca de Memória (Profissional)',
    price: 'R$ 17,00',
    description: 'Um checklist completo para garantir que nenhuma etapa seja esquecida durante a troca de memória. Protocolo profissional do início ao fim.',
    features: [
      'Etapas organizadas por fase',
      'Verificações de segurança',
      'Pontos críticos sinalizados',
      'Formato prático de bancada',
    ],
  },
  {
    id: 'rf',
    icon: Radio,
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/15',
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/[0.04]',
    label: 'Tabela Bônus',
    title: 'Tabela de Partições de Rádio Frequência (RF)',
    price: 'R$ 27,00',
    description: 'Guia rápido de bancada com as principais partições de rádio frequência usadas em diferentes fabricantes e arquiteturas. Um dos conteúdos mais importantes do treinamento.',
    highlight: true,
    features: [
      'Partições por fabricante',
      'Diferentes arquiteturas',
      'Referência rápida de bancada',
      'Conteúdo exclusivo do treinamento',
    ],
  },
];

export default function BonusSection() {
  return (
    <section className="py-24 px-6 lg:px-20 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-white/5 text-gray-200 border-white/10">
              <Gift className="w-3.5 h-3.5" />
              Bônus Exclusivos
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              5 bônus inclusos na sua compra
            </h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto">Além do eBook principal, você recebe 5 materiais extras sem custo adicional.</p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {bonuses.map((bonus, index) => {
            const Icon = bonus.icon;
            return (
              <Reveal key={bonus.id} delay={index * 120}>
                <div className={`rounded-2xl border ${bonus.border} ${bonus.bg} overflow-hidden relative`}>
                  {bonus.highlight && (
                    <div className="absolute top-4 right-4 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold px-3 py-1 rounded-full">
                      ⚠️ Conteúdo essencial
                    </div>
                  )}
                  <div className="p-6 sm:p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-7 md:gap-10 items-center md:items-start">
                      {bonus.image && (
                        <div className="flex justify-center shrink-0">
                          <img
                            src={bonus.image}
                            alt={bonus.title}
                            className="w-64 sm:w-80 md:w-96 rounded-2xl"
                          />
                        </div>
                      )}
                      {!bonus.image && !bonus.video && (
                        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${bonus.iconBg} shrink-0`}>
                          <Icon className={`w-8 h-8 ${bonus.iconColor}`} />
                        </div>
                      )}

                      <div className="space-y-4 w-full">
                        <div>
                          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{bonus.label}</p>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{bonus.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{bonus.description}</p>
                        </div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {bonus.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2.5">
                              <Check className={`w-4 h-4 ${bonus.iconColor} shrink-0`} />
                              <span className="text-gray-300 text-sm">{feat}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center gap-4 flex-wrap">
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bonus.iconBg} border ${bonus.border}`}>
                            <Icon className={`w-4 h-4 ${bonus.iconColor}`} />
                            <span className="text-gray-200 text-sm font-bold">Grátis na compra do Flash 64 na Prática</span>
                          </div>
                          {bonus.price && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 line-through text-sm">{bonus.price}</span>
                              <span className="text-emerald-400 font-bold text-sm">R$ 0,00</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {bonus.video && (
                      <div className="mt-8 rounded-xl overflow-hidden border border-white/10">
                        <video
                          src={bonus.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          webkit-playsinline="true"
                          disablePictureInPicture
                          controls={false}
                          onCanPlay={(e) => { e.currentTarget.play().catch(() => {}); }}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
