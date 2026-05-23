'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { getServicioPorSku } from '@/lib/services-catalog'

export interface PricingTier {
  /** SKU del catálogo canónico — si se pasa, el precio sale de ahí. */
  sku?: string
  /** Nombre de la tarjeta (override; si no, usa el del catálogo). */
  name?: string
  /** Precio público (override; si no, usa `precioAncla` del catálogo). */
  price?: string
  /** Subtítulo corto bajo el nombre. */
  subtitle?: string
  /** Checklist de qué incluye. */
  features: string[]
  /** Marca esta tarjeta como destacada (badge + escala). */
  featured?: boolean
  /** Texto del badge de destacado. */
  badge?: string
  /** CTA: texto y destino. */
  ctaLabel: string
  ctaHref: string
  ctaTarget?: string
}

interface PricingColumnsProps {
  /** Título de la sección. */
  title: string
  /** Subtítulo opcional. */
  subtitle?: string
  /** Color de acento Tailwind (ej. 'purple', 'blue', 'green', 'emerald'). */
  accent?: 'purple' | 'blue' | 'green' | 'emerald'
  /** Tarjetas en columnas verticales. */
  tiers: PricingTier[]
  /** Nota fina al pie (ej. disclaimers). */
  footnote?: string
}

const ACCENTS = {
  purple: {
    chip: 'bg-purple-600',
    border: 'border-purple-500',
    bgFeatured: 'from-purple-50 to-purple-100',
    hover: 'hover:border-purple-400',
    btn: 'bg-purple-600 hover:bg-purple-700',
    price: 'text-purple-600',
  },
  blue: {
    chip: 'bg-blue-600',
    border: 'border-blue-500',
    bgFeatured: 'from-blue-50 to-indigo-50',
    hover: 'hover:border-blue-400',
    btn: 'bg-blue-600 hover:bg-blue-700',
    price: 'text-blue-600',
  },
  green: {
    chip: 'bg-green-600',
    border: 'border-green-500',
    bgFeatured: 'from-green-50 to-emerald-50',
    hover: 'hover:border-green-400',
    btn: 'bg-green-600 hover:bg-green-700',
    price: 'text-green-600',
  },
  emerald: {
    chip: 'bg-emerald-600',
    border: 'border-emerald-500',
    bgFeatured: 'from-emerald-50 to-teal-50',
    hover: 'hover:border-emerald-400',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
    price: 'text-emerald-600',
  },
}

export default function PricingColumns({
  title,
  subtitle,
  accent = 'blue',
  tiers,
  footnote,
}: PricingColumnsProps) {
  const a = ACCENTS[accent]

  return (
    <section id="precios" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {tiers.map((tier, idx) => {
              const servicio = tier.sku ? getServicioPorSku(tier.sku) : undefined
              const name = tier.name ?? servicio?.nombre ?? ''
              const price = tier.price ?? servicio?.precioAncla ?? ''
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-8 transition-all duration-300 relative ${
                    tier.featured
                      ? `bg-gradient-to-br ${a.bgFeatured} border-2 ${a.border} shadow-xl lg:scale-105`
                      : `bg-white border-2 border-gray-200 ${a.hover} shadow-lg hover:shadow-2xl`
                  }`}
                >
                  {tier.featured && tier.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className={`${a.chip} text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap`}>
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
                  {tier.subtitle && (
                    <p className="text-gray-600 text-sm mb-4">{tier.subtitle}</p>
                  )}
                  <div className={`text-2xl font-bold mb-6 ${a.price}`}>{price}</div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.ctaHref}
                    target={tier.ctaTarget}
                    rel={tier.ctaTarget === '_blank' ? 'noopener noreferrer' : undefined}
                    className={`block w-full text-center py-3 ${a.btn} text-white rounded-lg font-semibold transition-colors`}
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              )
            })}
          </div>

          {footnote && (
            <p className="text-center text-sm text-gray-500 mt-8 max-w-3xl mx-auto">{footnote}</p>
          )}
        </div>
      </div>
    </section>
  )
}
