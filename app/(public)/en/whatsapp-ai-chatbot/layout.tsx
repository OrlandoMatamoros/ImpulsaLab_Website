import { Metadata } from 'next'
import { buildBreadcrumbLd } from '@/lib/schema'

const CANONICAL = 'https://www.tuimpulsalab.com/en/whatsapp-ai-chatbot'

export const metadata: Metadata = {
  title: 'WhatsApp AI Chatbot for Business | Done-For-You Setup',
  description:
    'Done-for-you WhatsApp AI chatbot that answers customers, books appointments, and captures leads 24/7. Bilingual setup for NYC small businesses. From $297/mo.',
  alternates: {
    canonical: CANONICAL,
    languages: {
      'en-US': CANONICAL,
      'x-default': CANONICAL,
    },
  },
  openGraph: {
    title: 'WhatsApp AI Chatbot for Business | Impulsa Lab',
    description:
      'Done-for-you WhatsApp AI chatbot that answers customers, books appointments and captures leads 24/7. Bilingual NYC team. Free 3D Diagnostic. From $297/mo.',
    url: CANONICAL,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab — WhatsApp AI Chatbot for Business' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp AI Chatbot for Business | Impulsa Lab',
    description:
      'Done-for-you WhatsApp AI chatbot. Answers, books and captures leads 24/7 in EN & ES. Free 3D Diagnostic. From $297/mo.',
    images: ['/opengraph-image.png?v=2'],
  },
  robots: { index: true, follow: true },
}

const faqSchemaItems = [
  { question: 'What is a WhatsApp AI chatbot for business?', answer: "It's an AI assistant connected to your WhatsApp Business number that automatically answers customer messages, books appointments, and captures leads 24/7 — in English and Spanish. It replies instantly so you never miss a customer." },
  { question: 'Do I need any tech skills or to install anything?', answer: 'No. This is a done-for-you service. We build, set up, test, and launch the chatbot on your existing WhatsApp Business number. You write no code and install nothing.' },
  { question: 'How long does setup take?', answer: 'Most setups go live in days, not months. After your free 3D Diagnostic, we build your chatbot around how your business works, test every conversation, and launch it for you.' },
  { question: 'Can it speak both English and Spanish?', answer: "Yes. We're a bilingual NYC team and your chatbot answers customers in both English and Spanish automatically." },
  { question: 'Will the chatbot replace me or my staff?', answer: 'No — it handles repetitive questions and bookings so you and your team focus on real work. The moment a conversation needs a human, it hands off to you.' },
  { question: 'How much does it cost?', answer: 'The WhatsApp AI chatbot service starts at $297/mo with clear, upfront pricing and no surprise fees. Start with the free 3D Diagnostic before you commit.' },
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
  { name: 'WhatsApp AI Chatbot for Business', path: '/en/whatsapp-ai-chatbot' },
])

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': CANONICAL + '#service',
  name: 'WhatsApp AI Chatbot for Business — from $297/mo',
  description:
    'Done-for-you bilingual WhatsApp AI chatbot for small businesses in NYC: answers customers, books appointments and captures leads 24/7. Free 3D Diagnostic.',
  url: CANONICAL,
  inLanguage: 'en-US',
  provider: { '@id': 'https://www.tuimpulsalab.com/#organization' },
  serviceType: 'AI Customer Service Chatbot',
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
    price: '297',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '297',
      priceCurrency: 'USD',
      unitText: 'monthly',
    },
    url: CANONICAL,
  },
}

export default function WhatsAppChatbotLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
