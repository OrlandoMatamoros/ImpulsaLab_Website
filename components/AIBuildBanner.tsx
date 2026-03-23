'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AIBuildBanner() {
  const { t } = useLanguage()
  const message = t.aiBanner.text

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Más copias en móvil para que no haya huecos al hacer scroll
  const copies = isMobile ? 6 : 4
  // Móvil más lento para que sea legible
  const duration = isMobile ? '45s' : '30s'

  return (
    <div className="bg-brand-navy border-b border-white/10 overflow-hidden">
      <div
        className="relative flex whitespace-nowrap"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {[...Array(copies)].map((_, i) => (
          <span key={i} className="flex items-center gap-3 px-8 py-1.5 text-xs text-gray-300 font-mono tracking-wide">
            <span className="text-brand-cyan">{'>'}_</span>
            {message}
            <span className="text-brand-cyan">{t.aiBanner.separator}</span>
          </span>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}} />
    </div>
  )
}
