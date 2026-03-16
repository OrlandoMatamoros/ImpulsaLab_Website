import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Pagina no encontrada | Impulsa Lab',
  description: 'La pagina que buscas no existe o ha sido movida. Vuelve al inicio de Impulsa Lab.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Pagina no encontrada
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Lo sentimos, la pagina que buscas no existe o ha sido movida.
        Te invitamos a explorar nuestros servicios.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </Link>
        <Link
          href="/contacto"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
        >
          Contactanos
        </Link>
      </div>
    </section>
  )
}
