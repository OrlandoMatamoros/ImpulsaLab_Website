import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing Pages + Marketing Digital con IA — Impulsa Lab',
  description: 'Lanza tu presencia online en días, no meses. Landing pages desde $697, websites desde $2,497 y campañas digitales con IA para PYMEs latinas en EE.UU. Hablamos español.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/marketing',
  },
  openGraph: {
    title: 'Landing Pages + Marketing Digital con IA — Impulsa Lab',
    description: 'Lanza tu presencia online en días, no meses. Landing pages desde $697, websites desde $2,497 y campañas digitales con IA para PYMEs latinas en EE.UU. Hablamos español.',
    url: 'https://www.tuimpulsalab.com/servicios/marketing',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2', width: 1200, height: 630, alt: 'Impulsa Lab - Landing Express y Marketing Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing Pages + Marketing Digital con IA — Impulsa Lab',
    description: 'Lanza tu presencia online en días, no meses. Landing pages desde $697, websites desde $2,497 y campañas digitales con IA para PYMEs latinas en EE.UU. Hablamos español.',
    images: ['/opengraph-image.png?v=2'],
  },
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
