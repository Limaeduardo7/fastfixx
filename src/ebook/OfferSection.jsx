import { Check, Zap } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const CHECKOUT_URL = '#checkout'; // Replace with actual checkout URL

const features = [
  'Conexão ISP com critério técnico',
  'Diferença prática entre UFS e eMMC',
  'Parâmetros essenciais da Flash64',
  'Chip off com mais segurança',
  'Leitura de arquitetura da placa',
  'Escolha correta de fios e materiais',
  'Estabilidade de comunicação',
  'Boas práticas de bancada profissional',
];

export default function OfferSection() {
  return (
    <section id="offer" className="py-24 px-6 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="bg-white/[0.03] border border-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="text-center space-y-4">
                <Badge className="mb-2">Oferta Especial</Badge>
                <h2 className="text-3xl font-extrabold text-white">
                  Dominando a Flash64
                </h2>
                <p className="text-gray-300">
                  eBook técnico e objetivo para dominar a Flash64 de verdade.
                </p>
              </div>

              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-gray-200 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-8 space-y-6 text-center">
                {/* Price placeholder - update when defined */}
                <p className="text-gray-300">Acesso imediato ao PDF completo</p>

                <a href={CHECKOUT_URL} className="block">
                  <Button size="xl" className="w-full">
                    <Zap className="w-5 h-5" />
                    Garantir meu eBook agora
                  </Button>
                </a>

                <p className="text-gray-500 text-xs">
                  🔒 Pagamento seguro · Acesso imediato após confirmação
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
