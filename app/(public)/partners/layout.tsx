import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Se Partner de Impulsa Lab — Gana con IA para Latinas',
  description: 'Lleva automatizacion con IA a tus clientes y gana comisiones recurrentes. Programa de aliados para consultores, agencias y freelancers. Aplica hoy.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/partners' },
  openGraph: {
    title: 'Se Partner de Impulsa Lab — Gana con IA para Latinas',
    description: 'Lleva automatizacion con IA a tus clientes y gana comisiones recurrentes. Programa de aliados para consultores, agencias y freelancers. Aplica hoy.',
    url: 'https://www.tuimpulsalab.com/partners',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Partners' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Se Partner de Impulsa Lab — Gana con IA para Latinas',
    description: 'Lleva automatizacion con IA a tus clientes y gana comisiones recurrentes. Programa de aliados para consultores, agencias y freelancers. Aplica hoy.',
    images: ['/images/og-image.jpg'],
  },
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
