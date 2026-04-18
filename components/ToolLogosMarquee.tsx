'use client'

/**
 * ToolLogosMarquee — infinite horizontal scroll banner of AI/automation
 * tool names. Pure CSS keyframes animation, duplicated track for seamless
 * loop. Pause on hover. Respects prefers-reduced-motion (static display).
 */
const TOOLS = [
  'Claude',
  'OpenAI',
  'Gemini',
  'n8n',
  'Zapier',
  'Make',
  'Airtable',
  'Notion',
  'Slack',
  'Google Workspace',
  'Microsoft 365',
  'Stripe',
  'Firebase',
  'Vercel',
]

export default function ToolLogosMarquee() {
  return (
    <section
      aria-label="Herramientas que integramos"
      className="bg-gray-50 border-y border-gray-200 py-8 overflow-hidden"
    >
      <p className="text-center text-sm uppercase tracking-wider text-gray-500 font-semibold mb-6">
        Integramos las herramientas que ya usás
      </p>
      <div className="tool-marquee group relative">
        <div className="tool-marquee__track">
          {[...TOOLS, ...TOOLS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="tool-marquee__item text-2xl md:text-3xl font-bold text-gray-400 hover:text-brand-navy transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
