'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const ToolsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
)

const AIIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)

const NewsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M11 6h6M11 10h6M11 14h6M11 18h6"/>
  </svg>
)

const PromptIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
    <path d="M5 12l7-7 7 7"/>
  </svg>
)

export default function ToolsHubSection() {
  const { t } = useLanguage()
  const prefersReduced = useReducedMotion()

  const tools = [
    {
      href: '/herramientas/arsenal',
      gradient: 'from-blue-600 to-blue-700',
      border: 'border-blue-500 hover:border-blue-300',
      shadow: 'hover:shadow-blue-500/50',
      badge: t.hero.gratis,
      badgeColor: 'text-blue-700',
      icon: ToolsIcon,
      name: t.hero.arsenal,
      desc: <><span className="font-bold text-white">{t.hero.arsenalDesc}</span> {t.hero.arsenalDescFull}</>,
      meta: t.hero.arsenalMeta,
    },
    {
      href: '/herramientas/agentes',
      gradient: 'from-purple-600 to-purple-700',
      border: 'border-purple-500 hover:border-purple-300',
      shadow: 'hover:shadow-purple-500/50',
      badge: t.hero.popular,
      badgeColor: 'text-purple-700',
      icon: AIIcon,
      name: t.hero.agentes,
      desc: t.hero.agentesDesc,
      meta: t.hero.agentesMeta,
    },
    {
      href: '/herramientas/noticias',
      gradient: 'from-emerald-600 to-emerald-700',
      border: 'border-emerald-500 hover:border-emerald-300',
      shadow: 'hover:shadow-emerald-500/50',
      badge: t.hero.actualizado,
      badgeColor: 'text-emerald-700',
      icon: NewsIcon,
      name: t.hero.noticias,
      desc: t.hero.noticiasDesc,
      meta: t.hero.noticiasMeta,
    },
    {
      href: '/herramientas/prompt-designer',
      gradient: 'from-orange-600 to-red-600',
      border: 'border-orange-500 hover:border-orange-300',
      shadow: 'hover:shadow-orange-500/50',
      badge: t.hero.pro,
      badgeColor: 'text-orange-700',
      icon: PromptIcon,
      name: t.hero.promptDesigner,
      desc: t.hero.promptDesc,
      meta: t.hero.promptMeta,
    },
  ]

  return (
    <section className="py-16 bg-brand-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t.hero.hubTitulo}
          </h2>
          <p className="text-gray-300 text-lg">
            {t.hero.hubSubtitulo}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.href}
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            <Link
              href={tool.href}
              className={`group relative bg-gradient-to-br ${tool.gradient} p-5 rounded-xl border-2 ${tool.border} transition-all duration-500 hover:scale-105 hover:shadow-xl ${tool.shadow} overflow-hidden block h-full`}
            >
              <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                <span className={tool.badgeColor}>{tool.badge}</span>
              </div>

              <div className="relative">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                    <tool.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-white">{tool.name}</span>
                </div>
                <p className="text-sm text-white/90 font-medium mb-2">{tool.desc}</p>
                <p className="text-xs text-white/80">{tool.meta}</p>
              </div>
            </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/herramientas"
            className="inline-flex items-center px-8 py-3 bg-brand-cyan text-brand-navy rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-cyan-300 group"
          >
            <ToolsIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            {t.hero.explorar}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <p className="text-xs text-gray-400 mt-3">{t.hero.sinTarjeta}</p>
        </div>
      </div>
    </section>
  )
}
