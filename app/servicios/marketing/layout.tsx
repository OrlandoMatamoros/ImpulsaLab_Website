import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing Express y Marketing Digital con IA',
  description: 'Landing pages profesionales desde $350 + identidad de marca desde $450. Marketing digital con IA para PYMEs latinoamericanas.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/marketing',
  },
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
