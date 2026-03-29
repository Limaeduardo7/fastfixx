import { TrendingDown, ShieldCheck, Clock, Wrench, Target, Zap } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import CountUp from '../components/reactbits/CountUp';
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
    statTarget: 90,
    statSuffix: '%',
    statSuffixColor: 'text-cyan-300',
  },
  {
    icon: ShieldCheck,
    title: 'Mais confiança técnica',
    desc: 'Execute procedimentos com segurança e previsibilidade.',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    accent: 'card-accent-purple',
    titleColor: 'text-violet-400',
    statTarget: 3,
    statSuffix: 'x',
    statSuffixColor: 'text-violet-300',
  },
  {
    icon: Clock,
    title: 'Economia de tempo',
    desc: 'Aprenda em horas o que levaria dias de pesquisa dispersa.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    accent: 'card-accent-green',
    titleColor: 'text-emerald-400',
    statTarget: 70,
    statSuffix: '%',
    statSuffixColor: 'text-emerald-300',
  },
  {
    icon: Wrench,
    title: 'Domínio da ferramenta',
    desc: 'Entenda a Flash64 além do básico. Parâmetros que fazem diferença.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    accent: 'card-accent-orange',
    titleColor: 'text-primary',
    statTarget: 100,
    statSuffix: '%',
    statSuffixColor: 'text-orange-300',
  },
  {
    icon: Target,
    title: 'Mais previsibilidade',
    desc: 'Saiba o que esperar de cada procedimento antes de executar.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    accent: 'card-accent-blue',
    titleColor: 'text-blue-400',
    statTarget: 85,
    statSuffix: '%',
    statSuffixColor: 'text-blue-300',
  },
  {
    icon: Zap,
    title: 'Diagnóstico mais rápido',
    desc: 'Identifique falhas com mais velocidade e precisão.',
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-400',
    accent: 'card-accent-yellow',
    titleColor: 'text-yellow-400',
    statTarget: 5,
    statSuffix: 'x',
    statSuffixColor: 'text-yellow-300',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 px-6 lg:px-20 border-t border-white/5 relative overflow-hidden">
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
                <Card hover className={`h-full ${benefit.accent}`}>
                  <CardContent>
                    {/* Stat number */}
                    <div className="mb-4">
                      <span className={`text-3xl font-extrabold ${benefit.titleColor}`}>
                        <CountUp target={benefit.statTarget} className={benefit.titleColor} />
                        <span className={benefit.statSuffixColor}>{benefit.statSuffix}</span>
                      </span>
                    </div>

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
            <a href="#offer" onClick={() => trackEvent('InitiateCheckout', { currency: 'BRL', value: 47, placement: 'ebook_benefits_cta' })} className="hero-cta inline-flex items-center justify-center bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white font-bold px-8 py-3 rounded-xl">
              Garantir meu Ebook Agora
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
