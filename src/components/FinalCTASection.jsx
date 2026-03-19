import { Reveal } from './ScrollReveal';
import { Icon, CTAButton } from './shared';
import ShinyText from './reactbits/ShinyText';

export default function FinalCTASection() {
    return (
        <section className="py-24 px-6 lg:px-20 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10"></div>
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <Reveal>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">
                        <ShinyText text="A decisão é simples:" color="#ffffff" shineColor="#FF6B00" speed={3} className="text-3xl lg:text-5xl font-extrabold" />
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Continuar devolvendo placas e perdendo dinheiro. ou dominar o reparo mais lucrativo da assistência técnica.{' '}
                        <strong className="text-white">Que futuro você escolhe?</strong>
                    </p>
                </Reveal>

                <Reveal className="glass-card p-10 rounded-3xl grid sm:grid-cols-2 gap-6 items-center">
                    {['Acesso Vitalício', 'Certificado de Conclusão', 'Suporte com o João', 'Garantia de 7 Dias', '3 Bônus Exclusivos', 'Lista de Fornecedores'].map(text => (
                        <div key={text} className="flex items-center gap-4 text-left">
                            <Icon name="checkCircle" className="text-primary" />
                            <span className="font-semibold">{text}</span>
                        </div>
                    ))}

                    <div className="sm:col-span-2 pt-6 space-y-4">
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-gray-400 text-xl line-through">R$ 1.297,00</span>
                            <span className="text-4xl font-extrabold text-primary">R$ 347,00</span>
                        </div>
                        <CTAButton className="w-full shadow-2xl shadow-primary/40 uppercase tracking-widest text-lg py-5 font-extrabold hover:scale-[1.02] active:scale-[0.98]">
                            Entrar agora. acesso imediato →
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
