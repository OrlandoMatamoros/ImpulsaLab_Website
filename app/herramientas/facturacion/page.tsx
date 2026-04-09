'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

const INVOICING_APP_URL = 'https://impulsa-invoicing.vercel.app'

export default function FacturacionPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()

  // Admin gate: only orlando@tuimpulsalab.com
  useEffect(() => {
    if (authLoading) return
    if (!user || user.email !== 'orlando@tuimpulsalab.com') {
      router.replace('/unauthorized')
    }
  }, [user, authLoading, router])

  if (authLoading || !user || user.email !== 'orlando@tuimpulsalab.com') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-slate-400">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 animate-spin text-[#00BCD4]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  const facturacionT = t.facturacionPage ?? {
    title: 'Facturacion',
    subtitle: 'Sistema interno de facturacion - Impulsa Lab',
    openInNewTab: 'Abrir en pestana nueva',
  }

  return (
    <div className="bg-slate-950 text-white min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Tool header */}
      <div className="border-b border-slate-800 bg-slate-900/60 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#00BCD4]">
              Impulsa Lab
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {facturacionT.title}
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">{facturacionT.subtitle}</p>
          </div>
          <a
            href={INVOICING_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-white font-medium hover:brightness-110 transition-all text-sm bg-gradient-to-r from-[#002D62] to-[#00BCD4] whitespace-nowrap"
          >
            {facturacionT.openInNewTab} &rarr;
          </a>
        </div>
      </div>

      {/* Embedded invoicing app */}
      <div className="flex-1 bg-white">
        <iframe
          src={INVOICING_APP_URL}
          title="Impulsa Lab Invoicing"
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 10rem)' }}
          allow="clipboard-write"
        />
      </div>
    </div>
  )
}
