'use client'

import { Bot, MessageSquare, Database, Bell, Code, Users, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const exampleIcons = [MessageSquare, Database, Bell]
const toolIcons = [Code, Users, Sparkles]

/**
 * Seccion "Agentes de IA" — antes /servicios/operaciones/agentes.
 * Consolidada en /servicios/operaciones#agentes (2026-07-29).
 */
export default function AgentesSection() {
  const { t } = useLanguage()
  const tp = t.operacionesAgentesPage

  return (
    <section id="agentes" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
              <Bot className="w-5 h-5" />
              <span className="font-medium">{tp.heroBadge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tp.heroTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tp.heroSubtitle}
            </p>
          </div>

          {/* Que es un agente de IA */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {tp.sectionWhatTitle}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {tp.sectionWhatDesc}
            </p>
          </div>

          {/* Ejemplos */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {tp.examples.map((example: { title: string; description: string }, index: number) => {
              const Icon = exampleIcons[index] || MessageSquare
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {example.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {example.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Herramientas que usamos */}
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">
            {tp.sectionToolsTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {tp.tools.map((tool: { name: string; description: string }, index: number) => {
              const Icon = toolIcons[index] || Code
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
