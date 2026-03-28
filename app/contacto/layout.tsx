import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta a Impulsa Lab. Agenda una consulta gratuita sobre transformacion digital, IA y automatizacion para tu negocio.',
  alternates: { canonical: 'https://www.tuimpulsalab.com/contacto' },
}

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
