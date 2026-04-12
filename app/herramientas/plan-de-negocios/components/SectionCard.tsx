'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  Building2,
  Calendar,
  ChevronDown,
  ClipboardList,
  DollarSign,
  Megaphone,
  Package,
  Settings,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export interface PlanSection {
  id: string
  title: string
  content: string
  highlights: string[]
}

const sectionIcons: Record<string, LucideIcon> = {
  'executive-summary': ClipboardList,
  'company-description': Building2,
  'market-analysis': TrendingUp,
  'products-services': Package,
  'marketing-sales': Megaphone,
  operations: Settings,
  team: Users,
  'financial-projections': DollarSign,
  'risk-analysis': AlertTriangle,
  implementation: Calendar,
}

export default function SectionCard({
  section,
  defaultExpanded = false,
}: {
  section: PlanSection
  defaultExpanded?: boolean
}) {
  const { t } = useLanguage()
  const bp = t.businessPlanPage
  const [expanded, setExpanded] = useState(defaultExpanded)
  const Icon = sectionIcons[section.id] || ClipboardList

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-slate-700">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="w-full p-6 flex items-center gap-4 text-left cursor-pointer"
      >
        <span className="w-10 h-10 rounded-lg bg-[#00BCD4]/10 border border-[#00BCD4]/20 flex items-center justify-center flex-shrink-0 text-[#00BCD4]">
          <Icon className="w-5 h-5" />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <p className="text-sm text-slate-400 mt-1">
            {section.highlights.length} {bp.highlightsCount}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-slate-800 audit-slide-down">
          {section.highlights.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                {bp.keyHighlights}
              </h4>
              <ul className="space-y-2">
                {section.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-[#00BCD4] mt-0.5 flex-shrink-0">&#10003;</span>
                    <span className="text-slate-300">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {bp.fullContent}
            </h4>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
