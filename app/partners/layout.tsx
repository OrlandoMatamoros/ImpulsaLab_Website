import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partners - Programa de Aliados de Impulsa Lab',
  description: 'Unete al programa de partners de Impulsa Lab. Colabora con nosotros para llevar soluciones de IA y transformacion digital a mas PYMEs latinas.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/partners' },
  openGraph: {
    title: 'Partners - Programa de Aliados de Impulsa Lab',
    description: 'Colabora con Impulsa Lab para llevar soluciones de IA a mas empresas latinas en EE.UU.',
    url: 'https://www.tuimpulsalab.com/partners',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Partners' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partners - Programa de Aliados de Impulsa Lab',
    description: 'Colabora con Impulsa Lab para llevar soluciones de IA a mas empresas latinas en EE.UU.',
    images: ['/images/og-image.jpg'],
  },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
