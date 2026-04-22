import { useState } from 'react';
import { Reveal } from './ScrollReveal';
import { CTAButton } from './shared';

const AVG_REPAIR_VALUE = 500;

export default function ROICalculator() {
    const [boards, setBoards] = useState(5);

    const monthlyLoss = boards * AVG_REPAIR_VALUE;
    const yearlyLoss = monthlyLoss * 12;
    const courseCost = 497;
    const yearlyMultiple = Math.floor(yearlyLoss / courseCost);

    const formatBRL = (value) =>
        value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

    return (
        <section id="roi-calculator" className="py-20 px-6 lg:px-20 bg-background relative overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -z-10" />

            <div className="max-w-3xl mx-auto">
                <Reveal className="text-center mb-10">
                    <span className="text-primary font-bold text-sm uppercase tracking-widest">Faça as contas</span>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mt-2 leading-tight">
                        Quanto você está deixando<br />
                        <span className="text-primary italic">na mesa</span> todo mês?
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        Cada placa devolvida é dinheiro indo direto pro técnico do lado. Veja o tamanho real do prejuízo.
                    </p>
                </Reveal>

                <Reveal delay={100}>
                    <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-8">
                        {/* Slider */}
                        <div>
                            <div className="flex items-baseline justify-between mb-3">
                                <label htmlFor="boards-slider" className="text-white font-semibold text-sm">
                                    Placas que você devolve por mês:
                                </label>
                                <span className="text-3xl sm:text-4xl font-extrabold text-primary tabular-nums">
                                    {boards}
                                </span>
                            </div>

                            <input
                                id="boards-slider"
                                type="range"
                                min="1"
                                max="30"
                                value={boards}
                                onChange={(e) => setBoards(Number(e.target.value))}
                                style={{ '--fill': `${((boards - 1) / 29) * 100}%` }}
                                className="roi-slider w-full"
                            />

                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>1</span>
                                <span>15</span>
                                <span>30+</span>
                            </div>
                        </div>

                        {/* Result */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-red-500/[0.07] border border-red-500/20 rounded-xl p-5 text-center">
                                <p className="text-red-300/90 text-xs uppercase tracking-wider font-bold mb-2">
                                    Prejuízo por mês
                                </p>
                                <p className="text-3xl sm:text-4xl font-extrabold text-red-400 tabular-nums">
                                    {formatBRL(monthlyLoss)}
                                </p>
                                <p className="text-gray-500 text-xs mt-2">
                                    {boards} placa{boards > 1 ? 's' : ''} × R$ 500 (ticket médio)
                                </p>
                            </div>
                            <div className="bg-red-500/[0.07] border border-red-500/20 rounded-xl p-5 text-center">
                                <p className="text-red-300/90 text-xs uppercase tracking-wider font-bold mb-2">
                                    Prejuízo em 1 ano
                                </p>
                                <p className="text-3xl sm:text-4xl font-extrabold text-red-400 tabular-nums">
                                    {formatBRL(yearlyLoss)}
                                </p>
                                <p className="text-gray-500 text-xs mt-2">
                                    Dinheiro direto pra concorrência
                                </p>
                            </div>
                        </div>

                        {/* Comparison */}
                        <div className="bg-primary/[0.08] border-2 border-primary/30 rounded-xl p-5 sm:p-6 text-center">
                            <p className="text-gray-300 text-sm sm:text-base">
                                O FastFix Academy custa <strong className="text-white">R$ 497</strong>.
                                <br className="hidden sm:inline" />{' '}
                                Você recupera <strong className="text-primary text-lg">{yearlyMultiple}x esse valor</strong> em 12 meses.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <CTAButton
                                action="checkout"
                                placement="roi_calculator"
                                className="w-full max-w-md shadow-2xl shadow-primary/30 uppercase tracking-wider font-extrabold py-4"
                            >
                                Comprar agora
                            </CTAButton>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
