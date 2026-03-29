import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing Express y Marketing Digital con IA para PYMEs',
  description: 'Landing pages profesionales desde $350 + identidad de marca desde $450. Marketing digital con IA para PYMEs latinoamericanas en EE.UU.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/marketing',
  },
  openGraph: {
    title: 'Landing Express y Marketing Digital con IA para PYMEs',
    description: 'Landing pages profesionales desde $350 + identidad de marca desde $450. Marketing digital con IA.',
    url: 'https://www.tuimpulsalab.com/servicios/marketing',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - Landing Express y Marketing Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing Express y Marketing Digital con IA para PYMEs',
    description: 'Landing pages profesionales desde $350 + identidad de marca desde $450. Marketing digital con IA.',
    images: ['/images/og-image.jpg'],
  },
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
