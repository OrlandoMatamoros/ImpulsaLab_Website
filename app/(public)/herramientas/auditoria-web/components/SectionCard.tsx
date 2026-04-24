'use client'

import { useState } from 'react'
import {
  ChevronDown,
  DollarSign,
  LayoutGrid,
  Palette,
  Search,
  Shield,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import ScoreGauge from './ScoreGauge'
import { useLanguage } from '@/contexts/LanguageContext'

interface SectionData {
  id: string
  name: string
  score: number
  findings: string[]
  recommendations: string[]
}

const sectionIcons: Record<string, LucideIcon> = {
  seo: Search,
  design: Palette,
  commercial: DollarSign,
  structure: LayoutGrid,
  presence: Smartphone,
  security: Shield,
}

export default function SectionCard({ section }: { section: SectionData }) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const Icon = sectionIcons[section.id] || Search

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-slate-700">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="w-full p-6 flex items-center gap-6 text-left cursor-pointer"
      >
        <ScoreGauge score={section.score} label="" size={80} />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#00BCD4]/10 border border-[#00BCD4]/20 flex items-center justify-center text-[#00BCD4]">
              <Icon className="w-4 h-4" />
            </span>
            {section.name}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {section.findings.length} {t.auditPage.findingsCount} &middot;{' '}
            {section.recommendations.length} {t.auditPage.recommendationsCount}
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
          {section.findings.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                {t.auditPage.findings}
              </h4>
              <ul className="space-y-2">
                {section.findings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">&#9656;</span>
                    <span className="text-slate-300">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.recommendations.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                {t.auditPage.recommendations}
              </h4>
              <ul className="space-y-2">
                {section.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00BCD4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
