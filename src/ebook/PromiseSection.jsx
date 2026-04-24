import { X, Check } from 'lucide-react'
import { Reveal } from '../components/ScrollReveal'
import ShinyText from '../components/reactbits/ShinyText'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const transformations = [
  {
    before: 'Trocar fio sem saber por que falhou',
    after: 'Entender o que está causando a instabilidade',
    beforeBg: 'from-red-500/10',
    afterBg: 'to-green-500/10',
    beforeColor: 'text-red-400',
    afterColor: 'text-green-400',
    arrowColor: 'text-green-400',
  },
  {
    before: 'Testar parâmetro no achismo',
    after: 'Saber qual configurar e entender por quê',
    beforeBg: 'from-orange-500/10',
    afterBg: 'to-cyan-500/10',
    beforeColor: 'text-orange-400',
    afterColor: 'text-cyan-400',
    arrowColor: 'text-cyan-400',
  },
  {
    before: 'Dúvida entre ISP, chip-off ou outra rota',
    after: 'Critério claro para decidir em cada situação',
    beforeBg: 'from-pink-500/10',
    afterBg: 'to-emerald-500/10',
    beforeColor: 'text-pink-400',
    afterColor: 'text-emerald-400',
    arrowColor: 'text-emerald-400',
  },
  {
    before: 'Horas parado sem sair do lugar',
    after: 'Mais confiança e menos retrabalho',
    beforeBg: 'from-yellow-500/10',
    afterBg: 'to-blue-500/10',
    beforeColor: 'text-yellow-400',
    afterColor: 'text-blue-400',
    arrowColor: 'text-blue-400',
  },
]

export default function PromiseSection() {
  return (
    <section className="py-24 px-6 lg:px-20 relative">
      {/* Section divider */}
      <div className="section-divider" />

      {/* Background glow orbs */}
      <div className="ebook-glow-orange absolute top-32 left-0 -z-10" />
      <div className="ebook-glow-cyan absolute bottom-20 right-0 -z-10" />

      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">A Transformação</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              O que muda quando você tem um{' '}
              <span className="text-gradient-multi">critério na bancada</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {transformations.map((item, index) => (
            <Reveal key={index} delay={index * 120}>
              <Card hover>
                <CardContent>
                  <div className={`flex items-center gap-4 bg-gradient-to-r ${item.beforeBg} ${item.afterBg} rounded-lg p-3 -m-1`}>
                    <div className="flex-1 flex items-center gap-2">
                      <X className={`w-5 h-5 ${item.beforeColor} flex-shrink-0`} />
                      <span className={`${item.beforeColor} text-sm`}>{item.before}</span>
                    </div>
                    <span className={`${item.arrowColor} font-bold`}>→</span>
                    <div className="flex-1 flex items-center gap-2">
                      <Check className={`w-5 h-5 ${item.afterColor} flex-shrink-0`} />
                      <span className={`${item.afterColor} text-sm`}>{item.after}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="gradient-border rounded-2xl">
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 sm:p-10 md:p-16 text-center">
              <ShinyText
                text="Feito por quem já ficou travado nas mesmas situações e precisou encontrar um método por conta própria."
                className="text-base sm:text-xl md:text-2xl italic font-medium"
                shineColor="#06B6D4"
                color="#8B5CF6"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={650}>
          <p className="text-gray-400 text-center max-w-2xl mx-auto leading-relaxed mt-12">
            Em vez de decorar configurações soltas, você vai entender a{' '}
            <span className="text-cyan-400 font-semibold">lógica por trás de cada decisão</span>. Assim você sabe o que testar,
            quando testar e por quê testar. E isso você{' '}
            <span className="text-primary font-semibold">leva para qualquer placa</span> que aparecer na sua bancada.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
