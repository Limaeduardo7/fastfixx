import { Cable, HardDrive, SlidersHorizontal, Cpu, CircuitBoard, Wifi, Wrench } from 'lucide-react'
import { Reveal } from '../components/ScrollReveal'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { trackEvent } from '../lib/metaTracking'

const topics = [
  {
    icon: Cable,
    title: 'Conexão ISP com critério',
    description: 'Entenda quando, como e por que conectar via ISP de forma segura e eficiente.',
    accent: 'card-accent-cyan',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    titleColor: 'text-cyan-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]',
  },
  {
    icon: HardDrive,
    title: 'UFS vs eMMC na prática',
    description: 'Diferenças reais que impactam o procedimento. Sem teoria desnecessária.',
    accent: 'card-accent-purple',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    titleColor: 'text-violet-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]',
  },
  {
    icon: SlidersHorizontal,
    title: 'Parâmetros da Flash64',
    description: 'Os ajustes que realmente importam para estabilidade e sucesso na leitura.',
    accent: 'card-accent-orange',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    titleColor: 'text-primary',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(255,107,0,0.1)]',
  },
  {
    icon: Cpu,
    title: 'Chip off com segurança',
    description: 'Técnica de remoção com mais previsibilidade e menos risco.',
    accent: 'card-accent-green',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    titleColor: 'text-emerald-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]',
  },
  {
    icon: CircuitBoard,
    title: 'Arquitetura da placa',
    description: 'Leitura de layout para decisões técnicas mais rápidas e certeiras.',
    accent: 'card-accent-blue',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]',
  },
  {
    icon: Cable,
    title: 'Escolha correta de fios',
    description: 'Material certo para cada situação. Elimine falhas de comunicação.',
    accent: 'card-accent-yellow',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]',
  },
  {
    icon: Wifi,
    title: 'Estabilidade de comunicação',
    description: 'Como garantir leitura estável e reduzir erros de conexão.',
    accent: 'card-accent-pink',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-400',
    titleColor: 'text-pink-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]',
  },
  {
    icon: Wrench,
    title: 'Boas práticas de bancada',
    description: 'Rotinas e cuidados que separam amadores de profissionais.',
    accent: 'card-accent-red',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    titleColor: 'text-red-400',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]',
  },
]

export default function TopicsSection() {
  return (
    <section id="topics" className="py-24 px-6 lg:px-20 border-t border-white/5 relative">
      {/* Section divider */}
      <div className="section-divider" />

      {/* Background glow orbs */}
      <div className="ebook-glow-cyan absolute top-20 left-0 -z-10" />
      <div className="ebook-glow-purple absolute bottom-20 right-0 -z-10" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Conteúdo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              O que você vai <span className="text-gradient-cyan">aprender</span>
            </h2>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-3">8 módulos. Zero enrolação.</p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cada módulo foi pensado para resolver problemas reais da bancada, com clareza e aplicação imediata.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => {
            const Icon = topic.icon
            return (
              <Reveal key={index} delay={index * 80}>
                <Card hover className={`h-full ${topic.accent} ${topic.hoverShadow} transition-shadow duration-300`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full ${topic.iconBg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${topic.iconColor}`} />
                    </div>
                    <h3 className={`font-semibold ${topic.titleColor} mb-2`}>{topic.title}</h3>
                    <p className="text-gray-400 text-sm">{topic.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={500}>
          <div className="mt-10 text-center">
            <a href="#offer" onClick={() => trackEvent('InitiateCheckout', { currency: 'BRL', value: 67, placement: 'ebook_topics_cta' })} className="hero-cta inline-flex items-center justify-center bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white font-bold px-8 py-3 rounded-xl">
              Ver oferta completa
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
