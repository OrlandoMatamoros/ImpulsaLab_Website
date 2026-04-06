import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politica de Cookies | Impulsa Lab',
  description: 'Politica de cookies de Impulsa Lab. Como usamos cookies y tecnologias de seguimiento en nuestro sitio web.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/legal/cookies' },
  openGraph: {
    title: 'Politica de Cookies | Impulsa Lab',
    description: 'Como usamos cookies y tecnologias de seguimiento en nuestro sitio web.',
    url: 'https://www.tuimpulsalab.com/legal/cookies',
    type: 'website',
  },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
