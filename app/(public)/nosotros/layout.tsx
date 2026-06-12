import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automatización IA para PYMEs Latinas en NYC',
  description: 'Somos el equipo técnico de tu PYME. Automatizamos operaciones, WhatsApp, facturación y marketing con IA. Basados en Queens, NY — 100% en español. Conócenos.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/nosotros' },
  openGraph: {
    title: 'Automatización IA para PYMEs Latinas en NYC',
    description: 'Somos el equipo técnico de tu PYME. Automatizamos operaciones, WhatsApp, facturación y marketing con IA. Basados en Queens, NY — 100% en español. Conócenos.',
    url: 'https://www.tuimpulsalab.com/nosotros',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Nuestro Equipo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatización IA para PYMEs Latinas en NYC',
    description: 'Somos el equipo técnico de tu PYME. Automatizamos operaciones, WhatsApp, facturación y marketing con IA. Basados en Queens, NY — 100% en español. Conócenos.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
