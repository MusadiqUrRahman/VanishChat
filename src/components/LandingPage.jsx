import Header from './Header'
import Footer from './Footer'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import FeatureShowcase from './FeatureShowcase'
import UseCases from './UseCases'
import TrustSection from './TrustSection'
import CTASection from './CTASection'
import ScrollProgress from './ScrollProgress'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <ScrollProgress />
      <Header />

      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <FeatureShowcase />
        <UseCases />
        <TrustSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
