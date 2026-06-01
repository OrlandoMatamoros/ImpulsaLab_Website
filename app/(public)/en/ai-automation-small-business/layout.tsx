import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

const CANONICAL = 'https://www.tuimpulsalab.com/en/ai-automation-small-business'

export const metadata: Metadata = {
  title: 'AI Automation for Small Business NYC | from $97/mo',
  description:
    'AI automation & n8n workflows for small businesses in NYC. WhatsApp AI bots, invoicing & lead capture that run 24/7. Book a free 30-min 3D Diagnostic. From $97/mo.',
  alternates: {
    canonical: CANONICAL,
    languages: {
      'en-US': CANONICAL,
      'es': 'https://www.tuimpulsalab.com/es/automatizacion-ia-pequenos-negocios',
      'x-default': CANONICAL,
    },
  },
  openGraph: {
    title: 'AI Automation for Small Business in NYC | Impulsa Lab',
    description:
      'We build AI automations that answer customers, track invoices and capture leads 24/7. Bilingual team in NYC. Free 3D Diagnostic. From $97/mo.',
    url: CANONICAL,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab — AI Automation for Small Business in NYC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation for Small Business in NYC | Impulsa Lab',
    description:
      'We build AI automations that answer customers, track invoices and capture leads 24/7. Free 3D Diagnostic. From $97/mo.',
    images: ['/opengraph-image.png?v=2'],
  },
  robots: { index: true, follow: true },
}

// FAQs mirrored from page.tsx into FAQPage structured data
const faqSchemaItems = [
  {
    question: 'What is AI automation for a small business, exactly?',
    answer:
      "It's software that does your repetitive tasks for you — answering customer messages, capturing and following up on leads, logging invoices, sending reminders, and moving data between the tools you already use. We build it with n8n and Claude AI so it runs 24/7. No technical knowledge needed; if you can use WhatsApp and Google Sheets, you can use what we build.",
  },
  {
    question: 'How much does it cost, and are there hidden fees?',
    answer:
      'Plans start at $97/mo for workflow automation and AI consulting, and from $297/mo for a full WhatsApp AI customer service bot. The free 3D Diagnostic costs $0. The only possible extra costs are third-party platform fees you would pay anyway. We walk through any of that in the Diagnostic before you commit — no surprises.',
  },
  {
    question: 'How fast can it go live?',
    answer:
      'Most small-business automations go live in days, not months. The WhatsApp AI bot can start answering customers from day one. We build and test with your real data first, then launch, train your team, and support you through the first month.',
  },
  {
    question: 'Do you work with my industry — like a dental office or a restaurant?',
    answer:
      'Yes. We build AI automation for dental and medical offices, restaurants and food service, salons and spas, accounting firms, and retail shops, plus other service businesses. Each setup is tailored to how your business actually runs.',
  },
  {
    question: 'Do I need to know anything technical, or hire an AI automation expert in-house?',
    answer:
      "No. We're your AI automation and n8n expert for hire. You tell us how your business works; we design, build, connect, and maintain the system, and hand it over with plain-language training.",
  },
  {
    question: 'Do you serve businesses near me in NYC?',
    answer:
      "Yes. We're a service-area business based in Queens, NYC, serving small businesses across the five boroughs and the wider New York area — and remotely across the U.S. and LATAM. We're bilingual in English and Spanish.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const breadcrumbSchema = buildBreadcrumbLd([
  { name: 'Home', path: '/' },
  { name: 'AI Automation for Small Business', path: '/en/ai-automation-small-business' },
])

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': CANONICAL + '#service',
  name: 'AI Automation for Small Business — from $97/mo',
  description:
    'AI automation and n8n workflows for small businesses in NYC: WhatsApp AI bots, lead capture, invoice tracking and 24/7 customer service. Bilingual team. Free 3D Diagnostic.',
  url: CANONICAL,
  inLanguage: 'en-US',
  provider: { '@id': 'https://www.tuimpulsalab.com/#organization' },
  serviceType: 'Business Process Automation',
  category: 'Artificial Intelligence',
  areaServed: [
    { '@type': 'City', name: 'New York City' },
    { '@type': 'AdministrativeArea', name: 'Queens' },
    { '@type': 'Country', name: 'US' },
    { '@type': 'Country', name: 'CO' },
    { '@type': 'Country', name: 'MX' },
  ],
  offers: {
    '@type': 'Offer',
    price: '97',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '97',
      priceCurrency: 'USD',
      unitText: 'monthly',
    },
    url: CANONICAL,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Automation Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow Automation', description: 'from $97/mo' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WhatsApp AI Customer Service Bot', description: 'from $297/mo' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Consulting for Small Business', description: 'from $97/mo' } },
    ],
  },
}

export default function AiAutomationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
