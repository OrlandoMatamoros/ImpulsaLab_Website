'use client'

import PlatformLogo from '@/components/PlatformLogo'

/**
 * Horizontal logo ticker mostrando el stack tecnológico real de Impulsa Lab.
 * Logos de marca reales — incluye IA, automatización, dev/infra, comunicación
 * y productividad. Mismo patrón que IntegrationsTicker (usado en /servicios/finanzas).
 *
 * Para añadir/quitar herramientas, edita el array STACK abajo y asegúrate que el
 * logo correspondiente exista en /public/logos/platforms/ (slug.{svg|png}).
 */

type StackTool = { name: string; slug: string; domain: string; group: string }

const STACK: StackTool[] = [
  // IA / Modelos
  { name: 'Anthropic Claude', slug: 'anthropic',     domain: 'anthropic.com',  group: 'IA' },
  { name: 'OpenAI',           slug: 'openai',        domain: 'openai.com',     group: 'IA' },
  { name: 'Google Gemini',    slug: 'googlegemini',  domain: 'gemini.google.com', group: 'IA' },

  // Automatización
  { name: 'n8n',              slug: 'n8n',           domain: 'n8n.io',         group: 'Automatización' },
  { name: 'Make',             slug: 'make',          domain: 'make.com',       group: 'Automatización' },
  { name: 'Zapier',           slug: 'zapier',        domain: 'zapier.com',     group: 'Automatización' },

  // Comunicación / CX
  { name: 'WhatsApp Business', slug: 'whatsapp',     domain: 'business.whatsapp.com', group: 'Comunicación' },
  { name: 'Slack',            slug: 'slack',         domain: 'slack.com',      group: 'Comunicación' },
  { name: 'Instagram',        slug: 'instagram',     domain: 'instagram.com',  group: 'Comunicación' },

  // Dev / Infra
  { name: 'GitHub',           slug: 'github',        domain: 'github.com',     group: 'Dev/Infra' },
  { name: 'Vercel',           slug: 'vercel',        domain: 'vercel.com',     group: 'Dev/Infra' },
  { name: 'Firebase',         slug: 'firebase',      domain: 'firebase.google.com', group: 'Dev/Infra' },
  { name: 'AWS',              slug: 'aws',           domain: 'aws.amazon.com',  group: 'Dev/Infra' },

  // Productividad / Datos
  { name: 'Google Workspace', slug: 'google',        domain: 'workspace.google.com', group: 'Productividad' },
  { name: 'Microsoft 365',    slug: 'microsoft',     domain: 'microsoft.com',  group: 'Productividad' },
  { name: 'Notion',           slug: 'notion',        domain: 'notion.so',      group: 'Productividad' },
  { name: 'Airtable',         slug: 'airtable',      domain: 'airtable.com',   group: 'Productividad' },

  // Pagos
  { name: 'Stripe',           slug: 'stripe',        domain: 'stripe.com',     group: 'Pagos' },
]

interface TechStackTickerProps {
  /** Heading custom; por defecto: stack tecnológico Impulsa */
  heading?: string
  /** Color de fondo override; por defecto blanco */
  background?: string
}

export default function TechStackTicker({
  heading = 'Nuestro stack tecnológico — y el que conectamos al tuyo',
  background = 'bg-white',
}: TechStackTickerProps) {
  return (
    <section
      aria-label="Stack tecnológico de Impulsa Lab"
      className={`${background} border-y border-slate-200 py-10`}
    >
      <p className="text-center text-sm uppercase tracking-wider text-slate-500 font-semibold mb-6 px-4">
        {heading}
      </p>
      <div className="integrations-ticker group relative">
        <div className="integrations-ticker__track">
          {[...STACK, ...STACK].map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="integrations-ticker__item"
              title={`${item.name} · ${item.group}`}
            >
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
