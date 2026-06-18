'use client'

import { useEffect, useState } from 'react'

// Pop-up de demostración en vivo — saludo a Priscila.
// Aparece al cargar la home y se auto-oculta a los 5 segundos.
// TEMPORAL: remover este componente y su uso en app/(public)/page.tsx tras la demo.
export default function PriscilaPopup() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
      role="dialog"
      aria-live="polite"
    >
      <div className="mx-4 max-w-md rounded-2xl border border-brand-cyan/40 bg-brand-navy px-10 py-9 text-center shadow-2xl shadow-brand-cyan/20">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-cyan">
          Impulsa Lab
        </p>
        <h2 className="mt-3 text-4xl font-extrabold text-white">
          ¡Hola, Priscila! 👋
        </h2>
        <p className="mt-3 text-base text-gray-300">
          Este saludo lo puso Claude Code en vivo, desde la terminal.
        </p>
        <p className="mt-4 text-xs text-gray-500">
          (Este mensaje desaparece solo en 5 segundos)
        </p>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  )
}
