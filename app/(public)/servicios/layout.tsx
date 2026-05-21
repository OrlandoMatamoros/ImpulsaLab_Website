import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consultoría en IA y Automatización para PYMEs | Impulsa Lab',
  description: 'Agentes IA, automatización con n8n y bots WhatsApp para PYMEs latinas en Nueva York. Consultoría en Finanzas, Operaciones y Marketing. Desde $97/mes.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios',
  },
  openGraph: {
    title: 'Consultoría en IA y Automatización para PYMEs | Impulsa Lab',
    description: 'Agentes IA, automatización con n8n y bots WhatsApp para PYMEs latinas en Nueva York. Consultoría en Finanzas, Operaciones y Marketing. Desde $97/mes.',
    url: 'https://www.tuimpulsalab.com/servicios',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Consultoría en IA y Automatización para PYMEs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría en IA y Automatización para PYMEs | Impulsa Lab',
    description: 'Agentes IA, automatización con n8n y bots WhatsApp para PYMEs latinas en Nueva York. Consultoría en Finanzas, Operaciones y Marketing. Desde $97/mes.',
    images: ['/images/og-image.jpg'],
  },
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
