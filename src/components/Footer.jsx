import { Reveal } from './ScrollReveal';
import { CTAButton } from './shared';

export default function Footer() {
    return (
        <footer className="py-20 px-6 lg:px-20 bg-[#07090D] border-t border-white/5 text-gray-500">
            <div className="max-w-7xl mx-auto">
                <Reveal className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Sua carreira não vai esperar. <span className="text-primary">E essa oferta também não.</span>
                    </h2>
                    <CTAButton variant="secondary">
                        Última chance. garantir vaga →
                    </CTAButton>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-12 text-sm">
                    <Reveal>
                        <div className="mb-4">
                            <span className="text-2xl font-extrabold text-white">Fast<span className="text-primary">Fix</span></span>
                            <span className="text-xs text-gray-400 ml-2 uppercase tracking-widest">Academy</span>
                        </div>
                        <p>Formando os melhores especialistas em reparo de placas do Brasil.</p>
                    </Reveal>
                    <Reveal delay={100}>
                        <h3 className="text-white font-bold mb-4 italic">Links Úteis</h3>
                        <ul className="space-y-2">
                            <li><a href="#hero" className="hover:text-primary transition-colors">Início</a></li>
                            <li><a href="#steps" className="hover:text-primary transition-colors">Módulos</a></li>
                            <li><a href="https://wa.me/5554991006375?text=Ol%C3%A1!%20Preciso%20de%20suporte%20com%20o%20FastFix%20Academy." target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Suporte via WhatsApp</a></li>
                        </ul>
                    </Reveal>
                    <Reveal delay={200}>
                        <h3 className="text-white font-bold mb-4 italic">Informações</h3>
                        <ul className="space-y-2">
                            <li>Certificado de conclusão</li>
                            <li>Acesso vitalício</li>
                            <li>Garantia 7 dias</li>
                        </ul>
                    </Reveal>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs">
                    <p className="text-gray-400">© 2026 Fastfix Academy. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
