import { CheckCircle, XCircle } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const positiveItems = [
  {
    text: 'Técnicos iniciantes que querem acelerar o aprendizado',
    desc: 'Fundamentos sólidos para começar com o pé direito.',
    iconColor: 'text-emerald-400',
  },
  {
    text: 'Técnicos intermediários que buscam mais critério operacional',
    desc: 'Eleve seu nível com fluxos estruturados e parâmetros reais.',
    iconColor: 'text-cyan-400',
  },
  {
    text: 'Profissionais que usam Flash64 e querem reduzir erro',
    desc: 'Domine cada configuração e elimine diagnósticos incorretos.',
    iconColor: 'text-violet-400',
  },
  {
    text: 'Quem quer entender a lógica por trás do procedimento',
    desc: 'Não apenas o "como", mas o "por quê" de cada passo.',
    iconColor: 'text-blue-400',
  },
];

const negativeItems = [
  {
    text: 'Quem busca atalhos sem base técnica',
    iconColor: 'text-red-400',
  },
  {
    text: 'Quem prefere continuar no improviso',
    iconColor: 'text-orange-400',
  },
  {
    text: 'Quem trata bancada técnica como adivinhação',
    iconColor: 'text-pink-400',
  },
];

export default function AudienceSection() {
  return (
    <section className="py-24 px-6 lg:px-20 border-t border-white/5 relative overflow-hidden">
      {/* Section divider */}
      <div className="section-divider" />

      {/* Glow orb */}
      <div className="ebook-glow-cyan absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Centered header */}
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Público</Badge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Para quem foi <span className="text-gradient-multi">feito</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 relative">
          {/* Positive side */}
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="p-5 sm:p-8">
                <Badge variant="success" className="mb-6">Para quem é</Badge>
                <h3 className="text-2xl font-bold text-white mb-8">
                  Este eBook foi feito para você se...
                </h3>
                <div className="flex flex-col gap-6">
                  {positiveItems.map((item, i) => (
                    <div key={item.text || i} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 ${item.iconColor} shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.text || 'Técnicos iniciantes que querem acelerar o aprendizado'}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {item.desc || 'Fundamentos sólidos para começar com o pé direito.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bridging gradient line */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-[2px] h-32 bg-gradient-to-b from-emerald-500/60 via-primary/60 to-red-500/60 rounded-full" />
          </div>
          {/* Horizontal bridging line on mobile */}
          <div className="flex lg:hidden justify-center -my-4">
            <div className="h-[2px] w-32 bg-gradient-to-r from-emerald-500/60 via-primary/60 to-red-500/60 rounded-full" />
          </div>

          {/* Negative side */}
          <Reveal delay={150}>
            <Card className="border-red-500/10 h-full bg-gradient-to-br from-red-500/5 to-transparent">
              <CardContent className="p-5 sm:p-8">
                <Badge variant="destructive" className="mb-6">Para quem NÃO é</Badge>
                <h3 className="text-2xl font-bold text-white mb-8">
                  Não é para você se...
                </h3>
                <div className="flex flex-col gap-5">
                  {negativeItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <XCircle className={`w-5 h-5 ${item.iconColor} shrink-0 mt-0.5`} />
                      <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
