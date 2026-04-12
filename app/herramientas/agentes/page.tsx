'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Brain, Zap, ArrowRight, TrendingUp } from 'lucide-react'
import ContentStrategistChat from '@/components/services/marketing/ContentStrategistChat'
import UnifiedAgentWidget from '@/components/operations/UnifiedAgentWidget'
import { useLanguage } from '@/contexts/LanguageContext'

type AgentType = 'content' | 'unified' | 'prompt' | 'news'

interface AgentUsage {
  [key: string]: {
    count: number
    lastReset: string
  }
}

const DAILY_LIMIT = 3

export default function AgentesPlayground() {
  const { t } = useLanguage()
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null)
  const [usage, setUsage] = useState<AgentUsage>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('agent-usage')
    if (stored) {
      const parsed = JSON.parse(stored)
      const today = new Date().toDateString()
      const updated: AgentUsage = {}

      Object.keys(parsed).forEach(key => {
        if (parsed[key].lastReset !== today) {
          updated[key] = { count: 0, lastReset: today }
        } else {
          updated[key] = parsed[key]
        }
      })

      setUsage(updated)
      localStorage.setItem('agent-usage', JSON.stringify(updated))
    }
  }, [])

  const checkUsage = (agentType: AgentType): boolean => {
    const today = new Date().toDateString()
    const agentUsage = usage[agentType] || { count: 0, lastReset: today }

    if (agentUsage.lastReset !== today) {
      return true
    }

    return agentUsage.count < DAILY_LIMIT
  }

  const incrementUsage = (agentType: AgentType) => {
    const today = new Date().toDateString()
    const newUsage = { ...usage }

    if (!newUsage[agentType] || newUsage[agentType].lastReset !== today) {
      newUsage[agentType] = { count: 1, lastReset: today }
    } else {
      newUsage[agentType].count += 1
    }

    setUsage(newUsage)
    localStorage.setItem('agent-usage', JSON.stringify(newUsage))
  }

  const handleAgentClick = (agentType: AgentType) => {
    if (checkUsage(agentType)) {
      setSelectedAgent(agentType)
      setIsModalOpen(true)
      incrementUsage(agentType)
    } else {
      alert(t.herramientasAgentesPage.limiteAlcanzado)
    }
  }

  const translatedAgents = t.herramientasAgentesPage.agents

  const agents = [
    {
      id: 'content' as AgentType,
      title: translatedAgents[0].title,
      subtitle: translatedAgents[0].subtitle,
      description: translatedAgents[0].description,
      icon: <Sparkles className="w-6 h-6" />,
      isEmbedded: true,
    },
    {
      id: 'unified' as AgentType,
      title: translatedAgents[1].title,
      subtitle: translatedAgents[1].subtitle,
      description: translatedAgents[1].description,
      icon: <Brain className="w-6 h-6" />,
      isEmbedded: true,
    },
    {
      id: 'prompt' as AgentType,
      title: translatedAgents[2].title,
      subtitle: translatedAgents[2].subtitle,
      description: translatedAgents[2].description,
      icon: <Zap className="w-6 h-6" />,
      link: '/herramientas/prompt-designer',
    },
    {
      id: 'news' as AgentType,
      title: translatedAgents[3].title,
      subtitle: translatedAgents[3].subtitle,
      description: translatedAgents[3].description,
      icon: <TrendingUp className="w-6 h-6" />,
      link: '/herramientas/noticias',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-[#00BCD4] rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-8 right-20 w-72 h-72 bg-[#00BCD4] rounded-full filter blur-3xl opacity-60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00BCD4]/10 backdrop-blur-sm border border-[#00BCD4]/30 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#00BCD4] opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BCD4]"></span>
              </span>
              <span className="text-sm font-medium text-[#00BCD4]">
                {t.herramientasAgentesPage.playgroundActive} &middot; {t.herramientasAgentesPage.pruebaSinRegistro}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {t.herramientasAgentesPage.heroTitle}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00BCD4] to-white">
                {t.herramientasAgentesPage.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              {t.herramientasAgentesPage.heroDescription}{' '}
              <span className="font-bold text-white">{t.herramientasAgentesPage.heroDescriptionBold}</span>{' '}
              {t.herramientasAgentesPage.heroDescriptionSuffix}
              <span className="block mt-2 text-lg text-[#00BCD4]">
                {t.herramientasAgentesPage.heroDescriptionCTA}
              </span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { v: '4', l: t.herramientasAgentesPage.agentesActivos },
                { v: '24/7', l: t.herramientasAgentesPage.disponibilidad },
                { v: '3', l: t.herramientasAgentesPage.usosGratis },
                { v: '$0', l: t.herramientasAgentesPage.sinTarjeta },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/5 backdrop-blur-sm border border-[#00BCD4]/20 rounded-lg p-4"
                >
                  <div className="text-3xl font-bold text-[#00BCD4]">{s.v}</div>
                  <div className="text-white/70 text-sm">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es un Agente de IA? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t.herramientasAgentesPage.especialistaTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: Brain, title: t.herramientasAgentesPage.cerebroTitle, desc: t.herramientasAgentesPage.cerebroDesc },
              { Icon: Zap, title: t.herramientasAgentesPage.conectadoTitle, desc: t.herramientasAgentesPage.conectadoDesc },
              { Icon: TrendingUp, title: t.herramientasAgentesPage.aprendeTitle, desc: t.herramientasAgentesPage.aprendeDesc },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-20 h-20 bg-[#00BCD4]/10 border border-[#00BCD4]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-10 h-10 text-[#002D62]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
                <p className="text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Playground */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.herramientasAgentesPage.playgroundTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.herramientasAgentesPage.playgroundSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {agents.map((agent) => {
              const usageData = usage[agent.id] || { count: 0, lastReset: new Date().toDateString() }
              const remainingUses = DAILY_LIMIT - usageData.count

              const cardClass =
                'block relative border border-slate-200 bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#00BCD4] group no-underline cursor-pointer'

              const iconBox = (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#002D62] to-[#00BCD4] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {agent.icon}
                </div>
              )

              const cardHeader = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">{agent.title}</h3>
                      <p className="text-lg text-[#00BCD4] font-semibold">{agent.subtitle}</p>
                    </div>
                    {iconBox}
                  </div>
                  <p className="text-slate-600 mb-4">{agent.description}</p>
                </>
              )

              return agent.link ? (
                <a key={agent.id} href={agent.link} className={cardClass}>
                  {cardHeader}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      {t.herramientasAgentesPage.clickParaAbrir}
                    </span>
                    <span className="flex items-center gap-2 text-[#002D62] font-semibold group-hover:text-[#00BCD4] transition-colors">
                      {t.herramientasAgentesPage.probarAhora}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              ) : (
                <div
                  key={agent.id}
                  onClick={() => handleAgentClick(agent.id)}
                  className={cardClass}
                >
                  {cardHeader}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(DAILY_LIMIT)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < remainingUses ? 'bg-[#00BCD4]' : 'bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-500">
                        {remainingUses} {t.herramientasAgentesPage.usosRestantesHoy}
                      </span>
                    </div>
                    <span className="flex items-center gap-2 text-[#002D62] font-semibold group-hover:text-[#00BCD4] transition-colors">
                      {t.herramientasAgentesPage.probarAhora}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal para Agentes Embebidos */}
      {isModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 overflow-y-auto max-h-[90vh]">
                {selectedAgent === 'content' && <ContentStrategistChat />}
                {selectedAgent === 'unified' && <UnifiedAgentWidget />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Final */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00BCD4] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t.herramientasAgentesPage.ctaTitle}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {t.herramientasAgentesPage.ctaDescription}
            <span className="text-[#00BCD4] font-bold"> {t.herramientasAgentesPage.ctaPersonalizados}</span>{' '}
            {t.herramientasAgentesPage.ctaDescriptionSuffix}
          </p>

          <a
            href="https://calendly.com/orlando-tuimpulsalab/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00BCD4] text-[#001a3a] rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 hover:scale-105 shadow-xl"
          >
            {t.herramientasAgentesPage.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
