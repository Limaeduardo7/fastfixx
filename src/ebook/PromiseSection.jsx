import { X, Check } from 'lucide-react'
import { Reveal } from '../components/ScrollReveal'
import ShinyText from '../components/reactbits/ShinyText'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const transformations = [
  { before: 'De tentativa e erro', after: 'Para método direto' },
  { before: 'De improviso na bancada', after: 'Para procedimento técnico claro' },
  { before: 'De insegurança', after: 'Para mais taxa de acerto' },
  { before: 'De horas perdidas', after: 'Para aprendizado encurtado' },
]

export default function PromiseSection() {
  return (
    <section className="py-24 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">A Transformação</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Clareza técnica que se transforma em resultado
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {transformations.map((item, index) => (
            <Reveal key={index} delay={index * 120}>
              <Card hover>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-red-400 text-sm">{item.before}</span>
                    </div>
                    <span className="text-white/20">→</span>
                    <div className="flex-1 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-green-400 text-sm">{item.after}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-10 md:p-14 text-center mb-12">
            <ShinyText
              text="Foi feito para você executar em horas o que muitos tentam aprender em dias."
              className="text-xl md:text-2xl italic font-medium"
            />
          </div>
        </Reveal>

        <Reveal delay={650}>
          <p className="text-gray-400 text-center max-w-2xl mx-auto leading-relaxed">
            Este material foi estruturado para encurtar a curva de aprendizado e transformar
            conhecimento disperso em procedimento técnico claro, aplicável e replicável.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
