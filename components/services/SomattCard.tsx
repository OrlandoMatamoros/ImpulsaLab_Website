'use client'

import { ArrowRight, Compass } from 'lucide-react'

/**
 * Tarjeta destacada que enlaza a SOMATT (producto self-serve, marca aparte).
 * Respeta la identidad SOMATT (paleta dark/blue/green) — NO mezcla con la
 * paleta Impulsa. Marca el límite: Impulsa = done-for-you, SOMATT = self-serve.
 */
export default function SomattCard() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1F3A] via-[#102a4c] to-[#0B1F3A] text-white p-8 md:p-12 shadow-2xl border border-[#1FB6A6]/30">
            {/* Glow ambiental SOMATT (verde-azulado) */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#1FB6A6] rounded-full opacity-20 blur-3xl" aria-hidden />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-[#2D7FF9] rounded-full opacity-20 blur-3xl" aria-hidden />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6 border border-white/15">
                <Compass className="w-4 h-4 text-[#5FE3D0]" />
                <span className="text-sm font-medium text-[#5FE3D0]">SOMATT · Self-serve</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Prefieres explorarlo tú mismo?
              </h2>
              <p className="text-lg text-slate-200 mb-6 max-w-2xl">
                Conoce <span className="font-semibold text-white">SOMATT</span> — tu copiloto
                financiero self-serve. Scenario Builder, Pricing Helper y Stock Advisor para
                tomar decisiones con tus propios números, a tu ritmo.
              </p>

              <p className="text-sm text-slate-300 mb-8 max-w-2xl">
                Impulsa Lab lo hace por ti (<span className="font-medium text-white">done-for-you</span>);
                SOMATT te da las herramientas para hacerlo tú (<span className="font-medium text-white">self-serve</span>).
              </p>

              <a
                href="https://somatt.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1FB6A6] hover:bg-[#17a394] text-[#0B1F3A] px-8 py-4 rounded-lg font-bold transition-colors shadow-lg"
              >
                Conocer SOMATT
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
