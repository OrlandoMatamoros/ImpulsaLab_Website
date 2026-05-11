'use client'

import Link from 'next/link'
import { FaArrowLeft, FaRocket, FaBell } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'

export default function EnDesarrolloClient() {
  const { t } = useLanguage()
  const tp = t.enDesarrolloPage

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="mb-8 relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center animate-pulse">
              <FaRocket className="text-white text-5xl animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
              <FaBell className="text-white text-xl" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {tp.titulo}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {tp.subtitulo}
          </p>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {tp.mientrasTanto}
            </h2>
            <div className="space-y-2 text-left max-w-md mx-auto">
              <p className="flex items-center gap-2">
                <span className="text-green-500">{'✓'}</span>
                <span>{tp.explorarHerramientas}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">{'✓'}</span>
                <span>{tp.leerCasos}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">{'✓'}</span>
                <span>{tp.agendarConsultoria}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              <FaArrowLeft />
              {tp.volverInicio}
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              {tp.contactanos}
              <FaRocket />
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              {tp.primerEnConocer}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {tp.notificame}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          {tp.tagline}
        </p>
      </div>
    </div>
  )
}
