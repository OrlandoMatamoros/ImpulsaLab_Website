'use client'

import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import { Bot, Search, Zap, DollarSign, Layers } from 'lucide-react'
import AutomationVsEmployee from '@/components/services/AutomationVsEmployee'
import PricingColumns from '@/components/services/PricingColumns'
import { useLanguage } from '@/contexts/LanguageContext'

const WA_OPS = (msg: string) => `https://wa.me/13479043169?text=${encodeURIComponent(msg)}`

export default function OperacionesPage() {
  const { t } = useLanguage()
  const tp = t.operacionesPage

  return (
    <>
      {/* Hero - MANTENER */}
      <section className="relative bg-green-900 text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {tp.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {tp.heroSubtitle}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-800 rounded-full">
              <span className="font-medium">{tp.heroBadge}</span>
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
              <p className="text-sm text-gray-600 italic">&ldquo;{tp.beforeAfter.before}&rdquo;</p>
            </div>
            <span className="text-2xl text-green-600 font-bold">→</span>
            <div className="flex-1 flex items-center gap-2">
              <span className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">✓</span>
              <p className="text-sm text-gray-800 font-medium">&ldquo;{tp.beforeAfter.after}&rdquo;</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">— {tp.beforeAfter.name}, {tp.beforeAfter.business}</span>
          </div>
        </div>
      </div>

      {/* El Problema - MANTENER */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {tp.problemTitle}
            </h2>
            <div className="space-y-6">
              {tp.problemas.map((problema, index) => (
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

      {/* Video Demo - MANTENER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {tp.videoTitle}
            </h2>

            <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-12 aspect-video">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/lMFV5mq_IXo"
                title={tp.videoIframeTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {tp.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Automatización para Cada Etapa de tu Negocio
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Desde tu primer workflow hasta una suite completa — eliminamos trabajo manual para que te enfoques en crecer.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Supervivencia */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-green-400 hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">Etapa 1</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Supervivencia</h3>
                <p className="text-gray-600 text-sm mb-4">Negocio nuevo o con procesos 100% manuales</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">desde $747</div>
                <div className="text-sm text-gray-500 mb-6">Setup + $97-147/mes</div>
                <h4 className="font-semibold text-gray-800 mb-3">1 Workflow Automatizado</h4>
                <div className="space-y-2 mb-8">
                  {['Lead Capture & Auto-Response desde tu sitio web', 'Invoice Processing automático por email', 'Daily Business Digest con resumen AI', 'Appointment Reminders automáticos'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-gray-700 text-sm">{item}</span></div>
                  ))}
                </div>
                <Link href="/servicios/operaciones/precios" className="block w-full text-center py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">Empezar con lo Básico</Link>
              </div>
              {/* Crecimiento */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl border-2 border-green-500 p-8 relative hover:shadow-2xl transition-all duration-300 transform scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2"><span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">MÁS POPULAR</span></div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">Etapa 2</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Crecimiento</h3>
                <p className="text-gray-600 text-sm mb-4">Negocio listo para automatizar múltiples procesos</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">desde $1,997</div>
                <div className="text-sm text-gray-500 mb-6">Setup + desde $357/mes</div>
                <h4 className="font-semibold text-gray-800 mb-3">Suite 3-5 Workflows + AI Chatbot</h4>
                <div className="space-y-2 mb-8">
                  {['Suite de 3-5 workflows integrados (desde $1,997 + $357/mes)', 'AI Chatbot WhatsApp/Web (desde $1,497 + $437/mes)', 'CRM automatizado con seguimiento de leads', 'Integraciones con Gmail, Sheets, Calendar, Slack', 'Soporte prioritario y optimización mensual'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-gray-700 text-sm">{item}</span></div>
                  ))}
                </div>
                <Link href="/servicios/operaciones/precios" className="block w-full text-center py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">Agenda tu Diagnóstico</Link>
              </div>
              {/* Expansión */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-green-400 hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">Etapa 3</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Expansión</h3>
                <p className="text-gray-600 text-sm mb-4">Negocio con $1M+ listo para automatización total</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">desde $3,997</div>
                <div className="text-sm text-gray-500 mb-6">Setup + desde $717/mes</div>
                <h4 className="font-semibold text-gray-800 mb-3">Suite Completa 6-10 Workflows</h4>
                <div className="space-y-2 mb-8">
                  {['6-10 workflows cubriendo todos los procesos del negocio', 'AI Agents avanzados con base de conocimiento', 'Dashboard de operaciones en tiempo real', 'Integraciones API custom con tus sistemas', 'Mantenimiento proactivo y escalado continuo'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2"><svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-gray-700 text-sm">{item}</span></div>
                  ))}
                </div>
                <Link href="/servicios/operaciones/precios" className="block w-full text-center py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">Solicitar Propuesta</Link>
              </div>
            </div>
            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900">40-70% más accesible que agencias en NYC</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div><div className="text-sm text-gray-500 mb-1">1 Workflow</div><div className="text-gray-400 line-through text-sm">NYC: $1,500-$5,000</div><div className="text-xl font-bold text-green-600">Impulsa Lab: desde $747</div></div>
                <div><div className="text-sm text-gray-500 mb-1">Suite 3-5 Workflows</div><div className="text-gray-400 line-through text-sm">NYC: $10,000-$15,000</div><div className="text-xl font-bold text-green-600">Impulsa Lab: desde $1,997</div></div>
                <div><div className="text-sm text-gray-500 mb-1">Suite Completa + AI</div><div className="text-gray-400 line-through text-sm">NYC: $40,000-$60,000</div><div className="text-xl font-bold text-green-600">Impulsa Lab: $3,997-$8,997</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automatización vs Empleado Humano (BLS NYC 2023) */}
      <AutomationVsEmployee
        vertical="operaciones"
        accent="green"
        headline="Un agente de IA cuesta menos que una semana de nómina"
        subtitle="Lo que un customer service, recepcionista o back-office cobra en un mes en Nueva York, Impulsa Lab lo automatiza por menos de lo que gastas en café de oficina."
        ctaLabel="Cotizar mi automatización"
        ctaHref="/servicios/operaciones/precios"
        rows={[
          { product: 'WhatsApp AI Bot',         productPrice: '$297-497/mes', humanRole: 'Customer Service Rep',    nycMonthly: 4870, hoursSaved: 160, roiNote: '10-16×' },
          { product: 'Appointment Scheduler',   productPrice: '$297-497/mes', humanRole: 'Recepcionista',            nycMonthly: 4314, hoursSaved: 80,  roiNote: '9-15×' },
          { product: 'Daily Digest Agent',      productPrice: '$297-497/mes', humanRole: 'Asistente administrativo', nycMonthly: 5735, hoursSaved: 40,  roiNote: '12-19×' },
          { product: 'Lead Capture Auto-Reply', productPrice: '$97-197/mes',  humanRole: 'SDR junior',               nycMonthly: 7960, hoursSaved: 60,  roiNote: '40-82×' },
          { product: 'Review Manager',          productPrice: '$297-497/mes', humanRole: 'Community/Reputation Mgr', nycMonthly: 6756, hoursSaved: 30,  roiNote: '14-23×' },
        ]}
      />

      {/* NUEVA SECCION: Cards de navegacion */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              {tp.navTitle}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              {tp.navSubtitle}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Agente 4IA */}
              <Link href="/servicios/operaciones/agentes"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition">
                    <Bot className="w-12 h-12 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{tp.cardAgentTitle}</h3>
                <p className="text-gray-600 text-center mb-4">
                  {tp.cardAgentDesc}
                </p>
                <div className="text-center text-purple-600 font-semibold group-hover:text-purple-700">
                  {tp.cardAgentCta} →
                </div>
              </Link>

              {/* Arsenal */}
              <Link href="/servicios/operaciones/arsenal"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition">
                    <Search className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{tp.cardArsenalTitle}</h3>
                <p className="text-gray-600 text-center mb-4">
                  {tp.cardArsenalDesc}
                </p>
                <div className="text-center text-blue-600 font-semibold group-hover:text-blue-700">
                  {tp.cardArsenalCta} →
                </div>
              </Link>

              {/* Plataformas */}
              <Link href="/servicios/operaciones/plataformas"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition">
                    <Layers className="w-12 h-12 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{tp.cardPlataformasTitle}</h3>
                <p className="text-gray-600 text-center mb-4">
                  {tp.cardPlataformasDesc}
                </p>
                <div className="text-center text-orange-600 font-semibold group-hover:text-orange-700">
                  {tp.cardPlataformasCta} →
                </div>
              </Link>

              {/* Precios */}
              <Link href="/servicios/operaciones/precios"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition">
                    <DollarSign className="w-12 h-12 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{tp.cardPreciosTitle}</h3>
                <p className="text-gray-600 text-center mb-4">
                  {tp.cardPreciosDesc}
                </p>
                <div className="text-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                  {tp.cardPreciosCta} →
                </div>
              </Link>

              {/* Proceso */}
              <Link href="/servicios/operaciones/proceso"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition">
                    <Zap className="w-12 h-12 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{tp.cardProcesoTitle}</h3>
                <p className="text-gray-600 text-center mb-4">
                  {tp.cardProcesoDesc}
                </p>
                <div className="text-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                  {tp.cardProcesoCta} →
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - WhatsApp */}
      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {tp.ctaTitle}
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              {tp.ctaSubtitle}
            </p>
            <Link href={`https://wa.me/13479043169?text=${encodeURIComponent(tp.ctaWhatsappMessage || '')}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-white text-green-900 px-8 py-4 rounded-lg
                           font-semibold text-lg transition-all duration-300
                           hover:scale-105 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {tp.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing por nivel — Operaciones (catálogo v1.2) */}
      <PricingColumns
        title="Automatización a la medida de tu operación"
        subtitle="Desde un asistente de IA hasta una suite completa. El alcance se define por diagnóstico."
        accent="green"
        footnote="Precios desde, en USD. Setup único + retainer mensual (operación, monitoreo y soporte). Mantenimiento base $97-147/mes."
        tiers={[
          {
            sku: 'BOT-001',
            name: 'Chatbot Express',
            price: '$597 + $297/mes',
            subtitle: 'Atención por WhatsApp, lista rápido',
            features: [
              'Plantilla WhatsApp FAQ + captura de lead',
              'Setup rápido',
              'Integración con tus canales',
              'Retainer de operación $297/mes',
            ],
            ctaLabel: 'Cotizar Chatbot Express',
            ctaHref: WA_OPS('Hola Impulsa Lab, me interesa el Chatbot Express para mi negocio.'),
            ctaTarget: '_blank',
          },
          {
            sku: 'AUTO-002',
            name: 'Automatización Agéntica',
            price: 'desde $747 + retainer',
            subtitle: 'Tu proceso, en piloto automático',
            featured: true,
            badge: 'MÁS POPULAR',
            features: [
              'Sistema agéntico scoped por diagnóstico',
              'Calificación de leads, cotizaciones, documentos',
              'Operación multi-sistema',
              'Retainer desde $137/mes (operación)',
            ],
            ctaLabel: 'Cotizar mi automatización',
            ctaHref: '/servicios/operaciones/precios',
          },
          {
            sku: 'BOT-002',
            name: 'Agente IA Custom',
            price: 'desde $1,497 + $437/mes',
            subtitle: 'Agéntico, a tu medida',
            features: [
              'RAG + agendamiento en vivo contra calendario',
              'Multimodal + integraciones',
              'Ideal dental / estético',
              'Retainer $437/mes',
            ],
            ctaLabel: 'Hablar con un experto',
            ctaHref: WA_OPS('Hola Impulsa Lab, me interesa un Agente IA Custom a medida.'),
            ctaTarget: '_blank',
          },
        ]}
      />

      {/* Interlinking: pillar consultoría IA general */}
      <section className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-3">
            ¿Buscás una visión general de cómo implementar IA en tu PYME?
          </p>
          <Link
            href="/servicios/consultoria-ia-para-pymes"
            className="inline-flex items-center gap-2 text-[#002D62] font-semibold hover:underline text-lg"
          >
            Ver guía completa: Consultoría IA para PYMEs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
