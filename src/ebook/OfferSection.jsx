import { Check, Zap, Shield, Lock } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
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

const checkColors = [
  'text-emerald-500',
  'text-cyan-400',
  'text-violet-500',
  'text-blue-500',
  'text-emerald-500',
  'text-cyan-400',
  'text-violet-500',
  'text-blue-500',
];

export default function OfferSection() {
  return (
    <section id="offer" className="py-24 px-6 lg:px-20 relative overflow-hidden">
      {/* Section divider */}
      <div className="section-divider mb-24" />

      {/* Glow orbs */}
      <div className="ebook-glow-orange absolute -top-32 left-1/2 -translate-x-1/2 -z-10" />
      <div className="ebook-glow-purple absolute bottom-0 -left-32 -z-10" />
      <div className="ebook-glow-cyan absolute bottom-0 -right-32 -z-10" />

      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="offer-card-glow gradient-border rounded-3xl relative overflow-hidden">
            <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl p-5 sm:p-8 md:p-12 relative">
              {/* Best seller badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white shadow-lg shadow-primary/30">
                  MAIS VENDIDO
                </span>
              </div>

              <div className="relative z-10 space-y-8">
                <div className="text-center space-y-4">
                  <Badge className="mb-2">Oferta Especial</Badge>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                    <span className="text-gradient-multi">Flash 64</span>{' '}
                    <span className="text-gradient-fire">na Prática</span>
                  </h2>
                  <p className="text-gray-300">
                    eBook técnico e objetivo para dominar a Flash64 de verdade.
                  </p>

                  {/* eBook mockup image */}
                  <div className="flex justify-center py-2">
                    <img
                      src="/images/ebook-mockup.png"
                      alt="eBook Flash64 Na Prática"
                      className="w-48 md:w-56 drop-shadow-2xl"
                      style={{ filter: 'drop-shadow(0 0 24px rgba(255,107,0,0.3)) drop-shadow(0 0 48px rgba(139,92,246,0.15))' }}
                    />
                  </div>
                </div>

                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 ${checkColors[i]} shrink-0 mt-0.5`} />
                      <span className="text-gray-200 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-8 space-y-6 text-center">
                  {/* Price display */}
                  <div className="space-y-2">
                    <p className="text-gray-500 line-through text-lg">De R$ 97,00</p>
                    <p className="text-gray-300">Por apenas</p>
                    <p className="text-4xl sm:text-5xl font-extrabold text-gradient-fire">R$ 47,00</p>
                    <p className="text-gray-400 text-sm">Acesso imediato após o pagamento</p>
                  </div>

                  <a href={CHECKOUT_URL} className="block">
                    <button className="hero-cta w-full bg-gradient-to-r from-primary via-orange-500 to-amber-500 hover:from-orange-500 hover:to-primary text-white text-base sm:text-lg font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
                      <Zap className="w-5 h-5" />
                      Garantir meu eBook agora
                    </button>
                  </a>

                  {/* Trust badges */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <span>Compra segura</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span>Acesso imediato</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Lock className="w-4 h-4 text-violet-500" />
                      <span>Material exclusivo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
