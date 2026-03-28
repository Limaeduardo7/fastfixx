import { Reveal } from '../components/ScrollReveal';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionItem } from '../components/ui/accordion';

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
];

export default function EbookFAQ() {
  return (
    <section className="py-24 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <Badge className="mb-4">Dúvidas</Badge>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Perguntas frequentes
            </h2>
          </div>
        </Reveal>

        <Accordion>
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 80}>
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
              />
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
