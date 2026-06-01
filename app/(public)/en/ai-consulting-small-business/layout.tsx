import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

const CANONICAL = 'https://www.tuimpulsalab.com/en/ai-consulting-small-business'

export const metadata: Metadata = {
  title: 'AI Consultant for Small Business NYC | from $97/mo',
  description:
    'AI consulting for small businesses in NYC. We build real automations, WhatsApp AI bots & workflows — not slideshows. Free 3D Diagnostic. From $97/mo. Bilingual.',
  alternates: {
    canonical: CANONICAL,
    languages: {
      'en-US': CANONICAL,
      'x-default': CANONICAL,
    },
  },
  openGraph: {
    title: 'AI Consulting for Small Businesses in NYC | Impulsa Lab',
    description:
      'Real tools, not slideshows. An AI implementation consultant that builds automations and WhatsApp AI bots for NYC small businesses. Free 3D Diagnostic. From $97/mo.',
    url: CANONICAL,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab — AI Consulting for Small Businesses in NYC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Consulting for Small Businesses in NYC | Impulsa Lab',
    description:
      'Real tools, not slideshows. We build automations & WhatsApp AI bots for NYC small businesses. Free 3D Diagnostic. From $97/mo.',
    images: ['/opengraph-image.png?v=2'],
  },
  robots: { index: true, follow: true },
}

const faqSchemaItems = [
  { question: 'What does an AI consultant for small business actually do?', answer: 'We find where AI can save you time and money, then we build and launch it inside your business — automations, a WhatsApp AI bot, or workflows connected to the tools you already use. You get working systems, not a strategy report that sits in a drawer.' },
  { question: 'How much does AI consulting cost for a small business?', answer: 'You start with a free 30-minute 3D Diagnostic. After that: AI automation from $97/mo, a WhatsApp AI bot from $297/mo, and AI consulting from $97/mo. Clear pricing, no surprise hourly bills.' },
  { question: 'Do I need to understand technology to work with you?', answer: 'No technical knowledge required. You tell us how your business works; we automate it and connect everything to tools you already use — WhatsApp, Google Sheets, Gmail, your POS — and we train you.' },
  { question: 'Do you work with restaurants and other local NYC businesses?', answer: 'Yes — restaurants, retail and e-commerce, professional services, beauty and wellness, and more, across NYC and beyond. As a bilingual, Queens-based team we serve both English- and Spanish-speaking owners.' },
  { question: 'How fast will I see results?', answer: 'Most automations and WhatsApp bots can go live quickly. From day one your system handles repetitive work, and we track real KPIs — hours saved, faster replies, fewer errors.' },
  { question: 'Is the 3D Diagnostic really free, and is there any obligation?', answer: "It's 100% free with no obligation. In 30 minutes we review your operations, customers, and finances, and you leave with a clear plan of where AI fits and what it would cost." },
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
  { name: 'AI Consulting for Small Businesses', path: '/en/ai-consulting-small-business' },
])

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': CANONICAL + '#service',
  name: 'AI Consulting for Small Businesses — from $97/mo',
  description:
    'AI implementation consulting for small businesses in NYC. We build automations, WhatsApp AI bots and workflows — real tools, not slideshows. Bilingual. Free 3D Diagnostic.',
  url: CANONICAL,
  inLanguage: 'en-US',
  provider: { '@id': 'https://www.tuimpulsalab.com/#organization' },
  serviceType: 'AI Consulting',
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
}

export default function AiConsultingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
