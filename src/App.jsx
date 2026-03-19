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

export default function App() {
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
