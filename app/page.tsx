import AIBuildBanner from '@/components/AIBuildBanner'
import HeroSection from '@/components/HeroSection'
import TestimonialsBar from '@/components/TestimonialsBar'
import DiagnosticSection from '@/components/DiagnosticSection'
import ToolsHubSection from '@/components/ToolsHubSection'
import RiskShieldSection from '@/components/RiskShieldSection'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'

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
