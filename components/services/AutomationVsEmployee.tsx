import { Users, Bot, TrendingUp } from 'lucide-react'

export type ComparisonRow = {
  product: string
  productPrice: string
  humanRole: string
  nycMonthly: number
  hoursSaved: number
  roiNote?: string
}

export type AutomationVsEmployeeProps = {
  vertical: 'operaciones' | 'marketing' | 'finanzas'
  headline: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  ctaTarget?: '_blank' | '_self'
  rows: ComparisonRow[]
  accent?: 'green' | 'purple' | 'navy'
}

const ACCENT = {
  green:  { brand: 'text-green-700',  ring: 'border-green-500',  btn: 'bg-green-600 hover:bg-green-700',   chipBg: 'bg-green-100 text-green-800',   gradHeader: 'from-green-900 to-emerald-700' },
  purple: { brand: 'text-purple-700', ring: 'border-purple-500', btn: 'bg-purple-600 hover:bg-purple-700', chipBg: 'bg-purple-100 text-purple-800', gradHeader: 'from-purple-900 to-indigo-700' },
  navy:   { brand: 'text-[#0a0e1a]',  ring: 'border-cyan-500',   btn: 'bg-[#0a0e1a] hover:bg-[#1a1f3a]',   chipBg: 'bg-cyan-100 text-cyan-900',     gradHeader: 'from-[#0a0e1a] to-[#1a2a5e]' },
}

const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

export default function AutomationVsEmployee({
  headline, subtitle, ctaLabel, ctaHref, ctaTarget, rows, accent = 'navy',
}: AutomationVsEmployeeProps) {
  const c = ACCENT[accent]
  const isExternal = ctaTarget === '_blank'

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${c.chipBg} text-sm font-semibold mb-4`}>
              <TrendingUp className="w-4 h-4" /> Comparación real de costos · Nueva York
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{headline}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          <div className="hidden md:block overflow-hidden rounded-2xl shadow-xl border border-slate-200 bg-white">
            <table className="w-full text-left">
              <thead className={`bg-gradient-to-r ${c.gradHeader} text-white text-sm`}>
                <tr>
                  <th className="px-5 py-4 font-semibold">Producto Impulsa Lab</th>
                  <th className="px-5 py-4 font-semibold">Rol humano equivalente</th>
                  <th className="px-5 py-4 font-semibold text-right">Empleado NYC (mes)</th>
                  <th className="px-5 py-4 font-semibold text-right">Impulsa Lab (mes)</th>
                  <th className="px-5 py-4 font-semibold text-right">Ahorro</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {rows.map((r, i) => (
                  <tr key={i} className={`border-t border-slate-100 ${i % 2 ? 'bg-slate-50/50' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        <Bot className={`w-5 h-5 mt-0.5 flex-shrink-0 ${c.brand}`} />
                        <div>
                          <div className="font-semibold text-gray-900">{r.product}</div>
                          <div className="text-xs text-gray-500">{r.productPrice} · ~{r.hoursSaved}h/mes ahorradas</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      <div className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> {r.humanRole}</div>
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-gray-900 font-semibold">{fmt(r.nycMonthly)}</td>
                    <td className={`px-5 py-4 text-right font-mono font-bold ${c.brand}`}>{r.productPrice.split('/')[0]}</td>
                    <td className="px-5 py-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${c.chipBg}`}>
                        {r.roiNote ?? 'alto'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {rows.map((r, i) => (
              <div key={i} className={`rounded-2xl border-2 ${c.ring} bg-white p-5 shadow-md`}>
                <div className="flex items-start gap-2 mb-3">
                  <Bot className={`w-5 h-5 mt-0.5 ${c.brand}`} />
                  <div>
                    <div className="font-bold text-gray-900">{r.product}</div>
                    <div className="text-xs text-gray-500">{r.humanRole}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="text-xs text-red-600 font-semibold mb-1">Empleado NYC/mes</div>
                    <div className="font-mono font-bold text-gray-900">{fmt(r.nycMonthly)}</div>
                  </div>
                  <div className={`rounded-lg p-3 ${c.chipBg}`}>
                    <div className="text-xs font-semibold mb-1">Impulsa Lab</div>
                    <div className={`font-mono font-bold ${c.brand}`}>{r.productPrice.split('/')[0]}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Ahorra ~{r.hoursSaved}h/mes · ROI {r.roiNote ?? 'alto'}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={ctaHref}
              target={ctaTarget}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-semibold shadow-xl hover:scale-105 transition-transform ${c.btn}`}
            >
              {ctaLabel} →
            </a>
          </div>

          <p className="mt-8 text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed text-center">
            <strong>Fuente:</strong> U.S. Bureau of Labor Statistics. (2024). <em>Occupational Employment and Wage Statistics: New York-Newark-Jersey City, NY-NJ-PA</em> (May 2023 estimates) [Data set].{' '}
            <a href="https://www.bls.gov/oes/2023/may/oes_35620.htm" className="underline">bls.gov/oes/2023/may/oes_35620.htm</a>. Consultado 2026-04-19. Load-in +30% benefits (BLS ECEC, marzo 2024).
          </p>

        </div>
      </div>
    </section>
  )
}
