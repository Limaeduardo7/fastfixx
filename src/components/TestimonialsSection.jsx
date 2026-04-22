import { Reveal } from './ScrollReveal';

const testimonials = [
    {
        text: '"Cara, eu achei que ia ser mais um cursinho genérico. Mas na segunda semana já consertei uma placa que a assistência tinha devolvido pro cliente. Faturei R$ 350 nesse reparo.',
        highlight: 'Hoje tiro R$ 9.000/mês',
        suffix: ' só com placa."',
        initials: 'RM',
        name: 'Rafael M.',
        handle: '@rafael.tech. São Paulo, SP',
    },
    {
        text: '"A parada é que o João responde rápido. Travei numa placa de um Redmi, mandei foto no grupo e em 20 min já tinha a solução. Nenhum curso que fiz antes tinha esse suporte.',
        highlight: 'Valeu cada centavo.',
        suffix: '"',
        initials: 'JC',
        name: 'João C.',
        handle: '@joaocell.bh. Belo Horizonte, MG',
    },
    {
        text: '"Trabalhava para uma assistência técnica e hoje tenho o meu próprio laboratório.',
        highlight: 'Recusei proposta CLT de R$ 4.500',
        suffix: ' porque ganho o dobro por conta própria."',
        initials: 'LS',
        name: 'Lucas S.',
        handle: '@lucasfix.cwb. Curitiba, PR',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 px-6 lg:px-20 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto">
                <Reveal className="text-center mb-16">
                    <span className="text-orange-700 font-bold text-sm uppercase tracking-widest">Resultados reais</span>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mt-2 mb-4">
                        Não acredite em mim. <span className="text-orange-600 italic">veja os números</span>
                    </h2>
                    <p className="text-gray-500 text-lg">Quem passa pelo treinamento não volta ao serviço básico. Os resultados falam.</p>
                </Reveal>

                {/* Featured Video Testimonial */}
                <Reveal className="mb-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                                    <path d="M20.52 3.48A11.82 11.82 0 0012.04 0C5.5 0 .19 5.3.19 11.84c0 2.08.55 4.12 1.6 5.91L0 24l6.42-1.68a11.86 11.86 0 005.62 1.43h.01c6.53 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.43zM12.05 21.8h-.01a9.94 9.94 0 01-5.06-1.39l-.36-.21-3.81 1 1.02-3.72-.24-.38a9.9 9.9 0 01-1.52-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.9 6.99c0 5.45-4.44 9.95-9.8 9.95z"/>
                                </svg>
                                Depoimento em vídeo
                            </span>
                        </div>

                        <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center bg-gray-50 border border-gray-100 rounded-3xl p-5 sm:p-6 md:p-8">
                            {/* Video frame (WhatsApp portrait style) */}
                            <div className="relative mx-auto w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-xl ring-1 ring-black/5">
                                <video
                                    src="/depoimento-video.mp4"
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    aria-label="Depoimento em vídeo de aluno FastFix Academy"
                                />
                            </div>

                            {/* Context card */}
                            <div className="text-center md:text-left">
                                <div className="flex text-yellow-400 text-lg justify-center md:justify-start">⭐⭐⭐⭐⭐</div>
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed italic mt-3">
                                    "Recebi esse áudio de um aluno semana passada. Ele mandou direto no meu WhatsApp contando
                                    como foi o primeiro reparo depois do treinamento. <strong className="text-gray-900 not-italic">Esse é o tipo de resultado que a gente vê todo dia.</strong>"
                                </p>
                                <div className="flex items-center gap-3 justify-center md:justify-start pt-4 mt-4 border-t border-gray-200">
                                    <div className="w-11 h-11 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-primary font-bold text-sm">JT</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm text-gray-900">Aluno FastFix Academy</p>
                                        <p className="text-gray-500 text-xs">Mensagem recebida via WhatsApp</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Testimonial Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <Reveal key={t.initials} delay={i * 100} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-4">
                            <div className="flex text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
                            <p className="text-gray-600 text-sm leading-relaxed italic">
                                {t.text} <strong className="text-gray-900">{t.highlight}</strong>{t.suffix}
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                    <span className="text-primary font-bold text-sm">{t.initials}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-900">{t.name}</p>
                                    <p className="text-gray-500 text-xs">{t.handle}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
