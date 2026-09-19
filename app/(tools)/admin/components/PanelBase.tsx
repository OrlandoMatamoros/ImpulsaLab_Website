'use client'

// Piezas comunes de las secciones nuevas del panel (Proyectos y CRM):
// - `useApiAdmin`: llama a las rutas /api/admin/* firmando con el ID token.
// - `PantallaAdmin`: marco con identidad Impulsa (navy #002D62 / cyan #00BCD4),
//   botón «Volver» (regla 34) y portero por correo (solo orlando@tuimpulsalab.com).

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { isAdminEmail } from '@/lib/admin-emails'

export function useApiAdmin() {
  const { user } = useAuth()

  return useCallback(
    async function llamar<T = any>(ruta: string, init: RequestInit = {}): Promise<T> {
      if (!user) throw new Error('Sin sesión')
      const token = await user.getIdToken()
      const res = await fetch(ruta, {
        ...init,
        headers: {
          ...(init.headers || {}),
          Authorization: 'Bearer ' + token,
          ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        },
      })
      const datos = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error((datos as any)?.error || 'Error ' + res.status)
      }
      return datos as T
    },
    [user],
  )
}

export function PantallaAdmin({
  titulo,
  bajada,
  acciones,
  children,
}: {
  titulo: string
  bajada?: string
  acciones?: React.ReactNode
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-slate-400">
        <p>Cargando…</p>
      </div>
    )
  }

  if (!isAdminEmail(user?.email)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center">
          <p className="text-lg font-semibold text-white mb-2">Esta sección es privada</p>
          <p className="text-slate-400 text-sm mb-6">
            Solo la cuenta de administración de Impulsa Lab puede ver los proyectos y el CRM.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold btn-metalico-navy"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <button
          onClick={() => router.push('/admin')}
          className="text-sm text-slate-400 hover:text-[#00BCD4] transition-colors mb-5 cursor-pointer"
        >
          ← Volver al panel
        </button>

        <header className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#00BCD4] mb-1">
              Impulsa Lab · Panel interno
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold">{titulo}</h1>
            {bajada && <p className="text-slate-400 text-sm mt-1">{bajada}</p>}
          </div>
          {acciones && <div className="flex flex-wrap gap-2">{acciones}</div>}
        </header>

        {children}
      </div>
    </div>
  )
}

/** Mensaje de error corto y reintento, en vez de dejar la pantalla en blanco. */
export function AvisoError({ error, onReintentar }: { error: string; onReintentar?: () => void }) {
  return (
    <div className="rounded-xl border border-red-900/60 bg-red-950/40 text-red-200 px-4 py-3 text-sm flex items-center justify-between gap-4">
      <span>No se pudo cargar: {error}</span>
      {onReintentar && (
        <button onClick={onReintentar} className="underline hover:text-white cursor-pointer">
          Reintentar
        </button>
      )}
    </div>
  )
}

/** Caja para escribir una nota, con guardado y estado. */
export function CajaNota({
  onGuardar,
  placeholder = 'Escribe una nota…',
}: {
  onGuardar: (texto: string) => Promise<void>
  placeholder?: string
}) {
  const [texto, setTexto] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  async function guardar() {
    const limpio = texto.trim()
    if (!limpio || guardando) return
    setGuardando(true)
    setError('')
    try {
      await onGuardar(limpio)
      setTexto('')
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="mt-3">
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent resize-y"
      />
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={guardar}
          disabled={guardando || !texto.trim()}
          className="px-4 py-2 rounded-xl text-sm font-semibold btn-metalico-cyan cursor-pointer disabled:cursor-not-allowed"
        >
          {guardando ? 'Guardando…' : 'Guardar nota'}
        </button>
        {error && <span className="text-xs text-red-300">{error}</span>}
      </div>
    </div>
  )
}

/** Fecha corta en español, tolerante a valores vacíos. */
export function fechaCorta(iso?: string | null): string {
  if (!iso) return '—'
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return '—'
  return new Date(t).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function fechaHora(iso?: string | null): string {
  if (!iso) return '—'
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return '—'
  return new Date(t).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
