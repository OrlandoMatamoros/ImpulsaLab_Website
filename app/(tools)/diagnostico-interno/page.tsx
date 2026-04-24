'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'

export default function DiagnosticoInternoPage() {
  const router = useRouter()
  const { userData, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      // Redirigir a la página principal del diagnóstico
      // El modo se determinará automáticamente por el rol
      router.push('/diagnostico')
    }
  }, [loading, userData, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D62]"></div>
    </div>
  )
}