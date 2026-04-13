import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';

const faqs = [
  {
    question: 'Esse eBook serve para iniciantes?',
    answer:
      'Sim. O material foi escrito para ser compreendido mesmo por quem está começando. A linguagem é técnica, mas acessível. Cada conceito é explicado com clareza antes de ser aplicado.',
  },
  {
    question: 'Ele mostra conexão ISP na prática?',
    answer:
      'Sim. Você vai entender quando, como e por que usar ISP, com critérios técnicos claros para cada situação.',
  },
  {
    question: 'Aborda UFS e eMMC?',
    answer:
      'Sim. O eBook explica as diferenças reais entre UFS e eMMC e como isso impacta diretamente o procedimento que você vai executar.',
  },
  {
    question: 'É muito teórico ou vai direto ao ponto?',
    answer:
      'Direto ao ponto. Todo o conteúdo é orientado à prática. Teoria só aparece quando é necessária para fundamentar a execução.',
  },
  {
    question: 'Vou conseguir aprender mais rápido com esse material?',
    answer:
      'Esse é o objetivo principal. O eBook organiza o conhecimento de forma que você pule etapas desnecessárias e vá direto ao que funciona.',
  },
  {
    question: 'Preciso ter muita experiência para aproveitar?',
    answer:
      'Não. O material atende desde técnicos iniciantes até intermediários que querem mais critério. Se você já mexe com celular, vai aproveitar.',
  },
  {
    question: 'E se eu não gostar? Tem garantia?',
    answer:
      'Sim. Você tem 7 dias de garantia incondicional. Se por qualquer motivo o material não fizer sentido para você, basta solicitar o reembolso e devolvemos 100% do valor — sem burocracia.',
  },
];

const itemColors = [
  { accent: 'card-accent-cyan', border: 'border-cyan-400', bg: 'bg-cyan-400', text: 'text-cyan-400' },
  { accent: 'card-accent-violet', border: 'border-violet-500', bg: 'bg-violet-500', text: 'text-violet-500' },
  { accent: 'card-accent-orange', border: 'border-primary', bg: 'bg-primary', text: 'text-primary' },
  { accent: 'card-accent-blue', border: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-500' },
  { accent: 'card-accent-emerald', border: 'border-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-500' },
  { accent: 'card-accent-pink', border: 'border-pink-500', bg: 'bg-pink-500', text: 'text-pink-500' },
  { accent: 'card-accent-green', border: 'border-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-500' },
];

export default function EbookFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-24 px-6 lg:px-20">
      {/* Section divider */}
      <div className="section-divider mb-12" />

      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Dúvidas</Badge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Perguntas <span className="text-gradient-cyan">frequentes</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const color = itemColors[i];
            const isOpen = openIndex === i;

            return (
              <Reveal key={faq.question} delay={i * 80}>
                <div
                  className={`${color.accent} rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden transition-all duration-300`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left"
                  >
                    {/* Numbered circle */}
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full ${color.bg}/20 flex items-center justify-center text-sm font-bold ${color.text}`}
                      style={{
                        backgroundColor: `color-mix(in srgb, currentColor 15%, transparent)`,
                      }}
                    >
                      {i + 1}
                    </span>

                    <span className="flex-1 text-white font-semibold text-sm md:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pl-[3.25rem] sm:pl-[4.25rem]">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
