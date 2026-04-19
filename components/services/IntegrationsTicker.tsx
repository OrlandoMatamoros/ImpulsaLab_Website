'use client'

import { useLanguage } from '@/contexts/LanguageContext'

type Integration = { name: string; domain: string }

const INTEGRATIONS: Integration[] = [
  { name: 'QuickBooks',  domain: 'quickbooks.intuit.com' },
  { name: 'Stripe',      domain: 'stripe.com' },
  { name: 'Square',      domain: 'squareup.com' },
  { name: 'Shopify',     domain: 'shopify.com' },
  { name: 'Toast',       domain: 'toasttab.com' },
  { name: 'Clover',      domain: 'clover.com' },
  { name: 'Lightspeed',  domain: 'lightspeedhq.com' },
  { name: 'Loyverse',    domain: 'loyverse.com' },
  { name: 'Revel',       domain: 'revelsystems.com' },
  { name: 'Aldelo',      domain: 'aldelo.com' },
  { name: 'Alegra',      domain: 'alegra.com' },
  { name: 'Siigo',       domain: 'siigo.com' },
  { name: 'Nubox',       domain: 'nubox.com' },
  { name: 'Contpaqi',    domain: 'contpaqi.com' },
]

export default function IntegrationsTicker() {
  const { t } = useLanguage()
  const heading = t.integrationsTicker?.heading ?? 'Conectamos directo con tu sistema'

  return (
    <section aria-label="Integraciones POS y contables" className="bg-white border-y border-slate-200 py-10">
      <p className="text-center text-sm uppercase tracking-wider text-slate-500 font-semibold mb-6 px-4">
        {heading}
      </p>
      <div className="integrations-ticker group relative">
        <div className="integrations-ticker__track">
          {[...INTEGRATIONS, ...INTEGRATIONS].map((item, i) => (
            <div key={`${item.name}-${i}`} className="integrations-ticker__item" title={item.name}>
              <img
                src={`https://logo.clearbit.com/${item.domain}`}
                alt={item.name}
                className="h-10 max-w-[140px] w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                loading="lazy"
                onError={(e) => {
                  const el = e.currentTarget
                  const parent = el.parentElement
                  if (parent && !parent.querySelector('.integrations-ticker__fallback')) {
                    el.style.display = 'none'
                    const span = document.createElement('span')
                    span.className = 'integrations-ticker__fallback text-slate-600 font-semibold text-base whitespace-nowrap'
                    span.textContent = item.name
                    parent.appendChild(span)
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
