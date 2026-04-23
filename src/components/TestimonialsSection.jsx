import { useState } from 'react';
import { Reveal } from './ScrollReveal';

const screenshots = [
    { src: '/depoimento-1.webp', alt: 'Print de conversa no WhatsApp: aluno comemorando primeiro reparo após o FastFix Academy' },
    { src: '/depoimento-2.webp', alt: 'Print de conversa no WhatsApp: aluno relatando faturamento com placas' },
];

export default function TestimonialsSection() {
    const [lightbox, setLightbox] = useState(null);

    return (
        <section className="py-24 px-6 lg:px-20 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto">
                <Reveal className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                            <path d="M20.52 3.48A11.82 11.82 0 0012.04 0C5.5 0 .19 5.3.19 11.84c0 2.08.55 4.12 1.6 5.91L0 24l6.42-1.68a11.86 11.86 0 005.62 1.43h.01c6.53 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.43zM12.05 21.8h-.01a9.94 9.94 0 01-5.06-1.39l-.36-.21-3.81 1 1.02-3.72-.24-.38a9.9 9.9 0 01-1.52-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.9 6.99c0 5.45-4.44 9.95-9.8 9.95z"/>
                        </svg>
                        Mensagens reais de alunos
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-extrabold mt-4 mb-4">
                        Não acredite em mim. <span className="text-orange-600 italic">veja os prints</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Vídeo e conversas recebidas direto no WhatsApp do João. Nada editado, nada encenado.
                    </p>
                </Reveal>

                {/* Video + Screenshots grid — all portrait 9:16 for visual consistency */}
                <Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {/* Video testimonial */}
                        <figure className="flex flex-col items-center">
                            <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-xl ring-1 ring-black/5">
                                <video
                                    src="/depoimento-video.mp4"
                                    poster="/depoimento-video-poster.webp"
                                    controls
                                    playsInline
                                    preload="none"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    aria-label="Depoimento em vídeo de aluno FastFix Academy"
                                />
                                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    Vídeo
                                </span>
                            </div>
                            <figcaption className="mt-4 text-center">
                                <div className="flex text-yellow-400 text-base justify-center">⭐⭐⭐⭐⭐</div>
                                <p className="text-gray-700 text-sm font-semibold mt-1">Depoimento em vídeo</p>
                                <p className="text-gray-500 text-xs">Recebido via WhatsApp</p>
                            </figcaption>
                        </figure>

                        {/* Screenshot testimonials */}
                        {screenshots.map((shot, i) => (
                            <figure key={shot.src} className="flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() => setLightbox(shot)}
                                    className="group relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-gray-100 shadow-xl ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label={`Ampliar ${shot.alt}`}
                                >
                                    <img
                                        src={shot.src}
                                        alt={shot.alt}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                                        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
                                            <path d="M20.52 3.48A11.82 11.82 0 0012.04 0C5.5 0 .19 5.3.19 11.84c0 2.08.55 4.12 1.6 5.91L0 24l6.42-1.68a11.86 11.86 0 005.62 1.43h.01c6.53 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.43z"/>
                                        </svg>
                                        Print
                                    </span>
                                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-end p-3">
                                        <span className="bg-white/90 text-gray-900 text-[11px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            Clique para ampliar
                                        </span>
                                    </span>
                                </button>
                                <figcaption className="mt-4 text-center">
                                    <div className="flex text-yellow-400 text-base justify-center">⭐⭐⭐⭐⭐</div>
                                    <p className="text-gray-700 text-sm font-semibold mt-1">Conversa #{i + 1}</p>
                                    <p className="text-gray-500 text-xs">Recebida via WhatsApp</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </Reveal>

                {/* Trust footer */}
                <Reveal delay={200}>
                    <p className="text-center text-gray-500 text-sm mt-12 max-w-xl mx-auto">
                        Todas as mensagens foram recebidas diretamente no WhatsApp do João.
                        Os nomes e fotos foram preservados conforme enviados pelos alunos.
                    </p>
                </Reveal>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Visualização ampliada do depoimento"
                    onClick={() => setLightbox(null)}
                    className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <button
                        type="button"
                        onClick={() => setLightbox(null)}
                        aria-label="Fechar"
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition"
                    >
                        ×
                    </button>
                    <img
                        src={lightbox.src}
                        alt={lightbox.alt}
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
                    />
                </div>
            )}
        </section>
    );
}
