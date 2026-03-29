import UrgencyBar from './components/UrgencyBar'
import HeroSection from './components/HeroSection'
import BeforeAfterSection from './components/BeforeAfterSection'
import StepsSection from './components/StepsSection'
import BenchSection from './components/BenchSection'
import InstructorSection from './components/InstructorSection'
import AudienceSection from './components/AudienceSection'
import TestimonialsSection from './components/TestimonialsSection'
import BonusSection from './components/BonusSection'
import FeaturesSection from './components/FeaturesSection'
import GuaranteeSection from './components/GuaranteeSection'
import FAQSection from './components/FAQSection'
import FinalCTASection from './components/FinalCTASection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import PurchaseNotifications from './components/PurchaseNotifications'

function HomePage() {
    return (
        <>
            <UrgencyBar />
            <main id="main-content">
                <HeroSection />
                <BeforeAfterSection />
                <StepsSection />
                <BenchSection />
                <InstructorSection />
                <AudienceSection />
                <TestimonialsSection />
                <BonusSection />
                <FeaturesSection />
                <GuaranteeSection />
                <FAQSection />
                <FinalCTASection />
            </main>
            <Footer />
            <PurchaseNotifications />
            <WhatsAppButton />
        </>
    )
}

function Flash64Page() {
    return (
        <main className="min-h-screen bg-[#0B0E14] text-white px-6 lg:px-20 py-10 overflow-x-hidden">
            <div className="w-full max-w-7xl mx-auto">
                <section className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10 text-center">
                    <p className="text-sm uppercase tracking-[0.2em] text-orange-400/90">FastFix</p>
                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">Página Flash64</h1>
                    <p className="mt-4 text-white/75 leading-relaxed">
                        Esta é a rota dedicada da Flash64. Se quiser, eu já transformo em uma landing completa
                        com o conteúdo oficial desse módulo.
                    </p>
                    <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="/"
                            className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                        >
                            Voltar para a inicial
                        </a>
                        <a
                            href="https://wa.me/5554981673607?text=Ol%C3%A1!%20Quero%20saber%20sobre%20a%20Flash64"
                            className="inline-flex items-center justify-center rounded-xl bg-[#FF6B00] px-6 py-3 font-semibold text-white transition hover:bg-[#E66000]"
                        >
                            Falar com suporte
                        </a>
                    </div>
                </section>
            </div>
        </main>
    )
}

function NotFoundPage() {
    return (
        <main className="min-h-screen bg-[#0B0E14] text-white flex items-center justify-center px-6">
            <section className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-orange-400/90">Erro 404</p>
                <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">Página não encontrada</h1>
                <p className="mt-4 text-white/75 leading-relaxed">
                    Esta URL não existe no site da FastFix. Verifique o link ou volte para a página inicial.
                </p>
                <a
                    href="/"
                    className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#FF6B00] px-6 py-3 font-semibold text-white transition hover:bg-[#E66000]"
                >
                    Ir para a página inicial
                </a>
            </section>
        </main>
    )
}

export default function App() {
    const path = (window.location.pathname || '/').replace(/\/$/, '') || '/'

    const routes = {
        '/': <HomePage />,
        '/flash64': <Flash64Page />,
    }

    return routes[path] ?? <NotFoundPage />
}
