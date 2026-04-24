// Archivo: /hooks/useTranslation.ts
// NOTE: This hook is unused — components use useLanguage() from LanguageContext instead.
// Updated to avoid pulling the full translations bundle (ES+EN) synchronously.

import { useState, useEffect } from 'react'
import { translationsES } from '@/utils/translations/translations-es'

export type Language = 'ES' | 'EN'
export type Translations = typeof translationsES

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('ES')
  const [t, setT] = useState<Translations>(translationsES)

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null
    const browserLang: Language = navigator.language.startsWith('en') ? 'EN' : 'ES'
    const currentLang = savedLang || browserLang

    if (currentLang === 'EN') {
      import('@/utils/translations/translations-en').then((mod) => {
        setT(mod.default as unknown as Translations)
        setLanguage('EN')
      })
    } else {
      setLanguage('ES')
    }
  }, [])

  const changeLanguage = async (newLang: Language) => {
    if (newLang === 'EN') {
      const mod = await import('@/utils/translations/translations-en')
      setT(mod.default as unknown as Translations)
    } else {
      setT(translationsES)
    }
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return { t, language, changeLanguage }
}

// Hook para usar solo en el contexto del idioma actual
export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ES')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  return language
}
