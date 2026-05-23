'use client'

import PlatformLogo from '@/components/PlatformLogo'

/**
 * Horizontal logo ticker mostrando las herramientas de marketing que usamos.
 * Mismo patrón que IntegrationsTicker (finanzas) y TechStackTicker (operaciones).
 * Logos relevantes para presencia digital, contenido, ads, email y diseño.
 *
 * Para añadir/quitar herramientas, edita el array TOOLS abajo y asegúrate que
 * el logo correspondiente exista en /public/logos/platforms/ (slug.{svg|png}).
 */

type MarketingTool = { name: string; slug: string; domain: string; group: string }

const TOOLS: MarketingTool[] = [
  // Redes sociales / Distribución
  { name: 'Meta',             slug: 'facebook',      domain: 'facebook.com',     group: 'Redes' },
  { name: 'Instagram',        slug: 'instagram',     domain: 'instagram.com',    group: 'Redes' },
  { name: 'WhatsApp Business', slug: 'whatsapp',     domain: 'business.whatsapp.com', group: 'Redes' },

  // Google
  { name: 'Google Workspace', slug: 'google',        domain: 'workspace.google.com',  group: 'Google' },
  { name: 'Google Analytics', slug: 'googleanalytics', domain: 'analytics.google.com', group: 'Google' },

  // Email / CRM
  { name: 'Mailchimp',        slug: 'mailchimp',     domain: 'mailchimp.com',    group: 'Email/CRM' },
  { name: 'HubSpot',          slug: 'hubspot',       domain: 'hubspot.com',      group: 'Email/CRM' },

  // Contenido IA
  { name: 'Claude',           slug: 'anthropic',     domain: 'claude.ai',        group: 'Contenido IA' },
  { name: 'ChatGPT',          slug: 'chatgpt',       domain: 'chat.openai.com',  group: 'Contenido IA' },
  { name: 'Google Gemini',    slug: 'googlegemini',  domain: 'gemini.google.com', group: 'Contenido IA' },
  { name: 'ElevenLabs',       slug: 'elevenlabs',    domain: 'elevenlabs.io',    group: 'Contenido IA' },

  // Diseño
  { name: 'Canva',            slug: 'canva',         domain: 'canva.com',        group: 'Diseño' },
  { name: 'Figma',            slug: 'figma',         domain: 'figma.com',        group: 'Diseño' },
  { name: 'Adobe Firefly',    slug: 'adobefirefly',  domain: 'firefly.adobe.com', group: 'Diseño' },
  { name: 'Freepik',          slug: 'freepik',       domain: 'freepik.com',      group: 'Diseño' },

  // SEO / Analytics
  { name: 'Ahrefs',           slug: 'ahrefs',        domain: 'ahrefs.com',       group: 'SEO' },

  // Hosting / Dev
  { name: 'Vercel',           slug: 'vercel',        domain: 'vercel.com',       group: 'Hosting' },
  { name: 'Cloudflare',       slug: 'cloudflare',    domain: 'cloudflare.com',   group: 'Hosting' },
]

interface MarketingToolsTickerProps {
  heading?: string
  background?: string
}

export default function MarketingToolsTicker({
  heading = 'Las herramientas que usamos para tu marketing — y las que conectamos al tuyo',
  background = 'bg-white',
}: MarketingToolsTickerProps) {
  return (
    <section
      aria-label="Herramientas de marketing que usamos en Impulsa Lab"
      className={`${background} border-y border-slate-200 py-10`}
    >
      <p className="text-center text-sm uppercase tracking-wider text-slate-500 font-semibold mb-6 px-4">
        {heading}
      </p>
      <div className="integrations-ticker group relative">
        <div className="integrations-ticker__track">
          {[...TOOLS, ...TOOLS].map((item, i) => (
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
