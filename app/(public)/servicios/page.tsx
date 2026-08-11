'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { DollarSign, Cog, Megaphone, GraduationCap, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import { getServicioPorSku } from '@/lib/services-catalog'
import { LINKS } from '@/lib/constants'

// Tarjetas-hub: una por servicio. Precio "desde $X" y descripción corta
// se LEEN del catálogo canónico (lib/services-catalog.ts) — no se hardcodean.
const hubCardConfig = [
  {
    key: 'finanzas' as const,
    href: '/servicios/finanzas',
    sku: 'FIN-001',
    icon: DollarSign,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
    border: 'border-blue-200',
    accent: 'text-blue-700',
  },
  {
    key: 'operaciones' as const,
    href: '/servicios/operaciones',
    sku: 'AUTO-002',
    icon: Cog,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    badge: 'bg-green-100 text-green-800',
    border: 'border-green-200',
    accent: 'text-green-700',
  },
  {
    key: 'marketing' as const,
    href: '/servicios/marketing',
    sku: 'MKT-001',
    icon: Megaphone,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-800',
    border: 'border-purple-200',
    accent: 'text-purple-700',
  },
  {
    key: 'capacitacion' as const,
    href: '/capacitacion',
    sku: 'CAP-001',
    icon: GraduationCap,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    border: 'border-amber-200',
    accent: 'text-amber-700',
  },
]

export default function ServiciosPage() {
  const { t } = useLanguage()
  const tp = t.serviciosHubPage

  const whatsappUrl = `${LINKS.whatsapp}?text=${encodeURIComponent(tp.whatsappMessage)}`

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {tp.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {tp.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Tarjetas-hub: una por servicio, precio "desde $X" leído del catálogo */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {tp.hubCards.sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {tp.hubCards.sectionSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {hubCardConfig.map((card) => {
              const data = tp[card.key]
              const servicio = getServicioPorSku(card.sku)
              const Icon = card.icon

              return (
                <Link
                  key={card.key}
                  href={card.href}
                  className={`group flex flex-col rounded-2xl border ${card.border} bg-white p-6 shadow-sm hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    {servicio && (
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${card.badge}`}>
                        {servicio.precioAncla}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {data.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {servicio?.descripcionCorta ?? data.description}
                  </p>
                  <span className={`mt-5 inline-flex items-center gap-1.5 font-semibold ${card.accent} group-hover:gap-2.5 transition-all`}>
                    {data.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Por que el Metodo Impulsa */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
              {tp.whySection.title}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              {tp.whySection.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {tp.whySection.features.map((feature: { title: string; description: string }, i: number) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {tp.cta.title}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {tp.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
              >
                {tp.cta.button}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
