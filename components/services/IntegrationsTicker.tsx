'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PlatformLogo from '@/components/PlatformLogo'

type Integration = { name: string; domain: string; slug?: string }

const INTEGRATIONS: Integration[] = [
  { name: 'QuickBooks',  slug: 'quickbooks', domain: 'quickbooks.intuit.com' },
  { name: 'Stripe',      slug: 'stripe',     domain: 'stripe.com' },
  { name: 'Square',      slug: 'square',     domain: 'squareup.com' },
  { name: 'Shopify',     slug: 'shopify',    domain: 'shopify.com' },
  { name: 'Toast',       slug: 'toast',      domain: 'toasttab.com' },
  { name: 'Clover',      slug: 'clover',     domain: 'clover.com' },
  { name: 'Lightspeed',  slug: 'lightspeed', domain: 'lightspeedhq.com' },
  { name: 'Loyverse',    slug: 'loyverse',   domain: 'loyverse.com' },
  { name: 'Revel',       slug: 'revel',      domain: 'revelsystems.com' },
  { name: 'Aldelo',      slug: 'aldelo',     domain: 'aldelo.com' },
  { name: 'Alegra',      slug: 'alegra',     domain: 'alegra.com' },
  { name: 'Siigo',       slug: 'siigo',      domain: 'siigo.com' },
  { name: 'Nubox',       slug: 'nubox',      domain: 'nubox.com' },
  { name: 'Contpaqi',    slug: 'contpaqi',   domain: 'contpaqi.com' },
]

export default function IntegrationsTicker() {
  const { t } = useLanguage()
  return (
    <section aria-label="Integraciones POS y contables" className="bg-white border-y border-slate-200 py-10">
      <p className="text-center text-sm uppercase tracking-wider text-slate-500 font-semibold mb-6 px-4">
        {t.toolsMarquee.integrationsHeading}
      </p>
      <div className="integrations-ticker group relative">
        <div className="integrations-ticker__track">
          {[...INTEGRATIONS, ...INTEGRATIONS].map((item, i) => (
            <div key={`${item.name}-${i}`} className="integrations-ticker__item" title={item.name}>
              <PlatformLogo
                slug={item.slug}
                domain={item.domain}
                name={item.name}
                className="h-10 max-w-[140px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
