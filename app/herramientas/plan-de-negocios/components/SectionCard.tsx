'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export interface PlanSection {
  id: string
  title: string
  content: string
  highlights: string[]
}

const sectionIcons: Record<string, string> = {
  'executive-summary': '\uD83D\uDCCB',
  'company-description': '\uD83C\uDFE2',
  'market-analysis': '\uD83D\uDCC8',
  'products-services': '\uD83D\uDCE6',
  'marketing-sales': '\uD83D\uDCE3',
  'operations': '\u2699\uFE0F',
  'team': '\uD83D\uDC65',
  'financial-projections': '\uD83D\uDCB0',
  'risk-analysis': '\u26A0\uFE0F',
  'implementation': '\uD83D\uDCC5',
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
  const icon = sectionIcons[section.id] || '\uD83D\uDCCA'

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-slate-700">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-center gap-4 text-left cursor-pointer"
      >
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <p className="text-sm text-slate-400 mt-1">
            {section.highlights.length} {bp.highlightsCount}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-slate-800 audit-slide-down">
          {/* Highlights */}
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

          {/* Full content */}
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
