import EbookHero from './ebook/EbookHero'
import PainSection from './ebook/PainSection'
import PromiseSection from './ebook/PromiseSection'
import TopicsSection from './ebook/TopicsSection'
import BenefitsSection from './ebook/BenefitsSection'
import ContentPreview from './ebook/ContentPreview'
import AudienceSection from './ebook/AudienceSection'
import OfferSection from './ebook/OfferSection'
import EbookFAQ from './ebook/EbookFAQ'
import FinalCTA from './ebook/FinalCTA'
import EbookFooter from './ebook/EbookFooter'
import EbookWhatsApp from './ebook/EbookWhatsApp'

export default function EbookApp() {
  return (
    <>
      <main>
        <EbookHero />
        <PainSection />
        <PromiseSection />
        <TopicsSection />
        <BenefitsSection />
        <ContentPreview />
        <AudienceSection />
        <OfferSection />
        <EbookFAQ />
        <FinalCTA />
      </main>
      <EbookFooter />
      <EbookWhatsApp />
    </>
  )
}
