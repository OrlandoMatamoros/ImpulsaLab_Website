'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { isAdminEmail } from '@/lib/admin-emails'
import { LINKS } from '@/lib/constants'

/**
 * Página intermedia /herramientas/facturacion — legacy.
 *
 * 2026-05-25: Orlando pidió que el menú admin "Invoicing" abra DIRECTO la
 * PWA (impulsa-invoicing.vercel.app) sin pasar por esta página intermedia.
 * Los links en HeaderAdminTools, Navigation y ToolsSection ya apuntan al
 * URL externo con target="_blank". Esta página queda solo como fallback
 * por si alguien tiene un bookmark del URL antiguo: valida admin y
 * redirige al URL externo automáticamente.
 */
export default function FacturacionPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (authLoading) return
    if (!isAdminEmail(user?.email)) {
      router.replace('/unauthorized')
      return
    }
    // Admin verificado → abrir la PWA en nueva pestaña y volver al hub
    // de herramientas. Esto evita dejar al usuario en una página vacía.
    window.open(LINKS.invoicingApp, '_blank', 'noopener,noreferrer')
    router.replace('/herramientas')
  }, [user, authLoading, router])

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-slate-400">
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 animate-spin text-[#00BCD4]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <span>Abriendo Invoicing…</span>
      </div>
    </div>
  )
}
