import { Clock, Unplug, HardDrive, SlidersHorizontal, AlertTriangle } from 'lucide-react'
import { Reveal } from '../components/ScrollReveal'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const painPoints = [
  {
    icon: Clock,
    title: 'Perder dias em tentativa e erro',
    description: 'Sem método, cada reparo vira um experimento que consome tempo e material.',
  },
  {
    icon: Unplug,
    title: 'Falhar na conexão ISP por falta de critério',
    description: 'Conectar sem entender os requisitos gera falhas recorrentes e retrabalho.',
  },
  {
    icon: HardDrive,
    title: 'Não entender UFS e eMMC na prática',
    description: 'Confundir tecnologias de armazenamento compromete todo o procedimento.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Errar parâmetros da Flash64',
    description: 'Configurações incorretas resultam em leituras instáveis e dados corrompidos.',
  },
  {
    icon: AlertTriangle,
    title: 'Desperdiçar tempo por falta de método',
    description: 'A ausência de um fluxo claro transforma tarefas simples em horas perdidas.',
  },
]

export default function PainSection() {
  return (
    <section className="py-24 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge variant="destructive" className="mb-4">Diagnóstico</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Os erros que atrasam técnicos todos os dias
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Reconhecer os gargalos é o primeiro passo para eliminá-los de vez.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <Reveal key={index} delay={index * 100}>
                <Card hover className={index === painPoints.length - 1 && painPoints.length % 3 === 2 ? 'lg:col-span-1' : ''}>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{point.title}</h3>
                        <p className="text-gray-400 text-sm">{point.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={600}>
          <p className="text-center text-gray-300 mt-16 max-w-2xl mx-auto text-lg">
            O problema geralmente não está na ferramenta, mas na falta de{' '}
            <span className="text-primary font-semibold">clareza operacional</span>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
