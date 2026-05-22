import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Automatiza tus Finanzas con IA — Dashboard + CFO Virtual',
  description: 'Tu PYME merece un CFO. Dashboards financieros en Excel/Sheets con IA, proyecciones automaticas y alertas de riesgo. Para restaurantes, tiendas y servicios latinos. desde $997 setup + $147/mes.',
  alternates: {
    canonical: 'https://www.tuimpulsalab.com/servicios/finanzas',
  },
  openGraph: {
    title: 'Automatiza tus Finanzas con IA — Dashboard + CFO Virtual',
    description: 'Tu PYME merece un CFO. Dashboards financieros en Excel/Sheets con IA, proyecciones automaticas y alertas de riesgo. Para restaurantes, tiendas y servicios latinos. desde $997 setup + $147/mes.',
    url: 'https://www.tuimpulsalab.com/servicios/finanzas',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Impulsa Lab - CFO en tu Excel con IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatiza tus Finanzas con IA — Dashboard + CFO Virtual',
    description: 'Tu PYME merece un CFO. Dashboards financieros en Excel/Sheets con IA, proyecciones automaticas y alertas de riesgo. Para restaurantes, tiendas y servicios latinos. desde $997 setup + $147/mes.',
    images: ['/images/og-image.jpg'],
  },
}

export default function FinanzasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
