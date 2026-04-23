import { useEffect } from 'react'
import LoadingScreen from './ebook/LoadingScreen'
import EbookHero from './ebook/EbookHero'
import PainSection from './ebook/PainSection'
import PromiseSection from './ebook/PromiseSection'
import TopicsSection from './ebook/TopicsSection'
import BenefitsSection from './ebook/BenefitsSection'
import BonusSection from './ebook/BonusSection'
import ContentPreview from './ebook/ContentPreview'
import TestimonialsSection from './components/TestimonialsSection'
import AudienceSection from './ebook/AudienceSection'
import OfferSection from './ebook/OfferSection'
import EbookFAQ from './ebook/EbookFAQ'
import FinalCTA from './ebook/FinalCTA'
import AcademyPromoSection from './ebook/AcademyPromoSection'
import EbookFooter from './ebook/EbookFooter'
import EbookWhatsApp from './ebook/EbookWhatsApp'
import EbookNotifications from './ebook/EbookNotifications'
import ThankYouPage from './ebook/ThankYouPage'
import { trackPageView } from './lib/metaTracking'

export default function EbookApp() {
  const pathname = (window.location.pathname || '').replace(/\/+$/, '')
  const isThankYouPage = pathname === '/flash64/obrigado'

  useEffect(() => {
    if (!window.__ebookPageViewTracked) {
      trackPageView()
      window.__ebookPageViewTracked = true
    }
  }, [])

  if (isThankYouPage) {
    return <ThankYouPage />
  }

  return (
    <div className="overflow-x-hidden">
      <LoadingScreen />
      <main className="overflow-x-hidden">
        <EbookHero />
        <PainSection />
        <PromiseSection />
        <TopicsSection />
        <BenefitsSection />
        <TestimonialsSection />
        <BonusSection />
        <ContentPreview />
        <AudienceSection />
        <OfferSection />
        <AcademyPromoSection />
        <EbookFAQ />
        <FinalCTA />
      </main>
      <EbookFooter />
      <EbookWhatsApp />
      <EbookNotifications />
    </div>
  )
}
