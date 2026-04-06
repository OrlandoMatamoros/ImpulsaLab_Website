import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proteccion de Datos Personales | Impulsa Lab',
  description: 'Conoce como Impulsa Lab protege tus datos personales. Derechos ARCO, politicas de seguridad y tratamiento de informacion.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/legal/datos' },
  openGraph: {
    title: 'Proteccion de Datos Personales | Impulsa Lab',
    description: 'Como protegemos tus datos personales. Derechos ARCO y politicas de seguridad.',
    url: 'https://www.tuimpulsalab.com/legal/datos',
    type: 'website',
  },
}

export default function DatosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
