import { Clock, Unplug, HardDrive, SlidersHorizontal, AlertTriangle } from 'lucide-react'
import { Reveal } from '../components/ScrollReveal'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { trackEvent } from '../lib/metaTracking'

const painPoints = [
  {
    icon: Clock,
    title: 'Fica horas na bancada sem sair do lugar',
    description: 'Troca fio, muda parâmetro, reinicia leitura e o resultado é o mesmo. Sem método, cada reparo vira um experimento sem fim.',
    accent: 'card-accent-red',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
  },
  {
    icon: Unplug,
    title: 'ISP não estabiliza e você não sabe por quê',
    description: 'Conecta, tenta comunicação, falha. Reconecta, muda configuração, falha de novo. Sem critério, fica no mesmo ciclo.',
    accent: 'card-accent-orange',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
  },
  {
    icon: HardDrive,
    title: 'Não sabe diferenciar UFS de eMMC na prática',
    description: 'Sabe que existem diferenças, mas na hora de executar não tem clareza de como isso muda o procedimento inteiro.',
    accent: 'card-accent-pink',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-400',
  },
  {
    icon: SlidersHorizontal,
    title: 'Testa parâmetro no achismo e a leitura não vem',
    description: 'Muda uma coisa, testa. Muda outra, testa de novo. Sem entender o porquê, fica tentando até dar sorte.',
    accent: 'card-accent-yellow',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-400',
  },
  {
    icon: AlertTriangle,
    title: 'Perde peça e arca com o prejuízo sozinho',
    description: 'Diagnóstico sem critério leva a peça queimada. E sem método, isso se repete mais do que deveria.',
    accent: 'card-accent-purple',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
]

export default function PainSection() {
  return (
    <section className="py-24 px-6 lg:px-20 border-t border-white/5 relative">
      {/* Section divider */}
      <div className="section-divider" />

      {/* Background glow orb */}
      <div className="ebook-glow-purple absolute top-20 right-0 -z-10" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge variant="destructive" className="mb-4">Diagnóstico</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Isso já{' '}
              <span className="text-red-400">aconteceu com você</span>{' '}
              <span className="text-gradient-fire">na bancada?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Não é falta de habilidade. É falta de um critério claro para saber o que fazer quando a situação trava.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <Reveal key={index} delay={index * 100}>
                <Card hover className={`${point.accent} ${index === painPoints.length - 1 && painPoints.length % 3 === 2 ? 'lg:col-span-1' : ''}`}>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full ${point.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${point.iconColor}`} />
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

        {/* Subtle divider line */}
        <div className="my-12 mx-auto max-w-md h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <Reveal delay={600}>
          <p className="text-center text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
            O problema quase nunca é a ferramenta. É não ter um{' '}
            <span className="text-gradient-cyan font-semibold">método claro de decisão</span>{' '}
            para cada situação que aparece na bancada.
          </p>
        </Reveal>

        <Reveal delay={700}>
          <div className="mt-8 text-center">
            <a href="#offer" onClick={() => trackEvent('InitiateCheckout', { currency: 'BRL', value: 67, placement: 'ebook_pain_cta' })} className="hero-cta inline-flex items-center justify-center bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white font-bold px-8 py-3 rounded-xl">
              Quero parar de improvisar
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
