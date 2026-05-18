import Link from 'next/link'
import { Metadata } from 'next'
import MascotV15 from '@/components/MascotV15'

export const metadata: Metadata = {
  title: '404 - Pagina no encontrada | Impulsa Lab',
  description: 'La pagina que buscas no existe o ha sido movida. Vuelve al inicio de Impulsa Lab.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <MascotV15
        size={140}
        variant="default"
        expression="pensativo"
        animate
        ariaLabel="Mascota Impulsa Lab pensativa"
        className="mb-6"
      />
      <h1 className="text-7xl font-bold text-brand-navy mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        No encontramos esta pagina
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        La pagina que buscas no existe o ha sido movida.
        Te invitamos a explorar nuestros servicios.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-brand-navy text-white rounded-lg font-medium hover:bg-brand-navy/90 transition-colors"
        >
          Volver al inicio
        </Link>
        <Link
          href="/contacto"
          className="px-6 py-3 border-2 border-brand-cyan text-brand-cyan rounded-lg font-medium hover:bg-cyan-50 transition-colors"
        >
          Contactanos
        </Link>
      </div>
    </section>
  )
}
