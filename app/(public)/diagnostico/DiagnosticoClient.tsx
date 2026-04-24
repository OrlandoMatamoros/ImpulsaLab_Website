'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import DiagnosticWizard from './components/DiagnosticWizard'

// This component is always public (no Firebase auth).
// useAuth() is not imported here — diagnostico is public-access only.
// The wizard reads consultantId from searchParams internally when needed.
export default function DiagnosticoClient() {
  const { t } = useLanguage()

  return (
    <DiagnosticWizard
      consultantId=""
      isInternalMode={false}
    />
  )
}
