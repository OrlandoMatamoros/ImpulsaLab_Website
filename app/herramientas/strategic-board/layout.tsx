import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Strategic Board | Impulsa Lab',
  description: 'Herramienta interna - Junta Estrategica AI multi-modelo',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StrategicBoardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
