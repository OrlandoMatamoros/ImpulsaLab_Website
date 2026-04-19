'use client'

import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import { useState, useEffect } from 'react'
import ProtectedSection from '@/components/ProtectedSection'
import { NovaFinanceShowcase } from './NovaFinanceShowcase';
import IntegrationsShowcase from '@/components/services/IntegrationsShowcase'
import { useLanguage } from '@/contexts/LanguageContext'

// Definir tipos para TypeScript
interface Dashboard {
  id: number
  title: string
  image: string
  category: string
  description: string
  features: string[]
  metrics: string
}

// Static dashboard data (non-translatable fields)
const dashboardImages = [
  { id: 1, image: "/dashboards/dashboard-01-mando-integral.png" },
  { id: 2, image: "/dashboards/dashboard-02-mando-ventas.png" },
  { id: 3, image: "/dashboards/dashboard-03-flujo-caja.png" },
  { id: 4, image: "/dashboards/dashboard-04-proyeccion-ventas.png" },
  { id: 5, image: "/dashboards/dashboard-05-metas-operaciones.png" },
  { id: 6, image: "/dashboards/dashboard-06-control-financiero.png" },
  { id: 7, image: "/dashboards/dashboard-07-distribucion-servicios.png" },
  { id: 8, image: "/dashboards/dashboard-08-entidades-territoriales.png" },
  { id: 9, image: "/dashboards/dashboard-09-municipios.png" },
  { id: 10, image: "/dashboards/dashboard-10-seguimiento-proyectos.png" },
  { id: 11, image: "/dashboards/dashboard-11-bid-proyectos-latam.png" },
]

export default function FinanzasPage() {
  const { t } = useLanguage()

  // Estado para el modal de dashboards
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>(t.finanzasPage.categoryAll)

  // Reset active category when language changes
  useEffect(() => {
    setActiveCategory(t.finanzasPage.categoryAll)
  }, [t.finanzasPage.categoryAll])

  // Build dashboards from translation data + static image data
  const dashboards: Dashboard[] = t.finanzasPage.dashboards.map((d: { title: string; category: string; description: string; features: string[]; metrics: string }, i: number) => ({
    ...dashboardImages[i],
    title: d.title,
    category: d.category,
    description: d.description,
    features: d.features,
    metrics: d.metrics,
  }))

  // Obtener categorías únicas
  const categories = [t.finanzasPage.categoryAll, ...new Set(dashboards.map(d => d.category))]

  // Filtrar dashboards por categoría
  const filteredDashboards = activeCategory === t.finanzasPage.categoryAll
    ? dashboards
    : dashboards.filter(d => d.category === activeCategory)

  // WhatsApp URL with translated message
  const whatsappUrl = `https://wa.me/13479043169?text=${encodeURIComponent(t.finanzasPage.whatsappMessage)}`

  return (
    <>
      {/* Sección 1: Hero - SIEMPRE VISIBLE */}
      <section className="relative bg-[#002D62] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.finanzasPage.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {t.finanzasPage.heroSubtitle}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-800/60 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-2xl font-bold text-white">{t.finanzasPage.heroPriceAnchor}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Antes → Después */}
      <div className="bg-slate-100 border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <div className="flex-1 flex items-center gap-2">
              <span className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-sm">✗</span>
              <p className="text-sm text-gray-600 italic">&ldquo;{t.finanzasPage.beforeAfter.before}&rdquo;</p>
            </div>
            <span className="text-2xl text-brand-cyan font-bold">→</span>
            <div className="flex-1 flex items-center gap-2">
              <span className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">✓</span>
              <p className="text-sm text-gray-800 font-medium">&ldquo;{t.finanzasPage.beforeAfter.after}&rdquo;</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">— {t.finanzasPage.beforeAfter.name}, {t.finanzasPage.beforeAfter.business}</span>
          </div>
        </div>
      </div>

      {/* Sección 2: El Problema - SIEMPRE VISIBLE */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {t.finanzasPage.problemsTitle}
            </h2>
            <div className="space-y-6">
              {t.finanzasPage.problems.map((problema: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold">?</span>
                  </div>
                  <p className="text-lg text-gray-700">{problema}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: La Solución - SIEMPRE VISIBLE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {t.finanzasPage.solutionTitle}
            </h2>

            {/* Video Demo */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-12 aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/TswtaMkROcU?autoplay=1&mute=1&loop=1&playlist=TswtaMkROcU"
                title={t.finanzasPage.videoDemoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Características */}
            <div className="grid md:grid-cols-2 gap-6">
              {t.finanzasPage.features.map((feature: { title: string; description: string }, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios por Etapa de Negocio */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Soluciones Financieras para Cada Etapa de tu Negocio
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                No importa en qué momento estés — tenemos la herramienta financiera que necesitas para crecer con datos reales.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Supervivencia */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">Etapa 1</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Supervivencia</h3>
                <p className="text-gray-600 text-sm mb-4">Negocio nuevo o con ingresos menores a $500K/año</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">$500 - $1,000</div>
                <div className="text-sm text-gray-500 mb-6">Setup + desde $97/mes</div>
                <h4 className="font-semibold text-gray-800 mb-3">Tracking Financiero Automatizado</h4>
                <div className="space-y-2 mb-8">
                  {['Escaneo automático de facturas y recibos por email', 'Extracción AI de montos, fechas y conceptos', 'Registro automático en Excel/Google Sheets', 'Resumen diario de gastos por email'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-gray-700 text-sm">{item}</span></div>
                  ))}
                </div>
                <Link href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 bg-[#002D62] text-white rounded-lg hover:bg-[#003d82] transition font-semibold">Empezar con lo Básico</Link>
              </div>
              {/* Crecimiento */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border-2 border-blue-500 p-8 relative hover:shadow-2xl transition-all duration-300 transform scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2"><span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">MÁS POPULAR</span></div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">Etapa 2</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Crecimiento</h3>
                <p className="text-gray-600 text-sm mb-4">Negocio con $500K-$2M en ingresos anuales</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">$3,000 - $5,000</div>
                <div className="text-sm text-gray-500 mb-6">Setup + desde $197/mes</div>
                <h4 className="font-semibold text-gray-800 mb-3">Dashboard Financiero Profesional</h4>
                <div className="space-y-2 mb-8">
                  {['KPIs personalizados para tu industria', 'Análisis de rentabilidad por producto/servicio', 'Control de flujo de caja en tiempo real', 'Integración con QuickBooks, Xero o Excel', 'Proyecciones y análisis de escenarios'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-gray-700 text-sm">{item}</span></div>
                  ))}
                </div>
                <Link href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">Agenda tu Diagnóstico</Link>
              </div>
              {/* Expansión */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">Etapa 3</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Expansión</h3>
                <p className="text-gray-600 text-sm mb-4">Negocio con $1M+ en ingresos, listo para escalar</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">$5,000 - $15,000</div>
                <div className="text-sm text-gray-500 mb-6">Setup + desde $497/mes</div>
                <h4 className="font-semibold text-gray-800 mb-3">App Financiera Custom + AI</h4>
                <div className="space-y-2 mb-8">
                  {['Dashboard KPI con hasta 3 módulos integrados', 'Integración con POS, software contable y bancos', 'AI integrada para análisis predictivo', 'Autenticación con roles (dueño, contador, gerente)', 'Sincronización automática Excel/OneDrive'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-gray-700 text-sm">{item}</span></div>
                  ))}
                </div>
                <Link href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 bg-[#002D62] text-white rounded-lg hover:bg-[#003d82] transition font-semibold">Solicitar Propuesta</Link>
              </div>
            </div>
            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900">40-70% más accesible que agencias en NYC</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div><div className="text-sm text-gray-500 mb-1">Dashboard Básico</div><div className="text-gray-400 line-through text-sm">NYC: $4,000-$12,000</div><div className="text-xl font-bold text-blue-600">Impulsa Lab: $500-$1,000</div></div>
                <div><div className="text-sm text-gray-500 mb-1">Dashboard Profesional</div><div className="text-gray-400 line-through text-sm">NYC: $10,000-$30,000</div><div className="text-xl font-bold text-blue-600">Impulsa Lab: $3,000-$5,000</div></div>
                <div><div className="text-sm text-gray-500 mb-1">App Financiera Custom</div><div className="text-gray-400 line-through text-sm">NYC: $15,000-$150,000</div><div className="text-xl font-bold text-blue-600">Impulsa Lab: $5,000-$15,000</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRACIONES: POS + Contables (14 plataformas) */}
      <IntegrationsShowcase />

      {/* SECCIÓN PROTEGIDA: Ve Tu Negocio en Acción + Planes */}
      <ProtectedSection
        message={t.finanzasPage.protectedMessage}
        showPreview={true}
        previewBlur={false}
      >
        {/* NUEVA SECCIÓN: Ve Tu Negocio en Acción */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
                {t.finanzasPage.dashboardSectionTitle}
              </h2>
              <p className="text-xl text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                {t.finanzasPage.dashboardSectionSubtitle}
              </p>

              {/* Filtros por categoría */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {category}
                    {category === t.finanzasPage.categoryAll && (
                      <span className="ml-2 text-sm opacity-75">({dashboards.length})</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Grid de Dashboards - Solo primeros 6 como preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {filteredDashboards.slice(0, 6).map((dashboard) => (
                  <div
                    key={dashboard.id}
                    onClick={() => setSelectedDashboard(dashboard)}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl">
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={dashboard.image}
                          alt={dashboard.title}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {dashboard.category}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="text-white p-4 text-sm font-medium">
                            {t.finanzasPage.clickToSeeDetails}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">
                          {dashboard.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {dashboard.description}
                        </p>
                        <p className="text-xs text-blue-600 mt-2 font-semibold">
                          {dashboard.metrics}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mensaje para ver más */}
              {filteredDashboards.length > 6 && (
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full">
                    <span className="font-medium">+{filteredDashboards.length - 6} {t.finanzasPage.moreDashboards}</span>
                  </div>
                </div>
              )}

              {/* Modal para imagen expandida */}
              {selectedDashboard && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  onClick={() => setSelectedDashboard(null)}
                >
                  <div
                    className="relative max-w-7xl w-full bg-white rounded-2xl overflow-hidden animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header del modal */}
                    <div className="flex items-center justify-between p-6 border-b">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedDashboard.title}
                        </h3>
                        <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {selectedDashboard.category}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedDashboard(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Contenido del modal */}
                    <div className="grid lg:grid-cols-3 gap-6 p-6 max-h-[80vh] overflow-y-auto">
                      {/* Imagen grande */}
                      <div className="lg:col-span-2">
                        <img
                          src={selectedDashboard.image}
                          alt={selectedDashboard.title}
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>

                      {/* Información detallada */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{t.finanzasPage.descriptionLabel}</h4>
                          <p className="text-gray-600">{selectedDashboard.description}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">{t.finanzasPage.mainFeaturesLabel}</h4>
                          <ul className="space-y-2">
                            {selectedDashboard.features.map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t">
                          <p className="text-sm font-semibold text-blue-600">
                            {selectedDashboard.metrics}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sección de beneficios */}
              <div className="mt-20 mb-16">
                <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                  {t.finanzasPage.transformationTitle}
                </h3>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Antes */}
                  <div className="bg-red-50 rounded-xl p-8 border-2 border-red-200">
                    <h4 className="font-semibold text-xl mb-4 text-red-800 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t.finanzasPage.beforeTitle}
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      {t.finanzasPage.beforeItems.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-500 mr-2">&bull;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Después */}
                  <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
                    <h4 className="font-semibold text-xl mb-4 text-green-800 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t.finanzasPage.afterTitle}
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      {t.finanzasPage.afterItems.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2">&check;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA específico */}
              <div className="text-center">
                <Link href={whatsappUrl}
                  target="_blank"
                  className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-full
               font-semibold text-lg transition-all duration-300
               hover:scale-105 hover:bg-green-700 shadow-xl hover:shadow-2xl">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.finanzasPage.ctaWhatsapp}
                </Link>
                <p className="mt-4 text-gray-600">
                  {t.finanzasPage.ctaResponseTime}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 4: Nuestro Proceso */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                {t.finanzasPage.methodologyTitle}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.finanzasPage.steps.map((paso: { number: string; title: string; description: string }, index: number) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-lg p-6 shadow-lg h-full">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                        {paso.number}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{paso.title}</h3>
                      <p className="text-gray-600">{paso.description}</p>
                    </div>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección 5: Planes y Precios */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                {t.finanzasPage.plansTitle}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Plan Piloto Automático */}
                <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{t.finanzasPage.planPilot.title}</h3>
                  <p className="text-gray-600 mb-6">{t.finanzasPage.planPilot.idealFor}</p>

                  <div className="mb-6">
                    <p className="text-3xl font-bold text-blue-600">{t.finanzasPage.planPilot.price}</p>
                    <p className="text-gray-500">{t.finanzasPage.planPilot.pricePeriod}</p>
                  </div>

                  <div className="mb-8">
                    <p className="font-semibold mb-3 text-gray-900">{t.finanzasPage.planPilot.deliverablesTitle}</p>
                    <ul className="space-y-2">
                      {t.finanzasPage.planPilot.deliverables.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={whatsappUrl}
                        target="_blank"
                        className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    {t.finanzasPage.planPilot.cta}
                  </Link>
                </div>

                {/* Plan Cohete */}
                <div className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200 relative">
                  <div className="absolute -top-3 right-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {t.finanzasPage.planRocket.badge}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{t.finanzasPage.planRocket.title}</h3>
                  <p className="text-gray-600 mb-6">{t.finanzasPage.planRocket.idealFor}</p>

                  <div className="mb-6">
                    <p className="text-3xl font-bold text-blue-600">{t.finanzasPage.planRocket.price}</p>
                    <p className="text-gray-500">{t.finanzasPage.planRocket.pricePeriod}</p>
                  </div>

                  <div className="mb-8">
                    <p className="font-semibold mb-3 text-gray-900">{t.finanzasPage.planRocket.deliverablesTitle}</p>
                    <ul className="space-y-2">
                      {t.finanzasPage.planRocket.deliverables.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={whatsappUrl}
                        target="_blank"
                        className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    {t.finanzasPage.planRocket.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ProtectedSection>

       <section className="py-20 bg-[#002D62] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.finanzasPage.finalCtaTitle}
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              {t.finanzasPage.finalCtaSubtitle}
            </p>
            <Link href={whatsappUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg
                           font-semibold text-lg transition-all duration-300
                           hover:scale-105 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.finanzasPage.finalCtaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: Nova Finance Showcase - SIEMPRE VISIBLE */}
      <NovaFinanceShowcase />
    </>
  )
}
