import { TrendingDown, ShieldCheck, Clock, Wrench, Target, Zap } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Menos tentativa e erro',
    desc: 'Reduza drasticamente o tempo gasto em diagnósticos incorretos.',
  },
  {
    icon: ShieldCheck,
    title: 'Mais confiança técnica',
    desc: 'Execute procedimentos com segurança e previsibilidade.',
  },
  {
    icon: Clock,
    title: 'Economia de tempo',
    desc: 'Aprenda em horas o que levaria dias de pesquisa dispersa.',
  },
  {
    icon: Wrench,
    title: 'Domínio da ferramenta',
    desc: 'Entenda a Flash64 além do básico. Parâmetros que fazem diferença.',
  },
  {
    icon: Target,
    title: 'Mais previsibilidade',
    desc: 'Saiba o que esperar de cada procedimento antes de executar.',
  },
  {
    icon: Zap,
    title: 'Diagnóstico mais rápido',
    desc: 'Identifique falhas com mais velocidade e precisão.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Benefícios</Badge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Ganhos claros para a sua rotina técnica
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={i * 100}>
                <Card hover className="h-full">
                  <CardContent>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {benefit.desc}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
