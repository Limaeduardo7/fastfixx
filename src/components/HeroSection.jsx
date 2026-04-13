import { Reveal } from './ScrollReveal';
import { Icon, CTAButton } from './shared';
import DecryptedText from './reactbits/DecryptedText';

export default function HeroSection() {
    return (
        <section id="hero" className="relative min-h-screen pt-10 pb-16 px-6 lg:px-20 flex items-center justify-center overflow-hidden">
            <div className="hero-glow hero-glow--1"></div>
            <div className="hero-glow hero-glow--2"></div>

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-center py-8">
                {/* Left: Copy */}
                <Reveal className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-orange-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        Formação Profissional em Reparo de Placas
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold leading-[1.08] tracking-tight">
                        <DecryptedText
                            text="Pare de devolver placas que você"
                            speed={30}
                            maxIterations={15}
                            sequential={true}
                            revealDirection="start"
                            animateOn="view"
                            className="text-white"
                        />
                        <br />
                        <span className="text-primary">
                            <DecryptedText
                                text="poderia lucrar."
                                speed={30}
                                maxIterations={15}
                                sequential={true}
                                revealDirection="start"
                                animateOn="view"
                                className="text-primary"
                            />
                        </span>
                    </h1>

                    <p className="text-gray-300 text-lg lg:text-xl max-w-lg leading-relaxed">
                        Aprenda a reparar placas que outros técnicos recusam e comece a faturar{' '}
                        <strong className="text-white font-bold">R$ 8.000+/mês</strong> com o serviço mais lucrativo da assistência técnica.
                    </p>

                    <div className="flex flex-col gap-4 pt-2">
                        <CTAButton className="hero-cta w-full sm:w-auto sm:self-start shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 text-base hover:scale-[1.03] active:scale-[0.98] font-bold px-10 py-4">
                            <Icon name="zap" className="[&_svg]:w-5 [&_svg]:h-5" />
                            Quero começar agora
                        </CTAButton>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            {['Acesso vitalício', 'Garantia 7 dias', 'Certificado incluso'].map(text => (
                                <span key={text} className="flex items-center gap-2 text-gray-300 text-sm">
                                    <span className="flex items-center justify-center w-5 h-5 bg-green-500/20 border border-green-500/30 rounded-full shrink-0">
                                        <Icon name="check" className="text-green-400 [&_svg]:w-3 [&_svg]:h-3" />
                                    </span>
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                        <div className="flex -space-x-2.5 shrink-0">
                            {[
                                { letter: 'R', colors: 'from-orange-400 to-orange-600' },
                                { letter: 'A', colors: 'from-blue-400 to-blue-600' },
                                { letter: 'L', colors: 'from-green-400 to-green-600' },
                                { letter: 'J', colors: 'from-cyan-400 to-cyan-600' },
                            ].map(({ letter, colors }) => (
                                <div key={letter} className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors} border-2 border-[#0B0E14] flex items-center justify-center text-white text-xs font-bold`}>
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-0.5">
                                <span className="text-yellow-400 text-sm leading-none">★★★★★</span>
                            </div>
                            <p className="text-gray-300 text-xs mt-0.5">
                                <strong className="text-white font-semibold">+1.200 técnicos</strong> já faturando mais
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* Right: Image */}
                <Reveal delay={300} className="relative">
                    <div className="hero-image-wrapper relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/25 via-transparent to-primary/10 rounded-3xl blur-2xl -z-10"></div>
                        <img
                            src="/images/01.jpg"
                            alt="Técnico João Mattoso realizando reparo avançado em placa Android"
                            className="w-full max-h-[560px] lg:max-h-[640px] object-cover object-top rounded-2xl shadow-2xl relative z-10"
                            fetchPriority="high"
                            width="1600"
                            height="2400"
                        />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-surface border border-white/10 rounded-2xl p-4 shadow-2xl z-20">
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold mb-1">Faturamento médio</p>
                        <p className="text-xl font-extrabold text-white leading-none">R$ 8.000<span className="text-primary">+</span></p>
                        <p className="text-gray-400 text-xs mt-1">/mês após o treinamento</p>
                    </div>
                </Reveal>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs">
                <span>Role para baixo</span>
                <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center pt-1.5">
                    <div className="w-1 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    );
}
