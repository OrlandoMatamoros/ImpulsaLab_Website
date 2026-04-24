import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros - Equipo de Consultoria Digital en Brooklyn, NY',
  description: 'Conoce al equipo de Impulsa Lab en Brooklyn, NY. Expertos en transformacion digital, IA y consultoria para PYMEs latinas en Estados Unidos.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/nosotros' },
  openGraph: {
    title: 'Nosotros - Equipo de Consultoria Digital en Brooklyn, NY',
    description: 'Expertos en transformacion digital, IA y consultoria para PYMEs latinas en Estados Unidos.',
    url: 'https://www.tuimpulsalab.com/nosotros',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Nuestro Equipo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros - Equipo de Consultoria Digital en Brooklyn, NY',
    description: 'Expertos en transformacion digital, IA y consultoria para PYMEs latinas en Estados Unidos.',
    images: ['/images/og-image.jpg'],
  },
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
