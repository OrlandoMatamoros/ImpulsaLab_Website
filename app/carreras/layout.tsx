import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Carreras - Trabaja con Nosotros en Impulsa Lab',
  description: 'Explora oportunidades de carrera en Impulsa Lab. Buscamos talento apasionado por la IA y transformacion digital para PYMEs latinas.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/carreras' },
  openGraph: {
    title: 'Carreras - Trabaja con Nosotros en Impulsa Lab',
    description: 'Oportunidades de carrera en IA y transformacion digital. Unete al equipo de Impulsa Lab.',
    url: 'https://www.tuimpulsalab.com/carreras',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Carreras' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carreras - Trabaja con Nosotros en Impulsa Lab',
    description: 'Oportunidades de carrera en IA y transformacion digital. Unete al equipo de Impulsa Lab.',
    images: ['/images/og-image.jpg'],
  },
}

export default function CarrerasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
