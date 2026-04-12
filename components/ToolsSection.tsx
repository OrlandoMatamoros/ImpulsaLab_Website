'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  FileText,
  Grid3X3,
  Lock,
  Newspaper,
  Receipt,
  Search,
  Sparkles,
  Wand2,
} from 'lucide-react'
import { tools } from '@/lib/tools-data'
import { useLanguage } from '@/contexts/LanguageContext'

type ToolId =
  | 'planNegocios'
  | 'agentes'
  | 'promptDesigner'
  | 'noticias'
  | 'arsenal'
  | 'auditoriaWeb'
  | 'facturacion'

interface ToolCard {
  id: ToolId
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: 'new' | 'free' | 'admin'
  featured?: boolean
}

const PUBLIC_TOOLS: ToolCard[] = [
  { id: 'planNegocios', href: '/herramientas/plan-de-negocios', icon: FileText, badge: 'new', featured: true },
  { id: 'agentes', href: '/herramientas/agentes', icon: Bot, badge: 'free' },
  { id: 'promptDesigner', href: '/herramientas/prompt-designer', icon: Wand2, badge: 'free' },
  { id: 'noticias', href: '/herramientas/noticias', icon: Newspaper, badge: 'free' },
  { id: 'arsenal', href: '/herramientas/arsenal', icon: Grid3X3, badge: 'free' },
]

const INTERNAL_TOOLS: ToolCard[] = [
  { id: 'auditoriaWeb', href: '/herramientas/auditoria-web', icon: Search, badge: 'admin' },
  { id: 'facturacion', href: '/herramientas/facturacion', icon: Receipt, badge: 'admin' },
]

export default function ToolsSection() {
  const { t } = useLanguage()
  const ts = t.herramientasPage.toolsSection
  const toolsCount = tools.length

  const getCopy = (id: ToolId) => {
    const copy = ts[id] as { title: string; description: string }
    const description = copy.description.replace('{count}', String(toolsCount))
    return { title: copy.title, description }
  }

  const renderBadge = (badge?: 'new' | 'free' | 'admin') => {
    if (!badge) return null
    const labels = { new: ts.newBadge, free: ts.freeBadge, admin: ts.adminBadge }
    const styles = {
      new: 'bg-[#00BCD4] text-[#002D62]',
      free: 'bg-[#00BCD4]/15 text-[#00BCD4] border border-[#00BCD4]/30',
      admin: 'bg-slate-800 text-slate-300 border border-slate-700',
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[badge]}`}>
        {badge === 'admin' && <Lock className="w-3 h-3" />}
        {labels[badge]}
      </span>
    )
  }

  const renderCard = (card: ToolCard, variant: 'public' | 'internal') => {
    const Icon = card.icon
    const { title, description } = getCopy(card.id)
    const isFeatured = card.featured

    const baseClasses = 'group relative flex flex-col rounded-2xl p-8 border transition-all duration-300 overflow-hidden'
    const variantClasses =
      variant === 'public'
        ? 'bg-white border-slate-200 hover:border-[#00BCD4] hover:shadow-2xl hover:-translate-y-1'
        : 'bg-slate-900/60 border-slate-800 hover:border-[#00BCD4]/40 hover:bg-slate-900/80'

    const featuredClasses = isFeatured
      ? 'md:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#002D62] via-[#0a3a7a] to-[#00BCD4]/90 text-white border-[#00BCD4]/30 hover:shadow-[0_20px_60px_-15px_rgba(0,188,212,0.4)]'
      : ''

    const isDarkCard = isFeatured || variant === 'internal'

    return (
      <Link
        key={card.id}
        href={card.href}
        className={`${baseClasses} ${featuredClasses || variantClasses}`}
      >
        <div className="flex items-start justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              isFeatured
                ? 'bg-white/15 backdrop-blur-sm'
                : variant === 'internal'
                ? 'bg-slate-800 text-[#00BCD4]'
                : 'bg-gradient-to-br from-[#002D62] to-[#00BCD4] text-white shadow-lg'
            }`}
          >
            <Icon className="w-7 h-7" />
          </div>
          {renderBadge(card.badge)}
        </div>

        <h3
          className={`font-bold mb-3 ${isFeatured ? 'text-3xl md:text-4xl' : 'text-xl'} ${
            isDarkCard ? 'text-white' : 'text-slate-900'
          }`}
        >
          {title}
        </h3>

        <p
          className={`flex-1 mb-6 leading-relaxed ${isFeatured ? 'text-base md:text-lg' : 'text-sm'} ${
            isFeatured ? 'text-slate-100' : isDarkCard ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {description}
        </p>

        <span
          className={`inline-flex items-center gap-2 text-sm font-semibold ${
            isFeatured
              ? 'text-[#00BCD4]'
              : isDarkCard
              ? 'text-[#00BCD4]'
              : 'text-[#002D62] group-hover:text-[#00BCD4]'
          }`}
        >
          {ts.cta}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    )
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00BCD4] rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#002D62] rounded-full blur-[120px] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00BCD4]/10 border border-[#00BCD4]/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#00BCD4]" />
            <span className="text-sm font-semibold text-[#002D62]">{ts.eyebrow}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-900">{ts.sectionTitle}</span>{' '}
            <span className="bg-gradient-to-r from-[#002D62] to-[#00BCD4] bg-clip-text text-transparent">
              {ts.sectionTitleHighlight}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            {ts.sectionSubtitle}
          </p>
        </div>

        {/* Public tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {PUBLIC_TOOLS.map((card) => renderCard(card, 'public'))}
        </div>

        {/* Internal tools (admin-only) */}
        <div className="border-t border-slate-200 pt-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full mb-4">
              <Lock className="w-3.5 h-3.5 text-[#00BCD4]" />
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {ts.internalTitle}
              </span>
            </div>
            <p className="text-sm text-slate-500">{ts.internalSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {INTERNAL_TOOLS.map((card) => renderCard(card, 'internal'))}
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-8 bg-gradient-to-br from-[#002D62] to-[#0a3a7a] rounded-2xl border border-[#00BCD4]/20 shadow-xl">
            <p className="text-lg text-white font-medium">{ts.needHelp}</p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-[#00BCD4] text-[#002D62] px-6 py-3 rounded-xl hover:bg-white transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105"
            >
              {ts.scheduleConsultation}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
