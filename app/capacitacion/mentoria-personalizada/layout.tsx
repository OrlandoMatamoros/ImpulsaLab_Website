import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentoria Personalizada 1-a-1 en IA y Tecnologia',
  description: 'Mentoria personalizada 1-a-1 en inteligencia artificial, automatizacion y transformacion digital para tu negocio latino. Desde $300 USD.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/capacitacion/mentoria-personalizada' },
  openGraph: {
    title: 'Mentoria Personalizada 1-a-1 en IA y Tecnologia',
    description: 'Mentoria 1-a-1 en IA y transformacion digital para tu negocio. Desde $300 USD.',
    url: 'https://www.tuimpulsalab.com/capacitacion/mentoria-personalizada',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Mentoria Personalizada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentoria Personalizada 1-a-1 en IA y Tecnologia',
    description: 'Mentoria 1-a-1 en IA y transformacion digital para tu negocio. Desde $300 USD.',
    images: ['/images/og-image.jpg'],
  },
}

export default function MentoriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
