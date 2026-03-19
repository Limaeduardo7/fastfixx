import { useState } from 'react';
import { Reveal } from './ScrollReveal';

const faqs = [
    { q: 'Preciso ter experiência para fazer o curso?', a: 'Sim, precisa ter. O curso foi desenvolvido para quem já trabalha com aparelhos, mas está com dificuldades em análise de aparelhos que não ligam e queira aprender sobre reparos avançados em CPUs.' },
    { q: 'Por quanto tempo tenho acesso ao curso?', a: 'O acesso é vitalício. Pode assistir quando quiser, quantas vezes quiser, no seu ritmo. E todas as atualizações futuras estão inclusas. sem pagar nada a mais.' },
    { q: 'R$ 347 é muito pra mim agora. Vale a pena?', a: 'Um único reparo de placa rende entre R$ 300 e R$ 800. Ou seja, o primeiro conserto que você fizer já paga o curso inteiro. e sobra. É o investimento com retorno mais rápido que você vai fazer na carreira. E ainda pode parcelar em até 12x de R$ 28,92.' },
    { q: 'Posso pagar no Pix ou boleto?', a: 'Sim! Aceitamos Pix, boleto bancário e cartão de crédito em até 12x. O acesso pelo Pix e cartão é imediato. Pelo boleto, após a compensação (1-3 dias úteis).' },
    { q: 'E se eu não gostar do curso?', a: 'Sem problema! Você tem 7 dias de garantia incondicional. Se não ficar satisfeito por qualquer motivo, devolvemos 100% do seu dinheiro. Um e-mail e pronto. Sem burocracia.' },
    { q: 'Tem certificado?', a: 'Sim! Ao concluir todos os módulos, você recebe um certificado digital de conclusão que pode adicionar ao currículo ou perfil profissional.' },
    { q: 'Que ferramentas vou precisar?', a: 'No bônus "Kit Montagem de Lab" você recebe a lista completa com fornecedores. Para começar, o básico (ferro de solda, multímetro e lupa) já é suficiente. O João indica os melhores equipamentos custo-benefício conforme você avança.' },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(-1);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? -1 : i);
    };

    return (
        <section className="py-24 px-6 lg:px-20 bg-gray-50 text-gray-900 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
                <Reveal className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
                        Perguntas <span className="text-orange-600 italic">frequentes</span>
                    </h2>
                    <p className="text-gray-500">Ainda tem dúvidas? Veja as respostas abaixo.</p>
                </Reveal>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <Reveal key={i} delay={i * 50} className="faq-item bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            <button
                                className="faq-trigger w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggle(i)}
                            >
                                <span className="font-bold text-lg pr-4">{faq.q}</span>
                                <span className="faq-icon text-primary text-2xl font-bold shrink-0 transition-transform duration-300">
                                    {openIndex === i ? '×' : '+'}
                                </span>
                            </button>
                            {openIndex === i && (
                                <div className="faq-content px-6 pb-6">
                                    <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                                </div>
                            )}
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
