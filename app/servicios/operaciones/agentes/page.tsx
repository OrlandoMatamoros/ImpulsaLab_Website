'use client'

import Link from 'next/link'
import { ArrowLeft, Bot, MessageSquare, Database, Bell, Code, Users, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const exampleIcons = [MessageSquare, Database, Bell]
const toolIcons = [Code, Users, Sparkles]

export default function AgentesPage() {
  const { t } = useLanguage()
  const tp = t.operacionesAgentesPage

  const whatsappUrl = `https://wa.me/13479043169?text=${encodeURIComponent(tp.ctaWhatsappMessage)}`

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/servicios" className="text-gray-500 hover:text-gray-700">
              {tp.breadcrumbServicios}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/servicios/operaciones" className="text-gray-500 hover:text-gray-700">
              {tp.breadcrumbOperaciones}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 font-semibold">{tp.breadcrumbAgente}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Bot className="w-5 h-5" />
              <span>{tp.heroBadge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {tp.heroTitle}
            </h1>
            <p className="text-xl text-blue-200">
              {tp.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* What is an AI Agent */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {tp.sectionWhatTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {tp.sectionWhatDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {tp.examples.map((example: { title: string; description: string }, index: number) => {
                const Icon = exampleIcons[index] || MessageSquare
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {example.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tools We Use */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {tp.sectionToolsTitle}
            </h2>
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tool.name}
                    </h3>
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {tp.ctaTitle}
            </h2>
            <p className="text-lg text-blue-200 mb-8">
              {tp.ctaDesc}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-xl"
            >
              <MessageSquare className="w-5 h-5" />
              {tp.ctaButton}
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link
              href="/servicios/operaciones"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              {tp.navBack}
            </Link>
            <Link
              href="/servicios/operaciones/arsenal"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {tp.navNext} →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
