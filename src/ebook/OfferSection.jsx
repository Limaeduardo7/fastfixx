import { Check, Zap, Shield, Lock, Gift, Bot, FileSpreadsheet, ClipboardList, Radio } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';
import { buildCheckoutUrl, trackEvent } from '../lib/metaTracking';

const CHECKOUT_URL = 'https://pay.hotmart.com/B105126454X?checkoutMode=10';

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
      <div className="section-divider mb-12" />

      {/* Glow orbs */}
      <div className="ebook-glow-orange absolute -top-32 left-1/2 -translate-x-1/2 -z-10" />
      <div className="ebook-glow-purple absolute bottom-0 -left-32 -z-10" />
      <div className="ebook-glow-cyan absolute bottom-0 -right-32 -z-10" />

      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="offer-card-glow gradient-border rounded-3xl relative overflow-hidden">
            <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl p-5 sm:p-8 md:p-12 relative">
              <div className="relative z-10 space-y-8">
                <div className="text-center space-y-4">
                  <Badge className="mb-2">Oferta Especial</Badge>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                    <span className="text-gradient-fire">Flash 64 na Prática</span>
                  </h2>
                  <p className="text-gray-300">
                    eBook técnico e objetivo para dominar a Flash64 de verdade.
                  </p>

                  {/* eBook mockup image */}
                  <div className="flex justify-center py-2">
                    <img
                      src="/flash64-hero.webp"
                      alt="eBook Flash 64 na Prática"
                      loading="lazy"
                      decoding="async"
                      width="1402"
                      height="1122"
                      className="w-56 md:w-72 rounded-xl drop-shadow-2xl"
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

                {/* Bonus callouts */}
                <div className="space-y-3">
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">🎁 5 Bônus inclusos na compra</p>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-500/15 shrink-0">
                      <Gift className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-200 text-sm font-semibold">eBook Troca de Memória Flash64</p>
                      <p className="text-gray-400 text-xs mt-0.5">Guia essencial para dominar a troca de eMMC/UFS.</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.06] p-4 flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-violet-500/15 shrink-0">
                      <Bot className="w-4 h-4 text-violet-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-200 text-sm font-semibold">Assistente de IA Exclusivo para Técnicos</p>
                      <p className="text-gray-400 text-xs mt-0.5">IA treinada para responder dúvidas técnicas de reparo.</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] p-4 flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500/15 shrink-0">
                      <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-200 text-sm font-semibold">Planilha de Precificação</p>
                      <p className="text-gray-400 text-xs mt-0.5">Calcule o valor ideal dos seus serviços com precisão.</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/15 shrink-0">
                      <ClipboardList className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-200 text-sm font-semibold">Checklist – Troca de Memória (Profissional)</p>
                      <p className="text-gray-400 text-xs mt-0.5">Protocolo completo para não pular nenhuma etapa.</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.06] p-4 flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-rose-500/15 shrink-0">
                      <Radio className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-200 text-sm font-semibold">Tabela de Partições de RF <span className="text-rose-400 text-xs ml-1">⚠️ essencial</span></p>
                      <p className="text-gray-400 text-xs mt-0.5">Partições de rádio frequência por fabricante e arquitetura.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-8 space-y-6 text-center">
                  {/* Price display */}
                  <div className="space-y-2">
                    <p className="text-gray-500 line-through text-lg">De R$ 97,00</p>
                    <p className="text-gray-300">Por apenas</p>
                    <p className="text-4xl sm:text-5xl font-extrabold text-gradient-fire">R$ 67,00</p>
                    <p className="text-gray-400 text-sm">Menos que o custo de uma peça perdida por diagnóstico errado.</p>
                    <p className="text-gray-500 text-xs mt-1">Acesso imediato após o pagamento</p>
                  </div>

                  <a
                    href={buildCheckoutUrl(CHECKOUT_URL)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('InitiateCheckout', { currency: 'BRL', value: 67, placement: 'ebook_offer_cta' })}
                    className="block"
                  >
                    <button className="hero-cta w-full bg-gradient-to-r from-primary via-orange-500 to-amber-500 hover:from-orange-500 hover:to-primary text-white text-base sm:text-lg font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
                      <Zap className="w-5 h-5" />
                      Garantir meu Ebook Agora
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
