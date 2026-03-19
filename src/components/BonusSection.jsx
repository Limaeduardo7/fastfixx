import { Reveal } from './ScrollReveal';
import { Icon, CTAButton } from './shared';

const bonuses = [
    { icon: 'cpu', title: 'Treinamento Completo. 6 Módulos Práticos', desc: 'Do esquema elétrico ao reballing. Tudo filmado na bancada real em alta definição.', price: 'R$ 297,00', isBonus: false },
    { icon: 'gift', title: 'Kit Montagem de Lab', desc: 'A lista exata de ferramentas + fornecedores com desconto que o João usa no lab dele', price: 'R$ 47,00', isBonus: true, num: 1, iconBg: 'bg-green-600' },
    { icon: 'gift', title: 'Rede de Técnicos FastFix (Telegram VIP)', desc: 'Tire dúvidas ao vivo com +1.200 profissionais ativos. Nunca fique travado numa placa.', price: 'R$ 97,00', isBonus: true, num: 2, iconBg: 'bg-green-600' },
    { icon: 'gift', title: 'Módulo Extra: Diagnóstico por Software', desc: 'Debug via software que complementa o hardware. encontre defeitos invisíveis ao multímetro', price: 'R$ 97,00', isBonus: true, num: 3, iconBg: 'bg-green-600' },
];

export default function BonusSection() {
    return (
        <section className="py-24 px-6 lg:px-20 bg-background">
            <div className="max-w-4xl mx-auto">
                <Reveal className="text-center mb-16">
                    <span className="text-primary font-bold text-sm uppercase tracking-widest">Tudo que está incluso</span>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mt-2">
                        Mais que um curso. um <span className="text-primary italic">arsenal completo</span>
                    </h2>
                </Reveal>

                <div className="space-y-4">
                    {bonuses.map((item, i) => (
                        <Reveal key={item.title} delay={i * 100} className={`glass-card p-6 rounded-2xl flex items-center justify-between ${item.isBonus ? 'border-primary/30' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 ${item.iconBg || 'bg-primary'} rounded-xl shrink-0`}>
                                    <Icon name={item.icon} />
                                </div>
                                <div>
                                    {item.isBonus && (
                                        <div className="flex items-center gap-2">
                                            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">BÔNUS {item.num}</span>
                                        </div>
                                    )}
                                    <h3 className={`font-bold text-lg ${item.isBonus ? 'mt-1' : ''}`}>{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                            <span className="text-gray-500 font-semibold text-sm line-through whitespace-nowrap">{item.price}</span>
                        </Reveal>
                    ))}

                    {/* Total value */}
                    <Reveal delay={400} id="pricing-anchor" className="glass-card p-8 rounded-2xl text-center space-y-4 border-2 border-primary/40">
                        <p className="text-gray-400 text-sm uppercase font-bold tracking-wide">Valor total de tudo:</p>
                        <p className="text-3xl font-extrabold text-gray-400 line-through">R$ 1.297,00</p>
                        <p className="text-gray-400">Hoje, você leva tudo por apenas:</p>
                        <p className="text-5xl font-extrabold text-primary">R$ 347,00</p>
                        <p className="text-gray-500 text-sm">ou 12x de R$ 28,92</p>
                        <CTAButton className="w-full max-w-md mx-auto shadow-2xl shadow-primary/40 uppercase tracking-wider text-lg py-5 font-extrabold">
                            Garantir por R$ 347,00 →
                        </CTAButton>
                        <p className="text-gray-500 text-xs">Um único reparo de placa já paga o curso inteiro.</p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
