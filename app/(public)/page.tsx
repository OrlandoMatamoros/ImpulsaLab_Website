import dynamic from 'next/dynamic'
import Link from 'next/link'
import AIBuildBanner from '@/components/AIBuildBanner'

// Below-the-fold components — lazy-loaded to reduce initial JS bundle.
// SSR stays enabled (default) so server renders HTML for SEO indexing;
// only the client-side JS is code-split and parsed on demand.
// HeroSection also code-split: its framer-motion dependency stays out of
// the critical chunk while the hero HTML still server-renders for LCP.
const HeroSection = dynamic(() => import('@/components/HeroSection'))
const StatsBar = dynamic(() => import('@/components/StatsBar'))
const ToolLogosMarquee = dynamic(() => import('@/components/ToolLogosMarquee'))
const TestimonialsBar = dynamic(() => import('@/components/TestimonialsBar'))
const DiagnosticSection = dynamic(() => import('@/components/DiagnosticSection'))
const ToolsHubSection = dynamic(() => import('@/components/ToolsHubSection'))
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
      {/* Novedades strip — server-rendered, no JS needed, signals momentum to investors */}
      <div className="bg-brand-navy/95 border-b border-white/10 py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide">
            Nuevo
          </span>
          <span className="text-gray-300">
            4 auditores de IA monitoreando nuestros sistemas en tiempo real —
          </span>
          <Link
            href="/blog"
            className="text-brand-cyan hover:text-cyan-300 font-medium underline underline-offset-2 transition-colors"
          >
            Ver novedades
          </Link>
        </div>
      </div>
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
