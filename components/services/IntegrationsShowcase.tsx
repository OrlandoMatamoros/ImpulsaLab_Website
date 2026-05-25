'use client'

import { CircleCheck, Sparkles, Store, FileSpreadsheet } from 'lucide-react'
import PlatformLogo from '@/components/PlatformLogo'
import { useLanguage } from '@/contexts/LanguageContext'

type IntegrationStatus = 'listo' | 'custom'
type IntegrationKind = 'pos' | 'contable' | 'payments'

type Integration = {
  name: string
  slug: string
  domain: string
  kind: IntegrationKind
  market: string
  status: IntegrationStatus
}

const POS: Integration[] = [
  { name: 'Square',         slug: 'square',     domain: 'squareup.com',       kind: 'pos', market: 'USA + 7 países',      status: 'listo' },
  { name: 'Shopify',        slug: 'shopify',    domain: 'shopify.com',        kind: 'pos', market: 'USA + LatAm',         status: 'listo' },
  { name: 'Clover',         slug: 'clover',     domain: 'clover.com',         kind: 'pos', market: 'USA',                 status: 'listo' },
  { name: 'Toast',          slug: 'toast',      domain: 'toasttab.com',       kind: 'pos', market: 'USA · restaurantes',  status: 'listo' },
  { name: 'Lightspeed',     slug: 'lightspeed', domain: 'lightspeedhq.com',   kind: 'pos', market: 'USA + LatAm parcial', status: 'listo' },
  { name: 'Loyverse',       slug: 'loyverse',   domain: 'loyverse.com',       kind: 'pos', market: 'Global · LatAm',      status: 'listo' },
  { name: 'Revel',          slug: 'revel',      domain: 'revelsystems.com',   kind: 'pos', market: 'USA',                 status: 'custom' },
  { name: 'Aldelo Express', slug: 'aldelo',     domain: 'aldelo.com',         kind: 'pos', market: 'USA · hispano',       status: 'custom' },
]

const CONTABLE: Integration[] = [
  { name: 'QuickBooks Online', slug: 'quickbooks', domain: 'quickbooks.intuit.com', kind: 'contable', market: 'USA + LatAm parcial',  status: 'listo' },
  { name: 'Stripe',            slug: 'stripe',     domain: 'stripe.com',            kind: 'payments', market: 'Global',               status: 'listo' },
  { name: 'Alegra',            slug: 'alegra',     domain: 'alegra.com',            kind: 'contable', market: 'CO · MX · PE · CL + 9', status: 'listo' },
  { name: 'Siigo',             slug: 'siigo',      domain: 'siigo.com',             kind: 'contable', market: 'Colombia',             status: 'listo' },
  { name: 'Nubox',             slug: 'nubox',      domain: 'nubox.com',             kind: 'contable', market: 'Chile',                status: 'custom' },
  { name: 'Contpaqi',          slug: 'contpaqi',   domain: 'contpaqi.com',          kind: 'contable', market: 'México · CFDI',        status: 'custom' },
]

function IntegrationCard({
  item,
  statusReady,
  statusCustom,
}: {
  item: Integration
  statusReady: string
  statusCustom: string
}) {
  const chip = item.status === 'listo'
    ? { bg: 'bg-green-100', text: 'text-green-800', icon: CircleCheck, label: statusReady }
    : { bg: 'bg-amber-100', text: 'text-amber-800', icon: Sparkles,    label: statusCustom }
  const ChipIcon = chip.icon

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:border-cyan-500 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-1.5" style={{ minWidth: '40px', minHeight: '40px' }}>
          <PlatformLogo
            slug={item.slug}
            domain={item.domain}
            name={item.name}
            className="max-h-7 max-w-[36px] w-auto object-contain"
          />
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${chip.bg} ${chip.text}`}>
          <ChipIcon className="w-3 h-3" /> {chip.label}
        </span>
      </div>
      <div className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</div>
      <div className="text-xs text-gray-500 mt-1">{item.market}</div>
    </div>
  )
}

export default function IntegrationsShowcase() {
  const { t } = useLanguage()
  const s = t.finanzasPage.integrationsShowcase

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-sm font-semibold mb-4">
              <CircleCheck className="w-4 h-4" /> {s.chip}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {s.heading}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {s.subtitle}
            </p>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 text-gray-700">
                <Store className="w-5 h-5" />
                <h3 className="font-semibold text-lg">{s.sectionPOS}</h3>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {POS.map((item) => (
                <IntegrationCard key={item.name} item={item} statusReady={s.statusReady} statusCustom={s.statusCustom} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 text-gray-700">
                <FileSpreadsheet className="w-5 h-5" />
                <h3 className="font-semibold text-lg">{s.sectionAccounting}</h3>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CONTABLE.map((item) => (
                <IntegrationCard key={item.name} item={item} statusReady={s.statusReady} statusCustom={s.statusCustom} />
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-gradient-to-r from-slate-50 to-cyan-50 border border-cyan-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{s.footerTitle}</h4>
                <p className="text-gray-600 text-sm">{s.footerDesc}</p>
              </div>
              <a
                href="https://wa.me/19295007815"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#002D62] hover:bg-[#003d82] text-white rounded-lg font-semibold transition-all whitespace-nowrap"
              >
                {s.footerCta}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
