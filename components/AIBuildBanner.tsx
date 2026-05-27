'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function AIBuildBanner() {
  const { t } = useLanguage()
  const message = t.aiBanner.text

  return (
    <div className="bg-brand-navy border-b border-white/10 overflow-hidden min-h-[32px]">
      <div className="ai-banner-marquee relative flex whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="flex items-center gap-3 px-8 py-1.5 text-xs text-gray-300 font-mono tracking-wide">
            <span className="text-brand-cyan">{'>'}_</span>
            {message}
            <span className="text-brand-cyan">{t.aiBanner.separator}</span>
          </span>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ai-banner-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ai-banner-marquee {
          animation: ai-banner-scroll 30s linear infinite;
        }
        @media (max-width: 768px) {
          .ai-banner-marquee {
            animation: ai-banner-scroll 18s linear infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-banner-marquee {
            animation: none;
          }
        }
      `}} />
    </div>
  )
}
