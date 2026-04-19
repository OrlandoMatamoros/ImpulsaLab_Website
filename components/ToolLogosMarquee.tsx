'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import PlatformLogo from '@/components/PlatformLogo'

type Tool = { name: string; domain: string }

const TOOLS: Tool[] = [
  { name: 'Claude',           domain: 'anthropic.com' },
  { name: 'OpenAI',           domain: 'openai.com' },
  { name: 'Gemini',           domain: 'gemini.google.com' },
  { name: 'n8n',              domain: 'n8n.io' },
  { name: 'Zapier',           domain: 'zapier.com' },
  { name: 'Make',             domain: 'make.com' },
  { name: 'Airtable',         domain: 'airtable.com' },
  { name: 'Notion',           domain: 'notion.so' },
  { name: 'Slack',            domain: 'slack.com' },
  { name: 'Google Workspace', domain: 'workspace.google.com' },
  { name: 'Microsoft 365',    domain: 'microsoft.com' },
  { name: 'Stripe',           domain: 'stripe.com' },
  { name: 'Firebase',         domain: 'firebase.google.com' },
  { name: 'Vercel',           domain: 'vercel.com' },
]

export default function ToolLogosMarquee() {
  const { t } = useLanguage()
  return (
    <section
      aria-label={t.toolsMarquee.ariaLabel}
      className="bg-gray-50 border-y border-gray-200 py-10 overflow-hidden"
    >
      <p className="text-center text-sm uppercase tracking-wider text-gray-500 font-semibold mb-6">
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
                domain={tool.domain}
                name={tool.name}
                className="h-8 md:h-10 max-w-[140px] w-auto object-contain grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
