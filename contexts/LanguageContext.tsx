'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { translationsES } from '@/utils/translations/translations-es'

// EN is loaded dynamically only when the user switches language.
// This keeps the EN blob (~210 KB) out of the initial JS bundle.
type Language = 'ES' | 'EN'
type Translations = typeof translationsES

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function writeLangCookie(lang: Language) {
  if (typeof document === 'undefined') return
  // 1 year, site-wide, lax for top-level navigations.
  const oneYear = 60 * 60 * 24 * 365
  document.cookie = `lang=${lang}; path=/; max-age=${oneYear}; samesite=lax`
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ES')
  const [t, setT] = useState<Translations>(translationsES)

  useEffect(() => {
    // Detect saved language or browser preference
    const savedLang = localStorage.getItem('language') as Language | null
    const browserLang: Language = navigator.language.startsWith('es') ? 'ES' : 'EN'
    const initialLang = savedLang || browserLang

    if (initialLang === 'EN') {
      // Load EN bundle dynamically even on first render if user had switched
      import('@/utils/translations/translations-en').then((mod) => {
        setT(mod.default as unknown as Translations)
        setLanguage('EN')
        writeLangCookie('EN')
      })
    } else {
      setLanguage('ES')
      writeLangCookie('ES')
      // translationsES already set as initial state — no-op
    }
  }, [])

  const handleSetLanguage = useCallback(async (lang: Language) => {
    if (lang === 'EN') {
      const mod = await import('@/utils/translations/translations-en')
      setT(mod.default as unknown as Translations)
    } else {
      setT(translationsES)
    }
    setLanguage(lang)
    localStorage.setItem('language', lang)
    writeLangCookie(lang)
    // Hard refresh server-rendered routes that depend on the cookie (e.g. /blog/*).
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/blog')) {
      window.location.reload()
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Re-export Language type for consumers that imported it from here
export type { Language }
