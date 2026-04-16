import dynamic from 'next/dynamic'
import AIBuildBanner from '@/components/AIBuildBanner'
import HeroSection from '@/components/HeroSection'
import TestimonialsBar from '@/components/TestimonialsBar'
import DiagnosticSection from '@/components/DiagnosticSection'
import ToolsHubSection from '@/components/ToolsHubSection'

// Below-the-fold components — lazy-loaded to reduce initial JS bundle.
// SSR stays enabled (default) so server renders HTML for SEO indexing;
// only the client-side JS is code-split and parsed on demand.
const RiskShieldSection = dynamic(() => import('@/components/RiskShieldSection'))
const TeamSection = dynamic(() => import('@/components/TeamSection'))
const ContactSection = dynamic(() => import('@/components/ContactSection'))

export default function Home() {
  return (
    <main className="min-h-screen">
      <AIBuildBanner />
      <HeroSection />
      <TestimonialsBar />
      <DiagnosticSection />
      <ToolsHubSection />
      <RiskShieldSection />
      <TeamSection />
      <ContactSection />
    </main>
  )
}
