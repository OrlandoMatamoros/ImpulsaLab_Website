import dynamic from 'next/dynamic'
import AIBuildBanner from '@/components/AIBuildBanner'
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import ToolLogosMarquee from '@/components/ToolLogosMarquee'
import TestimonialsBar from '@/components/TestimonialsBar'
import ToolsHubSection from '@/components/ToolsHubSection'

// Below-the-fold components — lazy-loaded to reduce initial JS bundle.
// SSR stays enabled (default) so server renders HTML for SEO indexing;
// only the client-side JS is code-split and parsed on demand.
const DiagnosticSection = dynamic(() => import('@/components/DiagnosticSection'))
const RiskShieldSection = dynamic(() => import('@/components/RiskShieldSection'))
const TeamSection = dynamic(() => import('@/components/TeamSection'))
const ContactSection = dynamic(() => import('@/components/ContactSection'))

// FAQ structured data — server-rendered, NOT via next/script to ensure
// Googlebot sees it in the initial HTML response (IL-6 AUDIT-SEO 2026-04-21)
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es Impulsa Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Impulsa Lab es una agencia de automatización con IA para pequeñas y medianas empresas. Construimos flujos de trabajo automatizados con inteligencia artificial — desde atención al cliente por WhatsApp hasta seguimiento de facturas y generación de leads — para que tu equipo se enfoque en lo que importa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta automatizar mi negocio con Impulsa Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nuestros planes comienzan en $97/mes para automatizaciones esenciales (workflows lineales como captura de leads y seguimiento de facturas). Los planes Growth con agentes de IA van de $297 a $497/mes. Ofrecemos una auditoría gratuita de tu negocio para recomendarte el plan más adecuado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En cuánto tiempo puedo tener mi automatización funcionando?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La mayoría de las automatizaciones Nivel 1 (workflows) están activas en 3 a 5 días hábiles. Los agentes de IA más complejos (Nivel 2) toman entre 1 y 2 semanas incluyendo pruebas y ajustes. No necesitas conocimientos técnicos — nosotros nos encargamos de todo el proceso.',
      },
    },
  ],
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* FAQ JSON-LD — server-rendered for Googlebot (NOT next/script) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AIBuildBanner />
      <HeroSection />
      <StatsBar />
      <ToolLogosMarquee />
      <TestimonialsBar />
      <DiagnosticSection />
      <ToolsHubSection />
      <RiskShieldSection />
      <TeamSection />
      <ContactSection />
    </main>
  )
}
