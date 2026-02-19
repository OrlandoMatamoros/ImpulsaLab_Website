'use client'

import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import DiagnosticWizard from './components/DiagnosticWizard'

export default function DiagnosticoPage() {
  const { user, userData, loading } = useAuth()
  const { t } = useLanguage()
  const tp = t.diagnosticoPage

  // Si está cargando autenticación, mostrar loading breve
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D62] mx-auto"></div>
          <p className="mt-4 text-gray-600">{tp.cargando}</p>
        </div>
      </div>
    )
  }

  // Determinar si es modo interno basado en el rol del usuario
  const isInternalMode = userData?.role === 'consultant'

  // Permitir acceso sin autenticación (público)
  // Si hay usuario autenticado, usar su UID, si no, usar string vacío
  return (
    <DiagnosticWizard
      consultantId={user?.uid || ''}
      isInternalMode={isInternalMode}
    />
  )
}// Force rebuild Wed Aug  6 13:32:29 UTC 2025
