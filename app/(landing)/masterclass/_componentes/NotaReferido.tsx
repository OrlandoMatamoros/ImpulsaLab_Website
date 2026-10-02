'use client'

import { useEffect, useState } from 'react'
import { evento, guardarRef, nombreVendedor, refActual, refDeLaUrl } from './referido'

/**
 * Guarda el código del vendedor que venía en el enlace, registra la visita (par VER/ACTUAR
 * con `taller_reservar`) y, si alguien lo recomendó, se lo dice al visitante.
 */
export default function NotaReferido({ className = '' }: { className?: string }) {
  const [nombre, setNombre] = useState<string | null>(null)

  useEffect(() => {
    const deUrl = refDeLaUrl()
    if (deUrl) guardarRef(deUrl)
    const ref = refActual()
    setNombre(nombreVendedor(ref))
    evento('taller_ver', { ref: ref ?? 'ninguno' })
  }, [])

  if (!nombre) return null
  return (
    <p className={className}>
      Te invitó <strong className="font-extrabold text-white">{nombre}</strong>.
    </p>
  )
}
