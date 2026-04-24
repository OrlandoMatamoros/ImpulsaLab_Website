'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaCheckCircle, FaCalendarAlt, FaEnvelope } from 'react-icons/fa'
import { InlineWidget } from 'react-calendly'
import { useLanguage } from '@/contexts/LanguageContext'

declare global {
  interface Window {
    gtag: (command: string, action: string, params: any) => void
    dataLayer: any[]
  }
}

export default function GraciasPage() {
  const { t } = useLanguage()
  const [showCalendly, setShowCalendly] = useState(false)

  useEffect(() => {
    // Disparar evento de conversión de Google Ads cuando la página cargue
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17854811161/k7rXCLXI_N0bEJmY68FC'
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Ícono de éxito */}
        <div className="flex justify-center mb-8">
          <div className="bg-green-100 rounded-full p-6">
            <FaCheckCircle className="text-green-600 text-6xl" />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#002D62' }}>
          {t.graciasPage.titulo}
        </h1>

        {/* Mensaje principal */}
        <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
          {t.graciasPage.mensaje}
        </p>

        {/* Mensaje de reporte enviado */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-center gap-3">
          <FaEnvelope className="text-green-600 text-2xl" />
          <p className="text-green-800 font-semibold">
            {t.graciasPage.reporteEnviado}
          </p>
        </div>

        {/* Mensaje secundario */}
        <p className="text-lg text-gray-600 mb-10">
          {t.graciasPage.revisaBandeja} <span className="font-semibold" style={{ color: '#002D62' }}>{t.graciasPage.diagnostico3d}</span>
        </p>

        {/* Decoración visual */}
        <div className="w-24 h-1 mx-auto mb-10" style={{ backgroundColor: '#002D62' }}></div>

        {/* Información adicional */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
          <h2 className="text-lg font-semibold mb-3" style={{ color: '#002D62' }}>
            {t.graciasPage.queSigue}
          </h2>
          <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">&#10003;</span>
              <span>{t.graciasPage.revisaReporte}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">&#10003;</span>
              <span>{t.graciasPage.agendaConsulta}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">&#10003;</span>
              <span>{t.graciasPage.recibeplan}</span>
            </li>
          </ul>
        </div>

        {/* CTA para agendar consulta */}
        <div className="mb-8">
          {!showCalendly ? (
            <button
              onClick={() => setShowCalendly(true)}
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ backgroundColor: '#002D62' }}
            >
              <FaCalendarAlt className="text-xl" />
              {t.graciasPage.agendarConsulta}
            </button>
          ) : (
            <button
              onClick={() => setShowCalendly(false)}
              className="inline-block px-6 py-3 text-sm text-gray-700 border-2 border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 mb-4"
            >
              {t.graciasPage.cerrarCalendario}
            </button>
          )}
        </div>

        {/* Widget de Calendly */}
        {showCalendly && (
          <div className="mb-8 bg-white rounded-lg shadow-xl overflow-hidden">
            <InlineWidget
              url="https://calendly.com/orlando-tuimpulsalab/30min"
              styles={{
                height: '700px',
                minWidth: '100%'
              }}
            />
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/diagnostico?showResults=true"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {t.graciasPage.verResultados}
          </Link>

          <Link
            href="/"
            className="inline-block px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ backgroundColor: '#002D62' }}
          >
            {t.graciasPage.volverInicio}
          </Link>
        </div>

        {/* Mensaje de soporte */}
        <p className="text-sm text-gray-500 mt-8">
          {t.graciasPage.pregunta}{' '}
          <a
            href="mailto:contacto@tuimpulsalab.com"
            className="underline hover:text-blue-600"
            style={{ color: '#002D62' }}
          >
            contacto@tuimpulsalab.com
          </a>
        </p>
      </div>
    </div>
  )
}
