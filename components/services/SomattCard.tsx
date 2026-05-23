'use client'

import { ArrowRight, Target, GitBranch, Package, Compass } from 'lucide-react'

/**
 * Tarjeta destacada que enlaza a SOMATT (plataforma self-serve, marca aparte).
 * Respeta la identidad SOMATT (paleta dark/teal/blue) — NO mezcla con la
 * paleta Impulsa. Marca el límite: Impulsa = done-for-you, SOMATT = self-serve
 * con HERRAMIENTAS específicas que Impulsa Finanzas NO ofrece (scenario builder,
 * pricing helper, stock advisor).
 */
export default function SomattCard() {
  const tools = [
    {
      icon: Target,
      name: 'Pricing Helper',
      desc: 'Calcula precios óptimos por producto considerando margen, demanda y competencia. Decisiones de precio sin "ojo de buen cubero".',
    },
    {
      icon: GitBranch,
      name: 'Scenario Builder',
      desc: 'Simula "¿qué pasa si subo 10% mis precios?" o "¿y si abro otra sucursal?" antes de mover un solo peso.',
    },
    {
      icon: Package,
      name: 'Stock Advisor',
      desc: 'Te dice cuándo comprar y cuánto. Sin sobre-stock que te mata el flujo de caja, sin quiebres que te hacen perder ventas.',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#102a4c] to-[#0B1F3A] text-white p-8 md:p-12 shadow-2xl border border-[#1FB6A6]/30">
            {/* Glows ambientales SOMATT */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1FB6A6] rounded-full opacity-20 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2D7FF9] rounded-full opacity-20 blur-3xl pointer-events-none" aria-hidden />

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6 border border-white/15">
                  <Compass className="w-4 h-4 text-[#5FE3D0]" />
                  <span className="text-sm font-medium text-[#5FE3D0] tracking-wide">SOMATT · Plataforma self-serve</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  ¿Quieres decidir tú mismo,<br className="hidden md:block" /> con herramientas hechas para PYMEs?
                </h2>
                <p className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
                  Mientras Impulsa Finanzas construye <span className="font-semibold text-white">tu</span> dashboard a medida (done-for-you),
                  <span className="font-semibold text-white"> SOMATT</span> es una plataforma con herramientas específicas
                  para que tú simules, optimices y decidas sin esperar a nadie.
                </p>
              </div>

              {/* 3 herramientas */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <div
                      key={tool.name}
                      className="bg-white/[0.06] backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-[#1FB6A6]/40 hover:bg-white/[0.08] transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1FB6A6]/30 to-[#2D7FF9]/30 flex items-center justify-center mb-4 border border-[#1FB6A6]/20">
                        <Icon className="w-6 h-6 text-[#5FE3D0]" />
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2">{tool.name}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{tool.desc}</p>
                    </div>
                  )
                })}
              </div>

              {/* Frontera clara */}
              <div className="bg-white/[0.04] backdrop-blur rounded-xl p-5 border border-white/10 mb-8">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 px-2.5 py-1 rounded-md bg-[#2D7FF9]/20 text-[#7FB4FF] font-semibold text-xs">Impulsa Finanzas</span>
                    <span className="text-slate-300">Te lo hacemos a la medida — dashboard custom + asesoría mensual.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 px-2.5 py-1 rounded-md bg-[#1FB6A6]/20 text-[#5FE3D0] font-semibold text-xs">SOMATT</span>
                    <span className="text-slate-300">Te damos las herramientas — tú decides cuándo y qué simular.</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center italic">Son complementarios, no competencia.</p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <a
                  href="https://somatt.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1FB6A6] hover:bg-[#17a394] text-[#0B1F3A] px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[#1FB6A6]/20"
                >
                  Probar SOMATT
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-xs text-slate-400 mt-3">Acceso gratis para explorar las herramientas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
