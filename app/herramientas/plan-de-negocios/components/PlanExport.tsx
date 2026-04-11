'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function PlanExport({ onReset }: { onReset: () => void }) {
  const { t } = useLanguage()
  const bp = t.businessPlanPage

  function handlePrint() {
    window.print()
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center no-print pb-8">
      <button
        onClick={handlePrint}
        className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm cursor-pointer inline-flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        {bp.exportPdf}
      </button>
      <button
        onClick={onReset}
        className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm cursor-pointer inline-flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        {bp.newPlan}
      </button>
    </div>
  )
}
