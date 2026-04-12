'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  History,
  Loader2,
  Lock,
  Package,
  Palette,
  Save,
  Shield,
  Sparkles,
  Target,
  Trash2,
  UserCircle,
  UserPlus,
  Wand2,
  X,
} from 'lucide-react'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

// ============================================================================
// Types
// ============================================================================

type TargetModel = 'claude' | 'gpt' | 'gemini' | 'universal'

interface FormData {
  role: string
  objective: string
  context: string
  examples: string
  tone: string
  constraints: string
  output: string
}

interface PromptTemplate {
  id: string
  name: string
  role: string
  objective: string
  context: string
  examples: string
  tone: string
  constraints: string
  output: string
}

interface TemplateCategory {
  name: string
  templates: PromptTemplate[]
}

interface HistoryItem extends FormData {
  prompt: string
  targetModel: TargetModel
  cotEnabled: boolean
  timestamp: string
}

interface OptimizerResult {
  score: number
  improvements: string[]
  optimizedPrompt: string
}

// ============================================================================
// Constants
// ============================================================================

const LIFETIME_LIMIT = 3
const CALENDLY_URL = 'https://calendly.com/orlando-tuimpulsalab/30min'
const REDIRECT = '/herramientas/prompt-designer'

const EMPTY_FORM: FormData = {
  role: '',
  objective: '',
  context: '',
  examples: '',
  tone: '',
  constraints: '',
  output: '',
}

const stepIcons = [UserCircle, Target, FileText, BookOpen, Palette, Shield, Package]

const templateIconMap: Record<string, string> = {
  restaurantes: '\uD83C\uDF7D\uFE0F',
  salones: '\uD83D\uDC85',
  consultores: '\uD83D\uDCBC',
  retail: '\uD83D\uDECD\uFE0F',
  servicios: '\uD83D\uDCCB',
}

const TARGET_MODEL_KEYS: TargetModel[] = ['claude', 'gpt', 'gemini', 'universal']

// ============================================================================
// Format generators — one per target model
// ============================================================================

function splitRules(raw: string): string[] {
  return raw
    .split(/[,\n]/)
    .map((r) => r.trim())
    .filter(Boolean)
}

function generateClaudeXML(d: FormData, cot: boolean): string {
  const parts: string[] = []
  if (d.role) parts.push(`<role>\n${d.role}\n</role>`)
  if (d.objective) parts.push(`<task>\n${d.objective}\n</task>`)
  if (d.context) parts.push(`<context>\n${d.context}\n</context>`)
  if (d.examples) parts.push(`<examples>\n${d.examples}\n</examples>`)
  if (d.tone) parts.push(`<tone>\n${d.tone}\n</tone>`)
  const rules = splitRules(d.constraints)
  if (rules.length) {
    parts.push(`<rules>\n${rules.map((r) => `- ${r}`).join('\n')}\n</rules>`)
  }
  if (d.output) parts.push(`<output_format>\n${d.output}\n</output_format>`)
  if (cot) parts.push('Think step by step before responding.')
  return parts.join('\n\n')
}

function generateGPTMarkdown(d: FormData, cot: boolean): string {
  const parts: string[] = []
  if (d.role) parts.push(`# Role\n${d.role}`)
  if (d.objective) parts.push(`# Task\n${d.objective}`)
  if (d.context) parts.push(`# Context\n${d.context}`)
  if (d.examples) parts.push(`# Examples\n${d.examples}`)
  if (d.tone) parts.push(`# Tone\n${d.tone}`)
  const rules = splitRules(d.constraints)
  if (rules.length) {
    parts.push(`# Rules\n${rules.map((r) => `- ${r}`).join('\n')}`)
  }
  if (d.output) parts.push(`# Output Format\n${d.output}`)
  if (cot) parts.push("Let's think step by step.")
  return parts.join('\n\n')
}

function generateGeminiMarkdown(d: FormData, cot: boolean): string {
  const parts: string[] = []
  if (d.role) parts.push(`## ROLE\n${d.role}`)
  if (d.objective) parts.push(`## TASK\n${d.objective}`)
  if (d.context) parts.push(`## CONTEXT\n${d.context}`)
  if (d.examples) parts.push(`## EXAMPLES\n${d.examples}`)
  if (d.tone) parts.push(`## TONE\n${d.tone}`)
  const rules = splitRules(d.constraints)
  if (rules.length) {
    parts.push(`## RULES\n${rules.map((r) => `- ${r}`).join('\n')}`)
  }
  if (d.output) parts.push(`## OUTPUT FORMAT\n${d.output}`)
  if (cot) parts.push('Think through this step by step before answering.')
  return parts.join('\n\n')
}

function generateUniversal(d: FormData, cot: boolean): string {
  const parts: string[] = []
  const addSection = (label: string, content: string) => {
    parts.push(`=== ${label} ===\n${content}`)
  }
  if (d.role) addSection('ROLE', d.role)
  if (d.objective) addSection('TASK', d.objective)
  if (d.context) addSection('CONTEXT', d.context)
  if (d.examples) addSection('EXAMPLES', d.examples)
  if (d.tone) addSection('TONE', d.tone)
  const rules = splitRules(d.constraints)
  if (rules.length) {
    addSection('RULES', rules.map((r) => `- ${r}`).join('\n'))
  }
  if (d.output) addSection('OUTPUT FORMAT', d.output)
  if (cot) parts.push('Think step by step before responding.')
  return parts.join('\n\n')
}

function buildPrompt(d: FormData, target: TargetModel, cot: boolean): string {
  switch (target) {
    case 'claude':
      return generateClaudeXML(d, cot)
    case 'gpt':
      return generateGPTMarkdown(d, cot)
    case 'gemini':
      return generateGeminiMarkdown(d, cot)
    case 'universal':
    default:
      return generateUniversal(d, cot)
  }
}

// ============================================================================
// History modal subcomponent
// ============================================================================

const PromptHistory = ({
  history,
  onSelect,
  onDelete,
  onClose,
  labels,
}: {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
  onDelete: (index: number) => void
  onClose: () => void
  labels: { title: string; empty: string }
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{labels.title}</h3>
            <button
              type="button"
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
                    <h4 className="font-semibold text-gray-900">
                      {item.objective || item.role || 'Prompt'}
                    </h4>
                    <button
                      type="button"
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
                    {item.targetModel.toUpperCase()} &middot;{' '}
                    {new Date(item.timestamp).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
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

// ============================================================================
// Main component
// ============================================================================

export default function PromptDesigner() {
  const { t, language } = useLanguage()
  const { user, loading: authLoading } = useAuth()
  const tp = t.herramientasPromptPage

  // Core form state
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [targetModel, setTargetModel] = useState<TargetModel>('claude')
  const [cotEnabled, setCotEnabled] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // UI state
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [promptHistory, setPromptHistory] = useState<HistoryItem[]>([])

  // Optimizer state
  const [optimizerStatus, setOptimizerStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [optimizerError, setOptimizerError] = useState('')
  const [optimizerResult, setOptimizerResult] = useState<OptimizerResult | null>(null)
  const [optimizerUsed, setOptimizerUsed] = useState<number | null>(null)
  const [overridePrompt, setOverridePrompt] = useState<string | null>(null)
  const [optCopied, setOptCopied] = useState(false)

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('promptHistory')
    if (savedHistory) {
      try {
        setPromptHistory(JSON.parse(savedHistory))
      } catch {
        // ignore corrupted history
      }
    }
  }, [])

  // Fetch optimizer usage once user is known
  useEffect(() => {
    if (!user) {
      setOptimizerUsed(null)
      return
    }
    let cancelled = false
    const fetchUsage = async () => {
      try {
        const idToken = await user.getIdToken()
        const res = await fetch('/api/prompt-optimizer', {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setOptimizerUsed(typeof data.used === 'number' ? data.used : 0)
      } catch (err) {
        console.error('prompt-optimizer usage fetch failed:', err)
      }
    }
    fetchUsage()
    return () => {
      cancelled = true
    }
  }, [user])

  // Build steps from translations + icons
  const steps = useMemo(
    () =>
      tp.steps.map((step: { id: string; title: string }, i: number) => ({
        ...step,
        icon: stepIcons[i] || Target,
      })),
    [tp.steps]
  )

  // Build template categories
  const templateCategories = useMemo(
    () =>
      Object.entries(tp.templateCategories as Record<string, TemplateCategory>).map(
        ([key, cat]) => ({
          key,
          icon: templateIconMap[key] || '\uD83D\uDCC1',
          name: cat.name,
          templates: cat.templates,
        })
      ),
    [tp.templateCategories]
  )

  const generatedPrompt = useMemo(
    () => buildPrompt(formData, targetModel, cotEnabled),
    [formData, targetModel, cotEnabled]
  )

  const displayedPrompt = overridePrompt ?? generatedPrompt
  const hasContent = generatedPrompt.trim().length > 0

  const handleCopy = async () => {
    if (!displayedPrompt) return
    await navigator.clipboard.writeText(displayedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    if (!generatedPrompt) return
    const newItem: HistoryItem = {
      ...formData,
      prompt: generatedPrompt,
      targetModel,
      cotEnabled,
      timestamp: new Date().toISOString(),
    }
    const updatedHistory = [newItem, ...promptHistory].slice(0, 20)
    setPromptHistory(updatedHistory)
    localStorage.setItem('promptHistory', JSON.stringify(updatedHistory))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleTemplateSelect = (template: PromptTemplate) => {
    setFormData({
      role: template.role,
      objective: template.objective,
      context: template.context,
      examples: template.examples,
      tone: template.tone,
      constraints: template.constraints,
      output: template.output,
    })
    setCurrentStep(0)
    setOverridePrompt(null)
    setOptimizerResult(null)
  }

  const handleHistorySelect = (item: HistoryItem) => {
    setFormData({
      role: item.role || '',
      objective: item.objective || '',
      context: item.context || '',
      examples: item.examples || '',
      tone: item.tone || '',
      constraints: item.constraints || '',
      output: item.output || '',
    })
    if (item.targetModel) setTargetModel(item.targetModel)
    if (typeof item.cotEnabled === 'boolean') setCotEnabled(item.cotEnabled)
    setShowHistory(false)
    setCurrentStep(0)
    setOverridePrompt(null)
    setOptimizerResult(null)
  }

  const handleDeleteHistory = (index: number) => {
    const updatedHistory = promptHistory.filter((_, i) => i !== index)
    setPromptHistory(updatedHistory)
    localStorage.setItem('promptHistory', JSON.stringify(updatedHistory))
  }

  const handleClearAll = () => {
    setFormData(EMPTY_FORM)
    setCurrentStep(0)
    setOverridePrompt(null)
    setOptimizerResult(null)
    setCotEnabled(false)
  }

  const isStepComplete = (stepId: string) => {
    const value = formData[stepId as keyof FormData]
    return typeof value === 'string' && value.trim().length > 0
  }

  const completedSteps = steps.filter((step: { id: string }) => isStepComplete(step.id)).length
  const progress = (completedSteps / steps.length) * 100

  // Form step configs
  const formSteps = [
    {
      label: tp.roleLabel,
      placeholder: tp.rolePlaceholder,
      tip: tp.roleTip,
      field: 'role' as const,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
    },
    {
      label: tp.queQuieresLograr,
      placeholder: tp.objectivePlaceholder,
      tip: tp.objectiveTip,
      field: 'objective' as const,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      label: tp.contextoLabel,
      placeholder: tp.contextoPlaceholder,
      tip: tp.contextoTip,
      field: 'context' as const,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      label: tp.examplesLabel,
      placeholder: tp.examplesPlaceholder,
      tip: tp.examplesTip,
      field: 'examples' as const,
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700',
    },
    {
      label: tp.tonoLabel,
      placeholder: tp.tonoPlaceholder,
      tip: tp.tonoTip,
      field: 'tone' as const,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      label: tp.restriccionesLabel,
      placeholder: tp.restriccionesPlaceholder,
      tip: tp.restriccionesTip,
      field: 'constraints' as const,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
    {
      label: tp.outputLabel,
      placeholder: tp.outputPlaceholder,
      tip: tp.outputTip,
      field: 'output' as const,
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
    },
  ]

  // Optimizer handlers
  const handleOptimize = useCallback(async () => {
    if (!user || !generatedPrompt || generatedPrompt.length < 20) return
    setOptimizerStatus('loading')
    setOptimizerError('')
    setOptimizerResult(null)
    try {
      const idToken = await user.getIdToken()
      const res = await fetch('/api/prompt-optimizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          prompt: generatedPrompt,
          targetModel,
          locale: language,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 403 && data.locked) {
          setOptimizerUsed(LIFETIME_LIMIT)
          setOptimizerStatus('idle')
          return
        }
        setOptimizerError(data.error || tp.optimizerError)
        setOptimizerStatus('error')
        return
      }
      setOptimizerResult({
        score: data.score,
        improvements: data.improvements || [],
        optimizedPrompt: data.optimizedPrompt || '',
      })
      if (typeof data.used === 'number') setOptimizerUsed(data.used)
      setOptimizerStatus('idle')
    } catch (err) {
      console.error('prompt-optimizer submit error:', err)
      setOptimizerError(tp.optimizerError)
      setOptimizerStatus('error')
    }
  }, [user, generatedPrompt, targetModel, language, tp])

  const handleCopyOptimized = async () => {
    if (!optimizerResult) return
    await navigator.clipboard.writeText(optimizerResult.optimizedPrompt)
    setOptCopied(true)
    setTimeout(() => setOptCopied(false), 2000)
  }

  const handleApplyOptimized = () => {
    if (!optimizerResult) return
    setOverridePrompt(optimizerResult.optimizedPrompt)
  }

  const optimizerLocked = optimizerUsed !== null && optimizerUsed >= LIFETIME_LIMIT
  const optimizerRemaining =
    optimizerUsed !== null ? Math.max(0, LIFETIME_LIMIT - optimizerUsed) : LIFETIME_LIMIT

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#00BCD4]/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-[#002D62] to-[#00BCD4] rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{tp.titulo}</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">{tp.subtitulo}</p>
        </div>

        {/* Golden rules */}
        <div className="mb-12 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{tp.goldenRulesTitle}</h2>
          <p className="text-slate-500 mb-6">{tp.goldenRulesSubtitle}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {tp.goldenRules.map(
              (rule: { title: string; desc: string }, i: number) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#002D62] to-[#00BCD4] text-white text-sm font-bold flex items-center justify-center mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm">{rule.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{rule.desc}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Target model selector */}
        <div className="mb-12 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{tp.targetModelLabel}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TARGET_MODEL_KEYS.map((key) => {
              const model = tp.targetModels[key]
              const isActive = targetModel === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTargetModel(key)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isActive
                      ? 'border-[#00BCD4] bg-[#00BCD4]/5 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-slate-900 mb-1">{model.name}</div>
                  <div className="text-xs text-slate-500 leading-tight">{model.description}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Top action bar */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <History className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{tp.historial}</span>
          </button>
        </div>

        {/* Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{tp.templatesPorIndustria}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {templateCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.key ? null : cat.key)
                }
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === cat.key
                    ? 'border-[#00BCD4] bg-[#00BCD4]/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-gray-900 text-sm">{cat.name}</div>
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
                    type="button"
                    onClick={() => handleTemplateSelect(template)}
                    className="p-4 bg-white rounded-xl border border-gray-200 hover:border-[#00BCD4] hover:shadow-md transition-all text-left"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.objective}</p>
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Main grid: wizard + preview */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Wizard form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">{tp.progreso}</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#002D62] to-[#00BCD4] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Steps navigation */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto">
              {steps.map(
                (
                  step: {
                    id: string
                    title: string
                    icon: React.ComponentType<{ className?: string }>
                  },
                  index: number
                ) => {
                  const Icon = step.icon
                  const isActive = currentStep === index
                  const isComplete = isStepComplete(step.id)
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setCurrentStep(index)}
                      className="flex flex-col items-center gap-2 flex-1 min-w-[56px]"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white shadow-lg scale-110'
                            : isComplete
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isComplete && !isActive ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-medium hidden md:block ${
                          isActive ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  )
                }
              )}
            </div>

            {/* Current field */}
            <div className="space-y-6">
              {formSteps.map(
                (stepConfig, index) =>
                  currentStep === index && (
                    <div key={stepConfig.field} className="animate-fadeIn">
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        {stepConfig.label}
                      </label>
                      <textarea
                        value={formData[stepConfig.field]}
                        onChange={(e) =>
                          setFormData({ ...formData, [stepConfig.field]: e.target.value })
                        }
                        placeholder={stepConfig.placeholder}
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent resize-none text-slate-900"
                        rows={5}
                      />
                      <div className={`mt-3 p-4 ${stepConfig.bgColor} rounded-lg`}>
                        <p className={`text-sm ${stepConfig.textColor}`}>
                          <strong>&#128161; {tp.tip}</strong> {stepConfig.tip}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>

            {/* Step nav buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
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
                type="button"
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === steps.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white hover:shadow-lg'
                }`}
              >
                {tp.siguiente}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* CoT toggle */}
            <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <input
                id="cot-toggle"
                type="checkbox"
                checked={cotEnabled}
                onChange={(e) => setCotEnabled(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#00BCD4]"
              />
              <label htmlFor="cot-toggle" className="flex-1 cursor-pointer">
                <div className="font-semibold text-slate-900 text-sm">{tp.cotLabel}</div>
                <div className="text-xs text-slate-500 mt-1">{tp.cotDescription}</div>
              </label>
            </div>
          </div>

          {/* Preview panel */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{tp.vistaPrevia}</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!hasContent}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  title={tp.guardarEnHistorial}
                >
                  {saved ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Save className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!hasContent}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
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

            <div className="bg-gradient-to-br from-slate-50 to-[#00BCD4]/5 rounded-xl p-6 min-h-[400px] font-mono text-sm overflow-x-auto">
              {displayedPrompt ? (
                <pre className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                  {displayedPrompt}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Sparkles className="w-12 h-12 mb-4" />
                  <p className="text-center font-sans">{tp.promptAparecera}</p>
                </div>
              )}
            </div>

            {overridePrompt && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center justify-between gap-3">
                <span>Mostrando versi&oacute;n optimizada por IA.</span>
                <button
                  type="button"
                  onClick={() => setOverridePrompt(null)}
                  className="underline font-semibold"
                >
                  Volver a mi versi&oacute;n
                </button>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!hasContent}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  hasContent
                    ? 'bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Copy className="w-5 h-5" />
                {copied ? tp.copiado : tp.copiarPrompt}
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                {tp.limpiarTodo}
              </button>
            </div>
          </div>
        </div>

        {/* Optimizer section */}
        <div className="mt-12">
          <OptimizerSection
            authLoading={authLoading}
            hasUser={!!user}
            hasContent={hasContent}
            locked={optimizerLocked}
            remaining={optimizerRemaining}
            usedCount={optimizerUsed}
            status={optimizerStatus}
            error={optimizerError}
            result={optimizerResult}
            optCopied={optCopied}
            tp={tp}
            onOptimize={handleOptimize}
            onCopyOptimized={handleCopyOptimized}
            onApplyOptimized={handleApplyOptimized}
          />
        </div>

        {showHistory && (
          <PromptHistory
            history={promptHistory}
            onSelect={handleHistorySelect}
            onDelete={handleDeleteHistory}
            onClose={() => setShowHistory(false)}
            labels={{ title: tp.historialDePrompts, empty: tp.noHayPrompts }}
          />
        )}
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

// ============================================================================
// Optimizer subcomponent — auth gate / locked / idle / loading / result states
// ============================================================================

interface OptimizerSectionProps {
  authLoading: boolean
  hasUser: boolean
  hasContent: boolean
  locked: boolean
  remaining: number
  usedCount: number | null
  status: 'idle' | 'loading' | 'error'
  error: string
  result: OptimizerResult | null
  optCopied: boolean
  tp: {
    optimizerTitle: string
    optimizerDescription: string
    optimizerCTA: string
    optimizerGateTitle: string
    optimizerGateDescription: string
    optimizerSignup: string
    optimizerLogin: string
    optimizerAnalyzing: string
    optimizerScore: string
    optimizerImprovements: string
    optimizerOptimized: string
    optimizerLocked: string
    optimizerLockedDesc: string
    optimizerLockedCTA: string
    optimizerError: string
    optimizerUsesLeft: string
    optimizerCopy: string
    optimizerApply: string
    optimizerEmptyPrompt: string
  }
  onOptimize: () => void
  onCopyOptimized: () => void
  onApplyOptimized: () => void
}

function OptimizerSection({
  authLoading,
  hasUser,
  hasContent,
  locked,
  remaining,
  usedCount,
  status,
  error,
  result,
  optCopied,
  tp,
  onOptimize,
  onCopyOptimized,
  onApplyOptimized,
}: OptimizerSectionProps) {
  if (authLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
        <Loader2 className="w-8 h-8 animate-spin text-[#00BCD4] mx-auto" />
      </div>
    )
  }

  // Auth gate
  if (!hasUser) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00BCD4]/20 border border-[#00BCD4]/40 rounded-2xl mb-6">
            <Wand2 className="w-8 h-8 text-[#00BCD4]" />
          </div>
          <h3 className="text-3xl font-bold mb-3">{tp.optimizerTitle}</h3>
          <p className="text-white/80 max-w-2xl mx-auto">{tp.optimizerDescription}</p>
        </div>
        <div className="p-8 text-center bg-slate-50">
          <h4 className="text-2xl font-bold text-slate-900 mb-3">{tp.optimizerGateTitle}</h4>
          <p className="text-slate-600 max-w-xl mx-auto mb-8">{tp.optimizerGateDescription}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/signup?redirect=${encodeURIComponent(REDIRECT)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white font-bold hover:brightness-110 transition-all shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              {tp.optimizerSignup}
            </Link>
            <Link
              href={`/login?redirect=${encodeURIComponent(REDIRECT)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-[#002D62] text-[#002D62] font-semibold hover:bg-[#002D62] hover:text-white transition-all"
            >
              {tp.optimizerLogin}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Locked
  if (locked) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl mb-6">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-3xl font-bold mb-4">{tp.optimizerLocked}</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">{tp.optimizerLockedDesc}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00BCD4] text-[#001a3a] font-bold text-base hover:bg-white transition-all shadow-xl"
          >
            {tp.optimizerLockedCTA}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    )
  }

  // Active state
  const isProcessing = status === 'loading'
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#00BCD4]/20 border border-[#00BCD4]/40 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-[#00BCD4]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{tp.optimizerTitle}</h2>
              <p className="text-white/70 text-sm max-w-xl">{tp.optimizerDescription}</p>
            </div>
          </div>
          {usedCount !== null && (
            <div className="text-right">
              <div className="text-3xl font-bold text-[#00BCD4]">
                {remaining}/{LIFETIME_LIMIT}
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">
                {tp.optimizerUsesLeft}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 bg-slate-50">
        <button
          type="button"
          onClick={onOptimize}
          disabled={!hasContent || isProcessing}
          className="w-full px-6 py-4 bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white rounded-xl font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {tp.optimizerAnalyzing}
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              {tp.optimizerCTA}
            </>
          )}
        </button>

        {!hasContent && !isProcessing && (
          <p className="mt-3 text-sm text-center text-slate-500">{tp.optimizerEmptyPrompt}</p>
        )}

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            {/* Score */}
            <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-slate-200">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#002D62] to-[#00BCD4] flex items-center justify-center text-white">
                  <div className="text-3xl font-bold">{result.score}</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {tp.optimizerScore}
                </div>
                <div className="text-xl font-bold text-slate-900">{result.score} / 10</div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#002D62] to-[#00BCD4]"
                    style={{ width: `${(result.score / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Improvements */}
            {result.improvements.length > 0 && (
              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  {tp.optimizerImprovements}
                </div>
                <ul className="space-y-2">
                  {result.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00BCD4]/10 text-[#00BCD4] text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optimized prompt */}
            {result.optimizedPrompt && (
              <div className="p-6 bg-gradient-to-br from-[#002D62] to-[#003a7a] rounded-xl border border-[#00BCD4]/30 text-white">
                <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00BCD4]" />
                    <span className="font-bold text-sm uppercase tracking-wider text-[#00BCD4]">
                      {tp.optimizerOptimized}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onCopyOptimized}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      {optCopied ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {tp.optimizerCopy}
                    </button>
                    <button
                      type="button"
                      onClick={onApplyOptimized}
                      className="px-3 py-1.5 rounded-lg bg-[#00BCD4] text-[#001a3a] text-xs font-bold hover:bg-white transition-all"
                    >
                      {tp.optimizerApply}
                    </button>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap font-mono text-xs text-white/90 leading-relaxed max-h-96 overflow-y-auto">
                  {result.optimizedPrompt}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
