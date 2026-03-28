import { CheckCircle, XCircle } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const positiveItems = [
  'Técnicos iniciantes que querem acelerar o aprendizado',
  'Técnicos intermediários que buscam mais critério operacional',
  'Profissionais que usam Flash64 e querem reduzir erro',
  'Quem quer entender a lógica por trás do procedimento',
];

const negativeItems = [
  'Quem busca atalhos sem base técnica',
  'Quem prefere continuar no improviso',
  'Quem trata bancada técnica como adivinhação',
];

export default function AudienceSection() {
  return (
    <section className="py-24 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Positive side */}
          <Reveal>
            <Card className="border-green-500/10 h-full">
              <CardContent className="p-8">
                <Badge variant="success" className="mb-6">Para quem é</Badge>
                <h3 className="text-2xl font-bold text-white mb-8">
                  Este eBook foi feito para você se...
                </h3>
                <div className="flex flex-col gap-5">
                  {positiveItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Negative side */}
          <Reveal delay={150}>
            <Card className="border-red-500/10 h-full">
              <CardContent className="p-8">
                <Badge variant="destructive" className="mb-6">Para quem NÃO é</Badge>
                <h3 className="text-2xl font-bold text-white mb-8">
                  Não é para você se...
                </h3>
                <div className="flex flex-col gap-5">
                  {negativeItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
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
