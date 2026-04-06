import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centro de Ayuda - Soporte y Recursos | Impulsa Lab',
  description: 'Encuentra respuestas, guias y recursos para aprovechar al maximo nuestras soluciones de IA y automatizacion para tu negocio.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/ayuda' },
  openGraph: {
    title: 'Centro de Ayuda - Soporte y Recursos | Impulsa Lab',
    description: 'Respuestas, guias y recursos para aprovechar nuestras soluciones de IA para tu negocio.',
    url: 'https://www.tuimpulsalab.com/ayuda',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Centro de Ayuda' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Centro de Ayuda - Soporte y Recursos | Impulsa Lab',
    description: 'Respuestas, guias y recursos para aprovechar nuestras soluciones de IA para tu negocio.',
    images: ['/images/og-image.jpg'],
  },
}

export default function AyudaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}