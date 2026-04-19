import { Store, FileSpreadsheet, CircleCheck, Sparkles } from 'lucide-react'

type IntegrationStatus = 'listo' | 'custom'
type IntegrationKind = 'pos' | 'contable' | 'payments'

type Integration = {
  name: string
  kind: IntegrationKind
  market: string
  status: IntegrationStatus
}

const POS: Integration[] = [
  { name: 'Square',         kind: 'pos',      market: 'USA + 7 países',      status: 'listo' },
  { name: 'Shopify',        kind: 'pos',      market: 'USA + LatAm',         status: 'listo' },
  { name: 'Clover',         kind: 'pos',      market: 'USA',                 status: 'listo' },
  { name: 'Toast',          kind: 'pos',      market: 'USA · restaurantes',  status: 'listo' },
  { name: 'Lightspeed',     kind: 'pos',      market: 'USA + LatAm parcial', status: 'listo' },
  { name: 'Loyverse',       kind: 'pos',      market: 'Global · LatAm',      status: 'listo' },
  { name: 'Revel',          kind: 'pos',      market: 'USA',                 status: 'custom' },
  { name: 'Aldelo Express', kind: 'pos',      market: 'USA · hispano',       status: 'custom' },
]

const CONTABLE: Integration[] = [
  { name: 'QuickBooks Online', kind: 'contable', market: 'USA + LatAm parcial', status: 'listo' },
  { name: 'Stripe',            kind: 'payments', market: 'Global',              status: 'listo' },
  { name: 'Alegra',            kind: 'contable', market: 'CO · MX · PE · CL + 9', status: 'listo' },
  { name: 'Siigo',             kind: 'contable', market: 'Colombia',            status: 'listo' },
  { name: 'Nubox',             kind: 'contable', market: 'Chile',               status: 'custom' },
  { name: 'Contpaqi',          kind: 'contable', market: 'México · CFDI',       status: 'custom' },
]

function IntegrationCard({ item }: { item: Integration }) {
  const Icon = item.kind === 'pos' ? Store : FileSpreadsheet
  const statusChip = item.status === 'listo'
    ? { bg: 'bg-green-100', text: 'text-green-800', icon: CircleCheck, label: 'Integración lista' }
    : { bg: 'bg-amber-100', text: 'text-amber-800', icon: Sparkles,    label: 'Custom' }
  const Chip = statusChip.icon

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:border-cyan-500 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-2">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 transition-colors" />
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusChip.bg} ${statusChip.text}`}>
          <Chip className="w-3 h-3" /> {statusChip.label}
        </span>
      </div>
      <div className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</div>
      <div className="text-xs text-gray-500 mt-1">{item.market}</div>
    </div>
  )
}

export default function IntegrationsShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-900 text-sm font-semibold mb-4">
              <CircleCheck className="w-4 h-4" /> Conectamos con tu sistema actual
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              ¿Ya usas alguno de estos? Hablamos tu idioma.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              14 plataformas con las que Impulsa Lab integra directo. Si usas una (o varias), la conectamos a tu dashboard financiero sin migrar nada. Si no la ves acá, la cotizamos custom.
            </p>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 text-gray-700">
                <Store className="w-5 h-5" />
                <h3 className="font-semibold text-lg">POS y ventas</h3>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {POS.map((item) => (
                <IntegrationCard key={item.name} item={item} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 text-gray-700">
                <FileSpreadsheet className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Contabilidad y facturación</h3>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CONTABLE.map((item) => (
                <IntegrationCard key={item.name} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-gradient-to-r from-slate-50 to-cyan-50 border border-cyan-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">¿Usas algo que no está acá?</h4>
                <p className="text-gray-600 text-sm">Si tu sistema tiene API (la mayoría la tienen), la conectamos. Cotización custom sin sorpresas.</p>
              </div>
              <a
                href="https://wa.me/13474509281"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#002D62] hover:bg-[#003d82] text-white rounded-lg font-semibold transition-all whitespace-nowrap"
              >
                Pregúntanos por WhatsApp →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
