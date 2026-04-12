'use client'

import React, { useState, useEffect } from 'react'
import { Copy, Check, Save, History, Sparkles, Target, FileText, Palette, Shield, Package, ChevronRight, ChevronLeft, X, Trash2, Clock } from 'lucide-react'
import ProtectedSection from '@/components/ProtectedSection'
import { useLanguage } from '@/contexts/LanguageContext'

// Tipos para el formulario
interface FormData {
  objective: string
  context: string
  tone: string
  constraints: string
  output: string
}

// Tipos para los templates
interface PromptTemplate {
  id: string
  name: string
  objective: string
  context: string
  tone: string
  constraints: string
  output: string
}

interface TemplateCategory {
  name: string
  templates: PromptTemplate[]
}

// Tipos para el historial
interface HistoryItem extends FormData {
  prompt: string
  timestamp: string
}

// Step icons (non-translatable config)
const stepIcons = [Target, FileText, Palette, Shield, Package]

// Template icons (non-translatable config)
const templateIconMap: Record<string, string> = {
  marketing: '📱',
  desarrollo: '💻',
  educacion: '🎓',
  negocios: '📈',
}

// Componente para el historial de prompts
const PromptHistory = ({
  history,
  onSelect,
  onDelete,
  onClose,
  labels,
}: {
  history: HistoryItem[],
  onSelect: (item: HistoryItem) => void,
  onDelete: (index: number) => void,
  onClose: () => void,
  labels: { title: string; empty: string },
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{labels.title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{labels.empty}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all cursor-pointer group"
                  onClick={() => onSelect(item)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{item.objective}</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(index)
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.prompt}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.timestamp).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PromptDesigner() {
  const { t } = useLanguage()
  const tp = t.herramientasPromptPage

  const [currentStep, setCurrentStep] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const [promptHistory, setPromptHistory] = useState<HistoryItem[]>([])

  // Estado del formulario
  const [formData, setFormData] = useState({
    objective: '',
    context: '',
    tone: '',
    constraints: '',
    output: ''
  })

  // Cargar historial del localStorage al montar
  useEffect(() => {
    const savedHistory = localStorage.getItem('promptHistory')
    if (savedHistory) {
      setPromptHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Build steps from translations + icons config
  const steps = tp.steps.map((step: { id: string; title: string }, i: number) => ({
    ...step,
    icon: stepIcons[i],
  }))

  // Build template categories from translations + icon config
  const templateCategories = Object.entries(tp.templateCategories as Record<string, TemplateCategory>).map(
    ([key, cat]) => ({
      key,
      icon: templateIconMap[key] || '📁',
      name: cat.name,
      templates: cat.templates,
    })
  )

  // Generar el prompt basado en los datos del formulario con formato estructurado
  const generatePrompt = () => {
    const labels = tp.promptLabels
    const parts = []

    parts.push(`<PROMPT>`)

    if (formData.objective) {
      parts.push(`\n<${labels.objetivo}>
[${formData.objective}]
</${labels.objetivo}>`)
    }

    if (formData.context) {
      parts.push(`\n\n<${labels.contexto}>
{
  ${formData.context.split('\n').join('\n  ')}
}
</${labels.contexto}>`)
    }

    if (formData.tone) {
      parts.push(`\n\n<${labels.parametros}>
- ${labels.tono}: (${formData.tone})
- ${labels.formato}: [${labels.formatoValue}]
- ${labels.audiencia}: [${labels.audienciaValue}]
</${labels.parametros}>`)
    }

    if (formData.constraints) {
      parts.push(`\n\n<${labels.restricciones}>
${formData.constraints.split(',').map((c: string) => `- ${c.trim()}`).join('\n')}
</${labels.restricciones}>`)
    }

    if (formData.output) {
      parts.push(`\n\n<${labels.outputEsperado}>
{
  "${labels.formatoLabel}": "${formData.output}",
  "${labels.estructura}": "${labels.estructuraValue}",
  "${labels.entregables}": [
    ${formData.output.split(',').map((item: string) => `"${item.trim()}"`).join(',\n    ')}
  ]
}
</${labels.outputEsperado}>`)
    }

    parts.push(`\n\n<${labels.instruccionesFinales}>
${labels.instruccion1}
${labels.instruccion2}
${labels.instruccion3}
${labels.instruccion4}
${labels.instruccion5}
</${labels.instruccionesFinales}>`)

    parts.push(`\n</PROMPT>`)

    return parts.join('')
  }

  const handleCopy = async () => {
    const prompt = generatePrompt()
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    const prompt = generatePrompt()
    const newItem = {
      ...formData,
      prompt,
      timestamp: new Date().toISOString()
    }

    const updatedHistory = [newItem, ...promptHistory].slice(0, 20)
    setPromptHistory(updatedHistory)
    localStorage.setItem('promptHistory', JSON.stringify(updatedHistory))

    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTemplateSelect = (template: PromptTemplate) => {
    setFormData({
      objective: template.objective,
      context: template.context,
      tone: template.tone,
      constraints: template.constraints,
      output: template.output
    })
    setSelectedTemplate(template)
    setCurrentStep(0)
  }

  const handleHistorySelect = (item: HistoryItem) => {
    setFormData({
      objective: item.objective || '',
      context: item.context || '',
      tone: item.tone || '',
      constraints: item.constraints || '',
      output: item.output || ''
    })
    setShowHistory(false)
    setCurrentStep(0)
  }

  const handleDeleteHistory = (index: number) => {
    const updatedHistory = promptHistory.filter((_, i) => i !== index)
    setPromptHistory(updatedHistory)
    localStorage.setItem('promptHistory', JSON.stringify(updatedHistory))
  }

  const isStepComplete = (stepId: string) => {
    return formData[stepId as keyof FormData] && formData[stepId as keyof FormData].trim() !== ''
  }

  const completedSteps = steps.filter((step: { id: string }) => isStepComplete(step.id)).length
  const progress = (completedSteps / steps.length) * 100

  // Form step configs for labels/placeholders/tips
  const formSteps = [
    { label: tp.queQuieresLograr, placeholder: tp.objectivePlaceholder, tip: tp.objectiveTip, field: 'objective', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { label: tp.contextoLabel, placeholder: tp.contextoPlaceholder, tip: tp.contextoTip, field: 'context', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
    { label: tp.tonoLabel, placeholder: tp.tonoPlaceholder, tip: tp.tonoTip, field: 'tone', bgColor: 'bg-green-50', textColor: 'text-green-700' },
    { label: tp.restriccionesLabel, placeholder: tp.restriccionesPlaceholder, tip: tp.restriccionesTip, field: 'constraints', bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
    { label: tp.outputLabel, placeholder: tp.outputPlaceholder, tip: tp.outputTip, field: 'output', bgColor: 'bg-pink-50', textColor: 'text-pink-700' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - SIEMPRE VISIBLE */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {tp.titulo}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {tp.subtitulo}
          </p>
        </div>

        {/* CONTENIDO PROTEGIDO - Toda la herramienta interactiva */}
        <ProtectedSection
          message={tp.protectedMessage}
          showPreview={true}
          previewBlur={false}
        >
          {/* Botones de acción superior */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <History className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{tp.historial}</span>
            </button>
          </div>

          {/* Templates Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{tp.templatesPorIndustria}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {templateCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(selectedCategory === cat.key ? null : cat.key)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCategory === cat.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-gray-900">{cat.name}</div>
                </button>
              ))}
            </div>

            {selectedCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                {templateCategories
                  .find((cat) => cat.key === selectedCategory)
                  ?.templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-left"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.objective}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">{tp.progreso}</span>
                  <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Steps Navigation */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step: { id: string; title: string; icon: React.ComponentType<{ className?: string }> }, index: number) => {
                  const Icon = step.icon
                  const isActive = currentStep === index
                  const isComplete = isStepComplete(step.id)

                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      className="flex flex-col items-center gap-2 flex-1"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110'
                            : isComplete
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isComplete && !isActive ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`text-xs font-medium hidden md:block ${
                        isActive ? 'text-blue-600' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {formSteps.map((stepConfig, index) => (
                  currentStep === index && (
                    <div key={stepConfig.field} className="animate-fadeIn">
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        {stepConfig.label}
                      </label>
                      <textarea
                        value={formData[stepConfig.field as keyof FormData]}
                        onChange={(e) => setFormData({ ...formData, [stepConfig.field]: e.target.value })}
                        placeholder={stepConfig.placeholder}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={4}
                      />
                      <div className={`mt-3 p-4 ${stepConfig.bgColor} rounded-lg`}>
                        <p className={`text-sm ${stepConfig.textColor}`}>
                          <strong>💡 {tp.tip}</strong> {stepConfig.tip}
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  {tp.anterior}
                </button>

                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    currentStep === steps.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  {tp.siguiente}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{tp.vistaPrevia}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    title={tp.guardarEnHistorial}
                  >
                    {saved ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Save className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    title={tp.copiarPromptTitle}
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 min-h-[400px] font-mono text-sm">
                {generatePrompt() ? (
                  <div className="space-y-1">
                    {generatePrompt().split('\n').map((line, index) => {
                      let className = "text-gray-800"

                      if (line.includes('<') && line.includes('>')) {
                        className = "text-blue-600 font-semibold"
                      } else if (line.startsWith('[') || line.includes('[')) {
                        className = "text-purple-600"
                      } else if (line.startsWith('{') || line.includes('{')) {
                        className = "text-green-600"
                      } else if (line.startsWith('•') || line.startsWith('-')) {
                        className = "text-orange-600"
                      } else if (line.match(/^\d\./)) {
                        className = "text-pink-600 font-medium"
                      } else if (line.includes('"')) {
                        className = "text-teal-600"
                      }

                      return (
                        <div key={index} className={className}>
                          {line || '\u00A0'}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Sparkles className="w-12 h-12 mb-4" />
                    <p className="text-center font-sans">
                      {tp.promptAparecera}
                    </p>
                  </div>
                )}
              </div>

              {/* Acciones adicionales */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleCopy}
                  disabled={!generatePrompt()}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    generatePrompt()
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Copy className="w-5 h-5" />
                  {copied ? tp.copiado : tp.copiarPrompt}
                </button>

                <button
                  onClick={() => {
                    setFormData({
                      objective: '',
                      context: '',
                      tone: '',
                      constraints: '',
                      output: ''
                    })
                    setCurrentStep(0)
                    setSelectedTemplate(null)
                  }}
                  className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  {tp.limpiarTodo}
                </button>
              </div>
            </div>
          </div>

          {/* Modal de Historial */}
          {showHistory && (
            <PromptHistory
              history={promptHistory}
              onSelect={handleHistorySelect}
              onDelete={handleDeleteHistory}
              onClose={() => setShowHistory(false)}
              labels={{ title: tp.historialDePrompts, empty: tp.noHayPrompts }}
            />
          )}
        </ProtectedSection>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
