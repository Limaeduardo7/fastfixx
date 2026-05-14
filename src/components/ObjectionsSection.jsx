import { Reveal } from './ScrollReveal';

const objections = [
    {
        emoji: '🤔',
        question: 'Já tentei outros cursos e não funcionou',
        answer: 'A maioria ensina teoria solta. Aqui você vê a placa real sendo reparada do zero, com esquema, multímetro e termoar — o mesmo passo a passo que o João usa no lab dele todo dia.',
    },
    {
        emoji: '🛠️',
        question: 'Não tenho bancada montada ainda',
        answer: 'O Bônus 1 é a lista exata de ferramentas + fornecedores com desconto. Você monta uma bancada funcional gastando menos do que imagina e já começa a faturar com os primeiros aparelhos.',
    },
    {
        emoji: '👶',
        question: 'Sou iniciante, vai ser difícil pra mim?',
        answer: 'O curso assume que você já mexe com aparelhos, mas começa do básico do diagnóstico. Se você sabe ligar um multímetro, consegue acompanhar — milhares de alunos sem experiência avançada já provaram isso.',
    },
    {
        emoji: '💰',
        question: 'R$ 397 está difícil pra mim agora',
        answer: 'Parcele em até 12x de R$ 33,08. Um único reparo de placa rende entre R$ 300 e R$ 800 — o primeiro conserto que você fizer já paga o curso inteiro. E ainda tem a garantia de 7 dias.',
    },
];

export default function ObjectionsSection() {
    return (
        <section className="py-20 px-6 lg:px-20 bg-background relative">
            <div className="max-w-5xl mx-auto">
                <Reveal className="text-center mb-12">
                    <span className="text-primary font-bold text-sm uppercase tracking-widest">Mas e se...</span>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mt-2 leading-tight">
                        Vamos resolver suas <span className="text-primary italic">últimas dúvidas</span>
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        As 4 maiores razões que travam técnicos sérios. Nenhuma delas precisa te travar mais.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {objections.map((item, i) => (
                        <Reveal
                            key={item.question}
                            delay={i * 80}
                            className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors group"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{item.emoji}</span>
                                <div>
                                    <h3 className="text-white font-bold text-base sm:text-lg leading-snug mb-2">
                                        “{item.question}”
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
