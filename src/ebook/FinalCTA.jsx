import { Zap } from 'lucide-react';
import { Reveal } from '../components/ScrollReveal';
import { Button } from '../components/ui/button';
import ShinyText from '../components/reactbits/ShinyText';

const CHECKOUT_URL = '#checkout'; // Replace with actual checkout URL

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 lg:px-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10" />

      <div className="max-w-3xl mx-auto text-center space-y-10">
        <Reveal>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6">
            Pare de perder tempo com tentativa e erro.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Tempo economizado. Critério técnico. Menos improviso. Domínio mais
            rápido da ferramenta. Tudo isso em um único material.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <ShinyText
            text="A decisão mais inteligente que você toma hoje é investir no seu método."
            color="#b5b5b5"
            shineColor="#FF6B00"
            speed={3}
            className="text-lg lg:text-xl font-semibold"
          />
        </Reveal>

        <Reveal delay={300}>
          <a href={CHECKOUT_URL}>
            <Button size="xl">
              <Zap className="w-5 h-5" />
              Quero o eBook agora
            </Button>
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Acesso imediato · PDF completo · Leitura objetiva
          </p>
        </Reveal>
      </div>
    </section>
  );
}
