'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function AIBuildBanner() {
  const { t } = useLanguage()
  const message = t.aiBanner.text

  return (
    <div className="bg-brand-navy border-b border-white/10 overflow-hidden">
      <div className="relative flex whitespace-nowrap animate-marquee">
        {/* Repetimos el texto varias veces para el efecto infinito */}
        {[...Array(4)].map((_, i) => (
          <span key={i} className="flex items-center gap-3 px-8 py-1.5 text-xs text-gray-300 font-mono tracking-wide">
            <span className="text-brand-cyan">{'>'}_</span>
            {message}
            <span className="text-brand-cyan">{t.aiBanner.separator}</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
