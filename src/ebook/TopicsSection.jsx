import { Cable, HardDrive, SlidersHorizontal, Cpu, CircuitBoard, Wifi, Wrench } from 'lucide-react'
import { Reveal } from '../components/ScrollReveal'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const topics = [
  {
    icon: Cable,
    title: 'Conexão ISP com critério',
    description: 'Entenda quando, como e por que conectar via ISP de forma segura e eficiente.',
  },
  {
    icon: HardDrive,
    title: 'UFS vs eMMC na prática',
    description: 'Diferenças reais que impactam o procedimento. Sem teoria desnecessária.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Parâmetros da Flash64',
    description: 'Os ajustes que realmente importam para estabilidade e sucesso na leitura.',
  },
  {
    icon: Cpu,
    title: 'Chip off com segurança',
    description: 'Técnica de remoção com mais previsibilidade e menos risco.',
  },
  {
    icon: CircuitBoard,
    title: 'Arquitetura da placa',
    description: 'Leitura de layout para decisões técnicas mais rápidas e certeiras.',
  },
  {
    icon: Cable,
    title: 'Escolha correta de fios',
    description: 'Material certo para cada situação. Elimine falhas de comunicação.',
  },
  {
    icon: Wifi,
    title: 'Estabilidade de comunicação',
    description: 'Como garantir leitura estável e reduzir erros de conexão.',
  },
  {
    icon: Wrench,
    title: 'Boas práticas de bancada',
    description: 'Rotinas e cuidados que separam amadores de profissionais.',
  },
]

export default function TopicsSection() {
  return (
    <section id="topics" className="py-24 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Conteúdo</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              O que você vai aprender
            </h2>
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
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{topic.title}</h3>
                    <p className="text-gray-400 text-sm">{topic.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
