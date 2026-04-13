import { TrendingDown, ShieldCheck, Clock, Wrench, Target, Zap } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { trackEvent } from '../lib/metaTracking';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Menos tentativa e erro',
    desc: 'Reduza drasticamente o tempo gasto em diagnósticos incorretos.',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    accent: 'card-accent-cyan',
    titleColor: 'text-cyan-400',
    highlight: true,
  },
  {
    icon: ShieldCheck,
    title: 'Mais confiança técnica',
    desc: 'Execute procedimentos sabendo exatamente o que esperar em cada etapa.',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    accent: 'card-accent-purple',
    titleColor: 'text-violet-400',
  },
  {
    icon: Clock,
    title: 'Economia de tempo',
    desc: 'Aprenda em horas o que levaria dias de pesquisa dispersa em fórum e YouTube.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    accent: 'card-accent-green',
    titleColor: 'text-emerald-400',
  },
  {
    icon: Wrench,
    title: 'Domínio da ferramenta',
    desc: 'Entenda a Flash64 além do básico. Parâmetros que fazem diferença no resultado.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    accent: 'card-accent-orange',
    titleColor: 'text-primary',
  },
  {
    icon: Target,
    title: 'Mais previsibilidade',
    desc: 'Saiba o que esperar de cada procedimento antes de executar — sem surpresas.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    accent: 'card-accent-blue',
    titleColor: 'text-blue-400',
  },
  {
    icon: Zap,
    title: 'Diagnóstico mais rápido',
    desc: 'Diagnóstico que antes levava horas, agora leva minutos com o método certo.',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-400',
    accent: 'card-accent-yellow',
    titleColor: 'text-yellow-400',
    highlight: true,
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 px-6 lg:px-20 border-t border-white/5 relative overflow-hidden">
      {/* Section divider */}
      <div className="section-divider" />

      {/* Glow orb */}
      <div className="ebook-glow-orange absolute bottom-0 left-0 -z-10" />

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Benefícios</Badge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Ganhos <span className="text-gradient-multi">claros</span> para a sua rotina técnica
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={i * 100}>
                <Card hover className={`h-full ${benefit.accent} ${benefit.highlight ? 'ring-1 ring-white/10 shadow-lg shadow-black/30' : ''}`}>
                  <CardContent>
                    {benefit.highlight && (
                      <div className="flex justify-end mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">Destaque</span>
                      </div>
                    )}
                    <div className={`w-12 h-12 rounded-xl ${benefit.iconBg} flex items-center justify-center mb-5`}>
                      <Icon className={`w-5 h-5 ${benefit.iconColor}`} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${benefit.titleColor}`}>
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

        <Reveal delay={500}>
          <div className="mt-10 text-center">
            <a href="#offer" onClick={() => trackEvent('InitiateCheckout', { currency: 'BRL', value: 67, placement: 'ebook_benefits_cta' })} className="hero-cta inline-flex items-center justify-center bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white font-bold px-8 py-3 rounded-xl">
              Quero esses ganhos
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
