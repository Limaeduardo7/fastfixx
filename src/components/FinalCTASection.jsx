import { Reveal } from './ScrollReveal';
import { CTAButton } from './shared';
import ShinyText from './reactbits/ShinyText';

export default function FinalCTASection() {
    return (
        <section className="py-24 px-6 lg:px-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10"></div>
            <div className="max-w-3xl mx-auto text-center space-y-10">
                <Reveal>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">
                        <ShinyText text="A decisão é simples:" color="#ffffff" shineColor="#FF6B00" speed={3} className="text-3xl lg:text-5xl font-extrabold" />
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Continuar trocando peça no chute e devolvendo placa que poderia ter virado lucro. Ou ter um método claro para chegar na causa real do defeito.
                    </p>
                    <p className="text-gray-500 text-sm mt-3 italic">
                        A placa não está sem conserto. Você só precisa de um método.
                    </p>
                </Reveal>

                <Reveal>
                    <div className="glass-card p-8 rounded-3xl border-primary/30 space-y-6">
                        <p className="text-white text-xl font-bold">
                            Daqui a 30 dias, você pode estar trocando peça no chute do mesmo jeito.<br />
                            <span className="text-primary">Ou diagnosticando placas que antes você devolvia.</span>
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
                            {['Acesso vitalício', 'Garantia 7 dias', '3 bônus inclusos', 'Suporte direto'].map(text => (
                                <span key={text} className="flex items-center gap-1.5">
                                    <span className="text-green-400">✓</span> {text}
                                </span>
                            ))}
                        </div>

                        <div className="pt-2">
                            <p className="text-gray-400 text-sm mb-1">Por apenas</p>
                            <p className="text-4xl font-extrabold text-primary">R$ 397,00</p>
                            <p className="text-gray-500 text-xs mt-1">ou 12x de R$ 33,08</p>
                        </div>

                        <CTAButton action="checkout" placement="final_cta" className="w-full max-w-md mx-auto shadow-2xl shadow-primary/40 uppercase tracking-widest text-lg py-5 font-extrabold hover:scale-[1.02] active:scale-[0.98]">
                            Comprar agora
                        </CTAButton>
                        <p className="text-gray-500 text-xs text-center">
                            🔒 Pagamento 100% seguro • Acesso imediato após a confirmação
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
