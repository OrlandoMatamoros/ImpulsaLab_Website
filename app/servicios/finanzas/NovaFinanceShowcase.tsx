// app/servicios/finanzas/NovaFinanceShowcase.tsx
import { ExternalLink, TrendingUp, Brain, Bell, Play } from 'lucide-react';

export function NovaFinanceShowcase() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Badge de NUEVO */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            <span className="animate-pulse mr-2">✨</span>
            NUEVO: Ya Disponible en Beta
          </span>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Nova Finance: Tu CFO Virtual con IA
          </h2>
          <p className="text-xl text-gray-600">
            Dashboard financiero en tiempo real que analiza, predice y optimiza
            las finanzas de tu negocio automáticamente
          </p>
        </div>

        {/* Live Demo Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-12 max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-t-lg p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-gray-400 text-sm">nova.tuimpulsalab.com</span>
            </div>
          </div>

          <a
            href="https://nova.tuimpulsalab.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Nova Finance en una nueva pestaña"
            className="group block aspect-video rounded-b-lg relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 hover:shadow-2xl transition-shadow"
          >
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium mb-4">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Demo en vivo · Requiere cuenta
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                nova.tuimpulsalab.com
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-6 max-w-md">
                Dashboard financiero en tiempo real. Abre el CFO virtual de Impulsa Lab en una pestaña nueva para explorarlo.
              </p>
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold group-hover:scale-105 transition-transform shadow-xl">
                <Play className="w-4 h-4" />
                Abrir Nova Finance
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Análisis Predictivo</h3>
            <p className="text-gray-600 text-sm">
              IA que anticipa tendencias y te alerta antes de problemas
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Decisiones Inteligentes</h3>
            <p className="text-gray-600 text-sm">Simulador What-If y optimización automática</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Alertas Proactivas</h3>
            <p className="text-gray-600 text-sm">WhatsApp y email cuando algo requiere tu atención</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <a
            href="https://nova.tuimpulsalab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
            aria-label="Explorar Nova Finance (se abre en una nueva pestaña)"
          >
            <Play className="mr-2" />
            Explorar Nova Finance
            <ExternalLink className="ml-2 w-4 h-4" />
          </a>

          <p className="text-sm text-gray-600">
            ✅ Demo funcional • 14 días gratis • Sin tarjeta de crédito
          </p>
        </div>
      </div>
    </section>
  );
}
