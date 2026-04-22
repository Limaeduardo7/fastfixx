import { Reveal } from './ScrollReveal';
import { Icon, CTAButton } from './shared';

const bonuses = [
    { icon: 'cpu', title: 'Treinamento Completo. 6 Módulos Práticos', desc: 'Do esquema elétrico ao reballing. Tudo filmado na bancada real em alta definição.', price: 'R$ 297,00', isBonus: false },
    { icon: 'gift', title: 'Kit Montagem de Lab', desc: 'A lista exata de ferramentas + fornecedores com desconto que o João usa no lab dele', price: 'R$ 47,00', isBonus: true, num: 1, iconBg: 'bg-green-600' },
    { icon: 'gift', title: 'Grupo de Técnicos no WhatsApp e Discord', desc: 'Tire dúvidas ao vivo com +500 profissionais ativos. Nunca fique travado numa placa.', price: 'R$ 97,00', isBonus: true, num: 2, iconBg: 'bg-green-600' },
    { icon: 'gift', title: 'Módulo Extra: Diagnóstico por Software', desc: 'Debug via software que complementa o hardware. encontre defeitos invisíveis ao multímetro', price: 'R$ 97,00', isBonus: true, num: 3, iconBg: 'bg-green-600' },
];

export default function BonusSection() {
    return (
        <section id="bonus" className="py-24 px-6 lg:px-20 bg-background">
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

                    {/* Pricing card with anchor comparison */}
                    <Reveal delay={400} id="pricing-anchor" className="glass-card p-6 sm:p-8 rounded-2xl space-y-6 border-2 border-primary/40">
                        {/* Anchor pricing comparison */}
                        <div>
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-widest text-center mb-4">
                                Compare antes de decidir
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">🏫</span>
                                        <div>
                                            <p className="text-white text-sm font-semibold">Curso presencial</p>
                                            <p className="text-gray-500 text-xs">Mesmo conteúdo, agenda fixa</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-400 font-bold text-sm sm:text-base line-through">R$ 4.997</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">👤</span>
                                        <div>
                                            <p className="text-white text-sm font-semibold">Mentoria 1:1</p>
                                            <p className="text-gray-500 text-xs">Aulas individuais com o João</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-400 font-bold text-sm sm:text-base line-through">R$ 2.997</span>
                                </div>
                                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-primary/10 border-2 border-primary/40 relative">
                                    <span className="absolute -top-2.5 left-3 bg-primary text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Esta oferta</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">⚡</span>
                                        <div>
                                            <p className="text-white text-sm sm:text-base font-extrabold">FastFix Academy</p>
                                            <p className="text-orange-300/80 text-xs">Online + vitalício + 3 bônus</p>
                                        </div>
                                    </div>
                                    <span className="text-primary font-extrabold text-base sm:text-lg">R$ 497</span>
                                </div>
                            </div>
                        </div>

                        {/* Main offer */}
                        <div className="text-center pt-4 border-t border-white/10 space-y-2">
                            <p className="text-gray-400 text-sm">Hoje, você leva <strong className="text-white">tudo</strong> por:</p>
                            <p className="text-5xl font-extrabold text-primary">R$ 497<span className="text-3xl">,00</span></p>
                            <p className="text-gray-500 text-sm">ou 12x de R$ 41,42 sem juros</p>
                        </div>

                        <div className="flex justify-center">
                            <CTAButton action="checkout" placement="offer_checkout" className="w-full max-w-md shadow-2xl shadow-primary/40 uppercase tracking-wider text-lg py-5 font-extrabold">
                                Comprar agora
                            </CTAButton>
                        </div>
                        <p className="text-gray-500 text-xs text-center">Um único reparo de placa já paga o curso inteiro.</p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
