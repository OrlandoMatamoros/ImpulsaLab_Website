'use client'

import PlatformLogo from '@/components/PlatformLogo'

/**
 * Horizontal logo ticker mostrando las herramientas de IA que enseñamos en Academy.
 * Mismo patrón que IntegrationsTicker (finanzas), TechStackTicker (operaciones) y
 * MarketingToolsTicker (marketing). Logos de las plataformas que el cliente y su
 * equipo van a aprender a usar en su trabajo del día a día.
 *
 * Para añadir/quitar herramientas, edita el array TOOLS abajo y asegúrate que
 * el logo correspondiente exista en /public/logos/platforms/ (slug.{svg|png}).
 */

type AcademyTool = { name: string; slug: string; domain: string; group: string }

const TOOLS: AcademyTool[] = [
  // Asistentes IA principales (los 3 frontera)
  { name: 'Claude',           slug: 'anthropic',     domain: 'claude.ai',         group: 'Asistentes IA' },
  { name: 'ChatGPT',          slug: 'chatgpt',       domain: 'chat.openai.com',   group: 'Asistentes IA' },
  { name: 'Google Gemini',    slug: 'googlegemini',  domain: 'gemini.google.com', group: 'Asistentes IA' },

  // Conocimiento + Productividad con IA
  { name: 'NotebookLM',       slug: 'google',        domain: 'notebooklm.google.com', group: 'Conocimiento' },
  { name: 'Notion',           slug: 'notion',        domain: 'notion.so',         group: 'Conocimiento' },

  // Coding / Power-user
  { name: 'GitHub Copilot',   slug: 'githubcopilot', domain: 'github.com/features/copilot', group: 'Coding IA' },
  { name: 'Microsoft Copilot', slug: 'copilot',      domain: 'copilot.microsoft.com', group: 'Coding IA' },
  { name: 'Cursor',           slug: 'cursor',        domain: 'cursor.com',        group: 'Coding IA' },

  // Diseño + creatividad
  { name: 'Canva',            slug: 'canva',         domain: 'canva.com',         group: 'Diseño' },
  { name: 'Figma',            slug: 'figma',         domain: 'figma.com',         group: 'Diseño' },

  // Lenguaje / Comunicación
  { name: 'Grammarly',        slug: 'grammarly',     domain: 'grammarly.com',     group: 'Comunicación' },

  // Aprendizaje formal complementario
  { name: 'Coursera',         slug: 'coursera',      domain: 'coursera.org',      group: 'Cursos' },
  { name: 'Duolingo',         slug: 'duolingo',      domain: 'duolingo.com',      group: 'Cursos' },
]

interface AcademyToolsTickerProps {
  heading?: string
  background?: string
}

export default function AcademyToolsTicker({
  heading = 'Las herramientas que aprendes a usar en Academy',
  background = 'bg-white',
}: AcademyToolsTickerProps) {
  return (
    <section
      aria-label="Herramientas de IA que enseñamos en Impulsa Academy"
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
