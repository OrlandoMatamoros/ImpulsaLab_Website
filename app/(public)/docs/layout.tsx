import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Documentacion | Impulsa Lab',
    template: '%s | Documentacion | Impulsa Lab',
  },
  description: 'Documentacion tecnica de Impulsa Lab: API, integraciones, webhooks y seguridad para desarrolladores.',
  // /docs es un placeholder "en desarrollo" — noindex centralizado para toda la seccion
  // (indice + api/integraciones/seguridad/webhooks) hasta que haya contenido real.
  robots: { index: false, follow: false },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
