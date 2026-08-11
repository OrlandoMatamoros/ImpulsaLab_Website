import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto - Agenda tu Consulta Gratuita',
  description: 'Contacta a Impulsa Lab en Queens, NY. Agenda una consulta gratuita sobre transformacion digital, IA y automatizacion para tu negocio.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/contacto' },
  openGraph: {
    title: 'Contacto - Agenda tu Consulta Gratuita con Impulsa Lab',
    description: 'Agenda una consulta gratuita sobre transformacion digital, IA y automatizacion para tu negocio.',
    url: 'https://www.tuimpulsalab.com/contacto',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Contacto' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto - Agenda tu Consulta Gratuita con Impulsa Lab',
    description: 'Agenda una consulta gratuita sobre transformacion digital, IA y automatizacion para tu negocio.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
