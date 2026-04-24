import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recursos - Guias y Webinars sobre IA y Automatizacion',
  description: 'Guias practicas y webinars sobre transformacion digital, inteligencia artificial y automatizacion para hacer crecer tu negocio latino en EE.UU.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/recursos' },
  openGraph: {
    title: 'Recursos - Guias y Webinars sobre IA y Automatizacion',
    description: 'Guias practicas y webinars sobre transformacion digital, IA y automatizacion para tu negocio.',
    url: 'https://www.tuimpulsalab.com/recursos',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Recursos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursos - Guias y Webinars sobre IA y Automatizacion',
    description: 'Guias practicas y webinars sobre transformacion digital, IA y automatizacion para tu negocio.',
    images: ['/images/og-image.jpg'],
  },
}

export default function RecursosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
