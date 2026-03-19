import { Reveal } from './ScrollReveal';
import { CTAButton } from './shared';

const steps = [
    { num: '1', title: 'Insumos', desc: 'Insumos' },
    { num: '2', title: 'Leitura de consumo e falhas de boot', desc: 'Leitura de consumo e falhas de boot' },
    { num: '3', title: 'Micro soldagem cpu e memoria', desc: 'Micro soldagem cpu e memoria' },
    { num: '4', title: 'Reparos completos microsoldagem e software', desc: 'Reparos completos microsoldagem e software' },
    { num: '5', title: 'Flash 64', desc: 'Flash 64' },
];

export default function StepsSection() {
    return (
        <section className="py-24 px-6 lg:px-20 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto">
                <Reveal className="text-center mb-20">
                    <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">
                        Em 4 módulos, você aprende a resolver placas com <span className="text-orange-600">consumo travado</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Um treinamento desenhado para quem já tem noção básica de bancada e quer dominar diagnósticos avançados de forma prática e direta.
                    </p>
                </Reveal>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {steps.map((step, i) => (
                            <Reveal key={step.num} delay={i * 100} className="space-y-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                                    <span className="text-primary font-bold text-xl">{step.num}</span>
                                </div>
                                <h3 className="font-bold text-xl">{step.title}</h3>
                                <p className="text-gray-500 text-sm">{step.desc}</p>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={300}>
                        <img
                            src="/images/04.jpeg"
                            alt="Bancada de ferramentas e multímetro para reparo de smartphones"
                            className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white"
                            loading="lazy"
                            width="6000"
                            height="4000"
                        />
                    </Reveal>
                </div>

                <Reveal className="mt-20 text-center">
                    <CTAButton className="shadow-xl shadow-primary/25 uppercase tracking-wider font-extrabold px-12 py-5">
                        Ver o que está incluso →
                    </CTAButton>
                </Reveal>
            </div>
        </section>
    );
}
