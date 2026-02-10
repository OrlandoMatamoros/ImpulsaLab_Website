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
  icon: string
  templates: PromptTemplate[]
}

// Tipos para el historial
interface HistoryItem extends FormData {
  prompt: string
  timestamp: string
}

// Templates predefinidos por industria/caso de uso
const promptTemplates: Record<string, TemplateCategory> = {
  marketing: {
    name: "Marketing Digital",
    icon: "📱",
    templates: [
      {
        id: "social-media",
        name: "Contenido para Redes Sociales",
        objective: "generar contenido viral y engagement para redes sociales",
        context: "Marca: [NOMBRE]\nIndustria: [SECTOR]\nAudiencia objetivo: [EDAD, INTERESES, UBICACIÓN]\nVoz de marca: [CARACTERÍSTICAS]\nPlataformas: [FACEBOOK/INSTAGRAM/LINKEDIN/X]",
        tone: "casual pero profesional, inclusivo, con emojis estratégicos",
        constraints: "Límite de caracteres por plataforma, incluir hashtags relevantes, evitar controversias, cumplir con políticas de cada red social",
        output: "5 publicaciones con variaciones, hashtags optimizados, sugerencias de horarios de publicación"
      },
      {
        id: "email-campaign",
        name: "Campaña de Email Marketing",
        objective: "diseñar secuencia de emails de conversión",
        context: "Producto/Servicio: [DESCRIPCIÓN]\nPunto de dolor del cliente: [PROBLEMA]\nPropuesta de valor: [SOLUCIÓN]\nFase del funnel: [AWARENESS/CONSIDERATION/DECISION]",
        tone: "persuasivo sin ser agresivo, personalizado, orientado a beneficios",
        constraints: "Subject line máximo 50 caracteres, preview text optimizado, móvil-first, incluir CTA claro, cumplir con CAN-SPAM",
        output: "Secuencia de 3-5 emails, líneas de asunto A/B test, métricas a trackear"
      }
    ]
  },
  desarrollo: {
    name: "Desarrollo de Software",
    icon: "💻",
    templates: [
      {
        id: "code-review",
        name: "Revisión y Optimización de Código",
        objective: "analizar, refactorizar y optimizar código existente",
        context: "Lenguaje: [JAVASCRIPT/PYTHON/JAVA/etc]\nFramework: [REACT/DJANGO/SPRING/etc]\nTipo de aplicación: [WEB/MÓVIL/API]\nProblema actual: [PERFORMANCE/MANTENIBILIDAD/SEGURIDAD]",
        tone: "técnico pero didáctico, constructivo, orientado a mejores prácticas",
        constraints: "Mantener funcionalidad actual, seguir principios SOLID, optimizar para legibilidad y performance, incluir tests unitarios",
        output: "Código refactorizado, explicación de cambios, métricas de mejora, sugerencias adicionales"
      },
      {
        id: "api-design",
        name: "Diseño de API REST",
        objective: "diseñar API RESTful completa y documentada",
        context: "Dominio: [E-COMMERCE/FINTECH/SAAS/etc]\nEntidades principales: [USUARIOS, PRODUCTOS, etc]\nAutenticación: [JWT/OAUTH/API-KEY]\nClientes esperados: [WEB/MÓVIL/TERCEROS]",
        tone: "técnico preciso, siguiendo estándares de la industria",
        constraints: "RESTful principles, versionado semántico, manejo de errores consistente, paginación, rate limiting",
        output: "Endpoints documentados, schemas JSON, códigos de respuesta, ejemplos de uso, consideraciones de seguridad"
      }
    ]
  },
  educacion: {
    name: "Educación y Formación",
    icon: "🎓",
    templates: [
      {
        id: "lesson-plan",
        name: "Plan de Lección Interactivo",
        objective: "desarrollar plan de clase completo con metodología activa",
        context: "Materia: [ASIGNATURA]\nTema específico: [CONTENIDO]\nNivel educativo: [PRIMARIA/SECUNDARIA/UNIVERSITARIO]\nTamaño del grupo: [NÚMERO]\nRecursos disponibles: [TECNOLOGÍA/MATERIALES]",
        tone: "educativo inspirador, claro, adaptado a la edad",
        constraints: "Duración: [MINUTOS], incluir diversidad de estilos de aprendizaje, evaluación formativa, uso de tecnología",
        output: "Objetivos SMART, secuencia didáctica minuto a minuto, materiales necesarios, rúbricas de evaluación, actividades diferenciadas"
      }
    ]
  },
  negocios: {
    name: "Estrategia de Negocios",
    icon: "📈",
    templates: [
      {
        id: "business-plan",
        name: "Plan de Negocios Ejecutivo",
        objective: "crear plan de negocios integral para presentar a inversionistas",
        context: "Empresa: [NOMBRE Y ETAPA]\nSector: [INDUSTRIA]\nModelo de negocio: [B2B/B2C/MARKETPLACE]\nMercado objetivo: [TAM/SAM/SOM]\nDiferenciador: [PROPUESTA ÚNICA]",
        tone: "ejecutivo persuasivo, respaldado por datos, visionario pero realista",
        constraints: "Máximo 15-20 páginas, incluir proyecciones a 3-5 años, análisis de competencia, métricas clave",
        output: "Executive summary, análisis de mercado, estrategia go-to-market, proyecciones financieras, equipo, necesidades de inversión"
      }
    ]
  }
}

// Componente para el historial de prompts
const PromptHistory = ({
  history,
  onSelect,
  onDelete,
  onClose
}: {
  history: HistoryItem[],
  onSelect: (item: HistoryItem) => void,
  onDelete: (index: number) => void,
  onClose: () => void
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Historial de Prompts</h3>
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
              <p className="text-gray-500">No hay prompts guardados aún</p>
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

  const steps = [
    { id: 'objective', title: 'Objetivo', icon: Target },
    { id: 'context', title: 'Contexto', icon: FileText },
    { id: 'tone', title: 'Tono y Estilo', icon: Palette },
    { id: 'constraints', title: 'Restricciones', icon: Shield },
    { id: 'output', title: 'Output', icon: Package }
  ]

  // Generar el prompt basado en los datos del formulario con formato estructurado
  const generatePrompt = () => {
    const parts = []
    
    // Estructura principal con delimitadores
    parts.push(`<PROMPT>`)
    
    if (formData.objective) {
      parts.push(`\n<OBJETIVO>
[${formData.objective}]
</OBJETIVO>`)
    }
    
    if (formData.context) {
      parts.push(`\n\n<CONTEXTO>
{
  ${formData.context.split('\n').join('\n  ')}
}
</CONTEXTO>`)
    }
    
    if (formData.tone) {
      parts.push(`\n\n<PARAMETROS>
- Tono: (${formData.tone})
- Formato: [Estructurado y profesional]
- Audiencia: [Definida en contexto]
</PARAMETROS>`)
    }
    
    if (formData.constraints) {
      parts.push(`\n\n<RESTRICCIONES>
${formData.constraints.split(',').map(c => `- ${c.trim()}`).join('\n')}
</RESTRICCIONES>`)
    }
    
    if (formData.output) {
      parts.push(`\n\n<OUTPUT_ESPERADO>
{
  "formato": "${formData.output}",
  "estructura": "Clara y organizada",
  "entregables": [
    ${formData.output.split(',').map(item => `"${item.trim()}"`).join(',\n    ')}
  ]
}
</OUTPUT_ESPERADO>`)
    }
    
    // Instrucciones finales
    parts.push(`\n\n<INSTRUCCIONES_FINALES>
1. Analiza cuidadosamente cada sección delimitada
2. Mantén coherencia con los parámetros establecidos
3. Genera contenido original y relevante
4. Verifica que cumples todas las restricciones
5. Entrega el resultado en el formato especificado
</INSTRUCCIONES_FINALES>`)
    
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
    
    const updatedHistory = [newItem, ...promptHistory].slice(0, 20) // Mantener máximo 20 items
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

  const completedSteps = steps.filter(step => isStepComplete(step.id)).length
  const progress = (completedSteps / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - SIEMPRE VISIBLE */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Prompt Designer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crea prompts profesionales paso a paso con nuestra herramienta interactiva
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full">
            <span className="font-medium">Próximamente: Plantillas premium y colaboración</span>
          </div>
        </div>

        {/* CONTENIDO PROTEGIDO - Toda la herramienta interactiva */}
        <ProtectedSection
          message="Regístrate gratis para usar nuestro Diseñador de Prompts con plantillas profesionales, historial y exportación"
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
              <span className="text-gray-700">Historial</span>
            </button>
          </div>

          {/* Templates Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Templates por Industria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(promptTemplates).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCategory === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="font-semibold text-gray-900">{category.name}</div>
                </button>
              ))}
            </div>
            
            {selectedCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                {promptTemplates[selectedCategory].templates.map((template) => (
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
                  <span className="text-sm font-medium text-gray-600">Progreso</span>
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
                {steps.map((step, index) => {
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
                {currentStep === 0 && (
                  <div className="animate-fadeIn">
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      ¿Qué quieres lograr?
                    </label>
                    <textarea
                      value={formData.objective}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                      placeholder="Ejemplo: crear contenido para redes sociales, escribir código, generar ideas de negocio..."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    <div className="mt-3 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>💡 Tip:</strong> Sé específico sobre tu objetivo. En lugar de "escribir contenido", 
                        prueba "crear 5 posts de LinkedIn sobre inteligencia artificial para CEOs".
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="animate-fadeIn">
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Contexto y detalles específicos
                    </label>
                    <textarea
                      value={formData.context}
                      onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                      placeholder="Proporciona información relevante sobre tu proyecto, empresa, audiencia, etc."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    <div className="mt-3 p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-700">
                        <strong>💡 Tip:</strong> Incluye datos como tu industria, público objetivo, 
                        valores de marca o cualquier información que ayude a personalizar el resultado.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="animate-fadeIn">
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Tono y estilo deseado
                    </label>
                    <textarea
                      value={formData.tone}
                      onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                      placeholder="Ejemplo: profesional pero cercano, humorístico, técnico, inspirador..."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    <div className="mt-3 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>💡 Tip:</strong> El tono correcto marca la diferencia. 
                        Piensa en cómo hablarías con tu audiencia ideal.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="animate-fadeIn">
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      Restricciones o requisitos especiales
                    </label>
                    <textarea
                      value={formData.constraints}
                      onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                      placeholder="Ejemplo: máximo 500 palabras, evitar jerga técnica, incluir llamadas a la acción..."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    <div className="mt-3 p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-orange-700">
                        <strong>💡 Tip:</strong> Las restricciones claras evitan resultados no deseados. 
                        Incluye límites de longitud, formatos específicos o elementos a evitar.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="animate-fadeIn">
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      ¿Qué resultado esperas?
                    </label>
                    <textarea
                      value={formData.output}
                      onChange={(e) => setFormData({ ...formData, output: e.target.value })}
                      placeholder="Ejemplo: lista con 10 ideas, código completo con comentarios, plan detallado paso a paso..."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                    <div className="mt-3 p-4 bg-pink-50 rounded-lg">
                      <p className="text-sm text-pink-700">
                        <strong>💡 Tip:</strong> Describe exactamente qué formato y estructura 
                        necesitas para el resultado final.
                      </p>
                    </div>
                  </div>
                )}
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
                  Anterior
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
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Vista Previa</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Guardar en historial"
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
                    title="Copiar prompt"
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
                      // Resaltado de sintaxis para diferentes elementos
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
                      Tu prompt aparecerá aquí mientras lo construyes
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
                  {copied ? '¡Copiado!' : 'Copiar Prompt'}
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
                  Limpiar Todo
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