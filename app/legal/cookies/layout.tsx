import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politica de Cookies',
  description: 'Politica de cookies de Impulsa Lab. Como usamos cookies y tecnologias de seguimiento.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/legal/cookies' },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
