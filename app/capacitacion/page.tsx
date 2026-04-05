'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  Clock, 
  DollarSign, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  Brain,
  MapPin,
  Video,
  Award,
  Calendar,
  MessageSquare,
  Building2,
  Rocket
} from 'lucide-react'

export default function ImpulsaAcademyPage() {
  const { t } = useLanguage()
  const [selectedProgram, setSelectedProgram] = useState<'mentoria' | 'teams' | null>(null)

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.capacitacionPage.heroTitulo1}<br />{t.capacitacionPage.heroTitulo2}
            </h1>

            <p className="text-3xl md:text-4xl font-bold text-emerald-400 mb-8">
              {t.capacitacionPage.heroAccent}
            </p>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.capacitacionPage.heroDesc} <span className="font-bold text-white">{t.capacitacionPage.heroDescBold}</span> {t.capacitacionPage.heroDesc2}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-emerald-400 mb-2">2-12h</div>
                <div className="text-sm text-blue-100">{t.capacitacionPage.statDuracion}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-emerald-400 mb-2">100%</div>
                <div className="text-sm text-blue-100">{t.capacitacionPage.statPractico}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-emerald-400 mb-2">NYC</div>
                <div className="text-sm text-blue-100">{t.capacitacionPage.statPresencial}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-emerald-400 mb-2">5+</div>
                <div className="text-sm text-blue-100">{t.capacitacionPage.statModulos}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#programas"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                {t.capacitacionPage.verProgramas}
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/#contacto"
                className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                {t.capacitacionPage.consultaGratuita}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Formato Presencial */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {`📍 ${t.capacitacionPage.enTuEspacio}`}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {t.capacitacionPage.presencialDesc} <span className="font-bold text-blue-600">{t.capacitacionPage.presencialBold}</span> {t.capacitacionPage.presencialPara}
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    {t.capacitacionPage.presencialItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-900">{t.capacitacionPage.cobertura}</span>
                      <span className="text-gray-600">{t.capacitacionPage.coberturaZonas}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Video className="w-4 h-4" />
                      <span><span className="font-semibold">{t.capacitacionPage.alternativaRemota}</span> {t.capacitacionPage.alternativaDesc}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparación de Programas */}
      <section id="programas" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.capacitacionPage.eligeCamino}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.capacitacionPage.eligeDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mentoría 1-a-1 Card */}
            <div 
              className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-2xl border-4 transition-all duration-300 overflow-hidden ${
                selectedProgram === 'mentoria' 
                  ? 'border-emerald-500 scale-105' 
                  : 'border-transparent hover:border-emerald-200 hover:scale-102'
              }`}
              onMouseEnter={() => setSelectedProgram('mentoria')}
              onMouseLeave={() => setSelectedProgram(null)}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <UserCheck className="w-12 h-12" />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    {t.capacitacionPage.individual}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">{t.capacitacionPage.mentoria1a1}</h3>
                <p className="text-emerald-50 mb-4">
                  {t.capacitacionPage.mentoriaDesc}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-emerald-200">{t.capacitacionPage.desde}</span>
                  <span className="text-5xl font-bold">$200</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Tiers */}
                <div className="space-y-4 mb-8">
                  <div className="bg-white rounded-xl p-4 border-2 border-emerald-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">BASIC</span>
                      <span className="text-2xl font-bold text-emerald-600">$200</span>
                    </div>
                    <div className="text-sm text-gray-600">{t.capacitacionPage.basicHoras}</div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border-2 border-emerald-300 relative">
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                      {t.capacitacionPage.popular}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">STANDARD</span>
                      <span className="text-2xl font-bold text-emerald-600">$349</span>
                    </div>
                    <div className="text-sm text-gray-600">{t.capacitacionPage.standardHoras}</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">PREMIUM</span>
                      <span className="text-2xl font-bold text-amber-600">$899</span>
                    </div>
                    <div className="text-sm text-gray-600">{t.capacitacionPage.premiumHoras}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.capacitacionPage.gptsPersonalizados}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.capacitacionPage.casosEstrategicos}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.capacitacionPage.blueprintAuto}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/capacitacion/mentoria-personalizada"
                  className="block w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-center hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t.capacitacionPage.verDetalles}
                </Link>
              </div>
            </div>

            {/* Impulsa Teams Card */}
            <div 
              className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl border-4 transition-all duration-300 overflow-hidden ${
                selectedProgram === 'teams' 
                  ? 'border-blue-500 scale-105' 
                  : 'border-transparent hover:border-blue-200 hover:scale-102'
              }`}
              onMouseEnter={() => setSelectedProgram('teams')}
              onMouseLeave={() => setSelectedProgram(null)}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-12 h-12" />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    {t.capacitacionPage.hasta5}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">{t.capacitacionPage.impulsaTeams}</h3>
                <p className="text-blue-50 mb-4">
                  {t.capacitacionPage.teamsDesc}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-blue-200">{t.capacitacionPage.desde}</span>
                  <span className="text-5xl font-bold">$400</span>
                </div>
                <div className="text-sm text-blue-100 mt-2">
                  {t.capacitacionPage.porPersona}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Tiers */}
                <div className="space-y-4 mb-8">
                  <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">WORKSHOP</span>
                      <span className="text-2xl font-bold text-blue-600">$400</span>
                    </div>
                    <div className="text-sm text-gray-600">{t.capacitacionPage.workshopHoras}</div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border-2 border-blue-300 relative">
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                      {t.capacitacionPage.popular}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">STANDARD</span>
                      <span className="text-2xl font-bold text-blue-600">$749</span>
                    </div>
                    <div className="text-sm text-gray-600">{t.capacitacionPage.standardTeamHoras}</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">PREMIUM</span>
                      <span className="text-2xl font-bold text-amber-600">$2,099</span>
                    </div>
                    <div className="text-sm text-gray-600">{t.capacitacionPage.premiumTeamHoras}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.capacitacionPage.setupColaborativo}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.capacitacionPage.casosImplementados}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.capacitacionPage.certificadosPremium}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/capacitacion/equipos-empresariales"
                  className="block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-center hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t.capacitacionPage.verDetalles}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué obtienes en cada nivel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Qué obtienes en cada nivel?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tres niveles diseñados para llevarte de principiante a experto en AI aplicada a tu negocio.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {/* Supervivencia - Fundamentos */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">Supervivencia</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Fundamentos AI</h3>
                <p className="text-gray-600 text-sm mb-4">Para dueños de negocio que quieren entender y usar AI desde cero</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">Desde $200 / $400</div>
                <div className="text-sm text-gray-500 mb-6">Individual / Equipo (por persona)</div>
                <h4 className="font-semibold text-gray-800 mb-3">Al terminar podrás:</h4>
                <div className="space-y-2 mb-8">
                  {['Usar ChatGPT/Claude para tareas diarias del negocio', 'Crear prompts efectivos para emails, propuestas y contenido', 'Identificar 3+ procesos automatizables en tu operación', 'Entender qué herramientas AI necesitas (y cuáles no)', 'Tener un plan de acción personalizado de 30 días'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/capacitacion/mentoria-personalizada" className="block w-full text-center py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold">Empezar desde Cero</Link>
              </div>
              {/* Crecimiento - AI en Acción */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-xl border-2 border-emerald-500 p-8 relative hover:shadow-2xl transition-all duration-300 transform scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2"><span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">MÁS POPULAR</span></div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">Crecimiento</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI en Acción</h3>
                <p className="text-gray-600 text-sm mb-4">Para equipos listos para implementar AI en sus procesos</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">Desde $349 / $749</div>
                <div className="text-sm text-gray-500 mb-6">Individual / Equipo (por persona)</div>
                <h4 className="font-semibold text-gray-800 mb-3">Al terminar podrás:</h4>
                <div className="space-y-2 mb-8">
                  {['Construir GPTs personalizados para tu negocio', 'Implementar workflows de automatización reales', 'Usar AI para análisis financiero y reportes', 'Crear contenido de marketing con AI (texto, imagen, video)', 'Tener 2-3 automatizaciones funcionando en producción', 'Blueprint de automatización para escalar'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/capacitacion/mentoria-personalizada" className="block w-full text-center py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold">Agenda tu Sesión</Link>
              </div>
              {/* Expansión - Transformación AI */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">Expansión</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Transformación AI</h3>
                <p className="text-gray-600 text-sm mb-4">Para empresas que quieren transformar toda su operación con AI</p>
                <div className="text-3xl font-bold text-gray-900 mb-1">Desde $899 / $2,099</div>
                <div className="text-sm text-gray-500 mb-6">Individual / Equipo (por persona)</div>
                <h4 className="font-semibold text-gray-800 mb-3">Al terminar podrás:</h4>
                <div className="space-y-2 mb-8">
                  {['Diseñar la estrategia AI completa de tu empresa', 'Implementar AI Agents con base de conocimiento propia', 'Integrar AI en finanzas, operaciones y marketing', 'Medir ROI de cada implementación AI', 'Certificado Premium de Impulsa Academy', 'Roadmap de transformación digital a 12 meses'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/capacitacion/equipos-empresariales" className="block w-full text-center py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold">Solicitar Propuesta</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué funciona */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t.capacitacionPage.porQueFunciona}
              </h2>
              <p className="text-xl text-gray-600">
                {t.capacitacionPage.porQueDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t.capacitacionPage.finanzasTitulo,
                  subtitle: t.capacitacionPage.finanzasSubtitulo,
                  description: t.capacitacionPage.finanzasDesc,
                  icon: TrendingUp,
                  color: 'emerald'
                },
                {
                  title: t.capacitacionPage.operacionesTitulo,
                  subtitle: t.capacitacionPage.operacionesSubtitulo,
                  description: t.capacitacionPage.operacionesDesc,
                  icon: Zap,
                  color: 'blue'
                },
                {
                  title: t.capacitacionPage.marketingTitulo,
                  subtitle: t.capacitacionPage.marketingSubtitulo,
                  description: t.capacitacionPage.marketingDesc,
                  icon: Sparkles,
                  color: 'purple'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300">
                  <div className={`inline-flex p-4 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-2xl mb-6`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-lg font-semibold text-emerald-600 mb-4">{item.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GraduationCap className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.capacitacionPage.ctaTitulo}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t.capacitacionPage.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {t.capacitacionPage.consultaGratuita15}
              </Link>
              <a
                href="https://wa.me/19295007815"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                {t.capacitacionPage.hablarWhatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
