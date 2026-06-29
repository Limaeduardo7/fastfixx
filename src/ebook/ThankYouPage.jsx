const ACADEMY_URL = 'https://fastfixcaxias.com';
const AI_ASSISTANT_URL = 'https://chatgpt.com/g/g-69d510f8ad4c8191b4a6a3c19ea6b51b-assistente-fastfix';
const SUPPORT_URL = 'https://wa.me/5554981673607?text=Ol%C3%A1!%20Comprei%20o%20eBook%20Flash%2064%20e%20quero%20saber%20sobre%20o%20FastFix%20Academy.';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0B0E14] text-white px-6 lg:px-20 py-12 flex items-center">
      <section className="w-full max-w-3xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-green-400 font-bold">Compra confirmada</p>
        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Obrigado por adquirir o Flash 64 na Prática 🚀</h1>
        <p className="mt-4 text-white/75 leading-relaxed">
          Seu acesso ao eBook foi liberado. Agora, se você quiser acelerar seus resultados de verdade,
          o próximo passo é entrar no <strong className="text-white">FastFix Academy</strong>.
        </p>

        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/30 p-3 md:p-4">
          <img
            src="/images/01.jpg"
            alt="Técnico João Mattoso realizando reparo avançado em placa Android"
            className="w-full h-[180px] md:h-[240px] object-contain"
            loading="eager"
          />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a
            href={ACADEMY_URL}
            className="inline-flex items-center justify-center rounded-xl bg-[#FF6B00] px-6 py-3 font-bold text-white hover:bg-[#E66000] transition"
          >
            Ver página do FastFix Academy
          </a>
          <a
            href={AI_ASSISTANT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-orange-400/40 bg-orange-500/10 px-6 py-3 font-semibold text-orange-100 hover:bg-orange-500/20 transition"
          >
            Acessar Assistente de IA
          </a>
          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 transition sm:col-span-2"
          >
            Falar com suporte
          </a>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Dica: quem aplica o Academy junto com o conteúdo do eBook costuma evoluir mais rápido no diagnóstico e no faturamento da bancada.
        </p>
      </section>
    </main>
  );
}
