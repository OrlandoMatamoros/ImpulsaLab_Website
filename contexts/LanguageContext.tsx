'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Language } from '@/utils/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.ES
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
  const [t, setT] = useState(translations.ES)

  useEffect(() => {
    // Detectar idioma del navegador o cargar el guardado
    const savedLang = localStorage.getItem('language') as Language
    const browserLang = navigator.language.startsWith('es') ? 'ES' : 'EN'
    const initialLang = savedLang || browserLang

    setLanguage(initialLang)
    setT(translations[initialLang])
    // Mirror to a cookie so server components (e.g. /blog) can pick the
    // active locale on the next request.
    writeLangCookie(initialLang)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    setT(translations[lang])
    localStorage.setItem('language', lang)
    writeLangCookie(lang)
    // Hard refresh server-rendered routes that depend on the cookie
    // (e.g. /blog/*). For client-only pages this is a no-op once they
    // are hydrated since they react to context changes.
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/blog')) {
      window.location.reload()
    }
  }

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