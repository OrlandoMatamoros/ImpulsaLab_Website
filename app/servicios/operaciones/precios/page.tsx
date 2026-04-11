'use client'

import Link from 'next/link'
import { ArrowLeft, Check, DollarSign, Info, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PreciosPage() {
  const { t } = useLanguage()
  const tp = t.operacionesPreciosPage

  const whatsappUrl = `https://wa.me/13479043169?text=${encodeURIComponent(tp.ctaWhatsappMessage)}`

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/servicios" className="text-gray-500 hover:text-gray-700">
              {tp.breadcrumbServicios}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/servicios/operaciones" className="text-gray-500 hover:text-gray-700">
              {tp.breadcrumbOperaciones}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-green-600 font-semibold">{tp.breadcrumbPrecios}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <DollarSign className="w-5 h-5" />
              <span>{tp.heroBadge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {tp.heroTitle}
            </h1>
            <p className="text-xl text-gray-200">
              {tp.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Planes - Catálogo 2026 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Info sobre como funciona */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-12">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Setup único + mensualidad</p>
                  <p className="text-blue-700 text-sm mt-1">
                    Cada plan incluye un pago único de implementación más una mensualidad por mantenimiento, monitoreo y soporte.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter - Supervivencia */}
              <div className="rounded-2xl shadow-lg p-8 border-2 border-gray-200 bg-white hover:border-green-400 hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">Supervivencia</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Starter</h3>
                <p className="text-gray-600 mb-4">1 workflow para automatizar tu primer proceso</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-2">
                  <p className="text-sm text-gray-500 mb-1">Setup único</p>
                  <p className="text-3xl font-bold text-gray-900">$400 - $500</p>
                </div>
                <div className="text-sm text-gray-500 mb-6">+ desde $134/mes mantenimiento</div>
                <p className="text-sm text-gray-600 italic mb-6">
                  Ej: Lead Capture, Invoice Tracker, Daily Digest, Appointment Reminders
                </p>
                <ul className="space-y-3 mb-8">
                  {['1 workflow automatizado', 'Integración con Gmail, Sheets o Excel', 'Configuración y testing completo', 'Soporte por email', 'Monitoreo básico mensual'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold">
                  Empezar con lo Básico
                </a>
              </div>

              {/* Growth - Crecimiento */}
              <div className="rounded-2xl shadow-xl p-8 border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 relative hover:shadow-2xl transition-all duration-300 transform md:scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">MÁS POPULAR</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">Crecimiento</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Growth</h3>
                <p className="text-gray-600 mb-4">Suite de workflows + AI Chatbot</p>

                <div className="space-y-3 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-gray-500 mb-1">Suite 3-5 Workflows</p>
                    <p className="text-xl font-bold text-gray-900">$2,000 <span className="text-sm font-normal text-gray-500">setup</span></p>
                    <p className="text-sm text-gray-500">+ $356/mes</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <p className="text-xs text-gray-500 mb-1">AI Chatbot (WhatsApp/Web)</p>
                    <p className="text-xl font-bold text-gray-900">$2,500 <span className="text-sm font-normal text-gray-500">setup</span></p>
                    <p className="text-sm text-gray-500">+ $437/mes</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {['3-5 workflows integrados entre sí', 'AI Chatbot con base de conocimiento', 'CRM automatizado (Google Sheets)', 'Integraciones: Gmail, Calendar, Slack, WhatsApp', 'Soporte prioritario + optimización mensual'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold">
                  Agenda tu Diagnóstico
                </a>
              </div>

              {/* Scale - Expansión */}
              <div className="rounded-2xl shadow-lg p-8 border-2 border-gray-200 bg-white hover:border-green-400 hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">Expansión</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Scale</h3>
                <p className="text-gray-600 mb-4">Automatización total del negocio</p>

                <div className="space-y-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Suite 6-10 Workflows</p>
                    <p className="text-xl font-bold text-gray-900">$4,000 <span className="text-sm font-normal text-gray-500">setup</span></p>
                    <p className="text-sm text-gray-500">+ $716/mes</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">App Web Custom</p>
                    <p className="text-xl font-bold text-gray-900">$5,000 <span className="text-sm font-normal text-gray-500">setup</span></p>
                    <p className="text-sm text-gray-500">+ $726/mes</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {['6-10 workflows cubriendo todos los procesos', 'AI Agents avanzados con RAG', 'App web custom (portal, dashboard, SaaS)', 'Integraciones API ilimitadas', 'Mantenimiento proactivo + account manager'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold">
                  Solicitar Propuesta
                </a>
              </div>
            </div>

            {/* NYC Comparison */}
            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900">37-80% más accesible que agencias en NYC</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div><div className="text-sm text-gray-500 mb-1">1 Workflow</div><div className="text-gray-400 line-through text-sm">NYC: $1,500-$5,000</div><div className="text-xl font-bold text-green-600">Impulsa Lab: $400-$500</div></div>
                <div><div className="text-sm text-gray-500 mb-1">Suite 3-5 Workflows</div><div className="text-gray-400 line-through text-sm">NYC: $10,000-$15,000</div><div className="text-xl font-bold text-green-600">Impulsa Lab: $2,000</div></div>
                <div><div className="text-sm text-gray-500 mb-1">App Custom + Suite Completa</div><div className="text-gray-400 line-through text-sm">NYC: $40,000-$60,000</div><div className="text-xl font-bold text-green-600">Impulsa Lab: $5,000-$9,000</div></div>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="mt-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 shadow-lg border-2 border-green-200">
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">Calcula tu ROI</h3>
              <p className="text-center text-gray-600 mb-6">Si tu equipo dedica 20+ horas/semana a tareas manuales repetitivas:</p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="text-sm text-gray-500 mb-2">Costo actual (empleado)</div>
                  <div className="text-2xl font-bold text-red-500">~$2,000-$4,000/mes</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="text-sm text-gray-500 mb-2">Costo con Impulsa Lab</div>
                  <div className="text-2xl font-bold text-green-600">$301-$437/mes</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow">
                  <div className="text-sm text-gray-500 mb-2">Ahorro estimado anual</div>
                  <div className="text-2xl font-bold text-green-700">$18,000-$42,000</div>
                </div>
              </div>
            </div>

            {/* Nota sobre credenciales */}
            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900">Sobre credenciales y APIs</p>
                  <p className="text-amber-800 text-sm mt-1">
                    Las credenciales de servicios (Gmail, Sheets, etc.) las provee el cliente. Si necesitas APIs de AI (OpenAI, Anthropic), puedes usar las tuyas o las nuestras con un costo adicional mensual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegacion */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/servicios/operaciones"
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition">
              <ArrowLeft className="w-5 h-5" />
              {tp.navBack}
            </Link>
            <Link href="/servicios/operaciones/arsenal"
                  className="text-green-600 hover:text-green-700 font-semibold">
              {tp.navNext} →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
