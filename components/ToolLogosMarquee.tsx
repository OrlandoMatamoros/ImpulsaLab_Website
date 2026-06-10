'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PlatformLogo from '@/components/PlatformLogo'

type Tool = { name: string; slug: string; domain: string }

const TOOLS: Tool[] = [
  { name: 'Claude',           slug: 'anthropic',    domain: 'anthropic.com' },
  { name: 'OpenAI',           slug: 'openai',       domain: 'openai.com' },
  { name: 'Gemini',           slug: 'googlegemini', domain: 'gemini.google.com' },
  { name: 'n8n',              slug: 'n8n',          domain: 'n8n.io' },
  { name: 'Zapier',           slug: 'zapier',       domain: 'zapier.com' },
  { name: 'Make',             slug: 'make',         domain: 'make.com' },
  { name: 'Airtable',         slug: 'airtable',     domain: 'airtable.com' },
  { name: 'Notion',           slug: 'notion',       domain: 'notion.so' },
  { name: 'Slack',            slug: 'slack',        domain: 'slack.com' },
  { name: 'Google Workspace', slug: 'google',       domain: 'workspace.google.com' },
  { name: 'Microsoft 365',    slug: 'microsoft',    domain: 'microsoft.com' },
  { name: 'Stripe',           slug: 'stripe',       domain: 'stripe.com' },
  { name: 'Firebase',         slug: 'firebase',     domain: 'firebase.google.com' },
  { name: 'Vercel',           slug: 'vercel',       domain: 'vercel.com' },
]

export default function ToolLogosMarquee() {
  const { t } = useLanguage()
  return (
    <section
      aria-label={t.toolsMarquee.ariaLabel}
      className="bg-gray-50 border-y border-gray-200 py-10 overflow-hidden"
    >
      <p className="text-center text-sm uppercase tracking-wider text-gray-600 font-semibold mb-6">
        {t.toolsMarquee.heading}
      </p>
      <div className="tool-marquee group relative">
        <div className="tool-marquee__track">
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="tool-marquee__item"
              title={tool.name}
            >
              <PlatformLogo
                slug={tool.slug}
                domain={tool.domain}
                name={tool.name}
                className="h-8 md:h-10 max-w-[140px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
