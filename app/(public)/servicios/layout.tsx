import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios de Consultoria Digital con IA para PYMEs',
  description: 'Automatizacion con IA, agentes n8n y bots WhatsApp para PYMEs latinas en Nueva York. Soluciones en Finanzas, Operaciones y Marketing. Diagnostico 3D gratuito. Desde $97/mes.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios',
  },
  openGraph: {
    title: 'Servicios de Consultoria Digital con IA para PYMEs',
    description: 'Automatizacion con IA, agentes n8n y bots WhatsApp para PYMEs latinas en Nueva York. Soluciones en Finanzas, Operaciones y Marketing. Diagnostico 3D gratuito. Desde $97/mes.',
    url: 'https://www.tuimpulsalab.com/servicios',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Servicios' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios de Consultoria Digital con IA para PYMEs',
    description: 'Automatizacion con IA, agentes n8n y bots WhatsApp para PYMEs latinas en Nueva York. Soluciones en Finanzas, Operaciones y Marketing. Diagnostico 3D gratuito. Desde $97/mes.',
    images: ['/images/og-image.jpg'],
  },
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
