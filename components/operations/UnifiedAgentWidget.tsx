'use client'

import { useState } from 'react'
import { Bot, Brain, Loader2, Send, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface UnifiedResponses {
  chatgpt: string
  claude: string
  gemini: string
  unified: string
}

export default function UnifiedAgentWidget() {
  const { t, language } = useLanguage()
  const tp = t.herramientasAgentesPage

  const [showEmailGate, setShowEmailGate] = useState(true)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const [query, setQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [responses, setResponses] = useState<UnifiedResponses>({
    chatgpt: '',
    claude: '',
    gemini: '',
    unified: '',
  })

  function handleEmailGateSubmit() {
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setEmailError(tp.emailInvalid)
      return
    }
    setEmailError('')
    setShowEmailGate(false)
  }

  async function processQuery() {
    if (!query.trim()) return
    setIsProcessing(true)
    setError('')
    setResponses({ chatgpt: '', claude: '', gemini: '', unified: '' })

    try {
      const res = await fetch('/api/unified-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          email: email.trim(),
          locale: language,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setError(data.error || tp.unifiedAgentError)
        return
      }
      setResponses({
        chatgpt: data.chatgpt || '',
        claude: data.claude || '',
        gemini: data.gemini || '',
        unified: data.unified || '',
      })
    } catch (err) {
      console.error('Unified agent fetch error:', err)
      setError(tp.unifiedAgentError)
    } finally {
      setIsProcessing(false)
    }
  }

  function handleNewQuery() {
    setQuery('')
    setResponses({ chatgpt: '', claude: '', gemini: '', unified: '' })
    setError('')
  }

  if (showEmailGate) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{tp.unifiedAgentTitle}</h2>
              <p className="text-[#00BCD4]/90 text-sm">{tp.unifiedAgentSubtitle}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{tp.emailGateTitle}</h3>
          <p className="text-slate-600 mb-6">{tp.emailGateSubtitle}</p>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEmailGateSubmit()
            }}
            placeholder={tp.emailGatePlaceholder}
            autoFocus
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#00BCD4] text-slate-900"
          />

          {emailError && <p className="mt-2 text-sm text-red-500">{emailError}</p>}

          <button
            type="button"
            onClick={handleEmailGateSubmit}
            disabled={!email.trim()}
            className="w-full mt-5 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#002D62] to-[#00BCD4] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {tp.emailGateStart}
          </button>
        </div>
      </div>
    )
  }

  const hasAny = responses.chatgpt || responses.claude || responses.gemini || responses.unified

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#001a3a] via-[#002D62] to-[#003a7a] text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#00BCD4]/20 border border-[#00BCD4]/40 rounded-full flex items-center justify-center">
            <Brain className="w-7 h-7 text-[#00BCD4]" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{tp.unifiedAgentTitle}</h2>
            <p className="text-[#00BCD4]/90 text-sm">{tp.unifiedAgentSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                processQuery()
              }
            }}
            placeholder={tp.unifiedAgentPlaceholder}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#00BCD4] text-slate-900 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={processQuery}
            disabled={!query.trim() || isProcessing}
            className="px-5 py-3 bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white rounded-xl font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {tp.unifiedAgentAnalyzing}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {tp.unifiedAgentAnalyze}
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {hasAny && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { key: 'chatgpt' as const, label: tp.unifiedAgentChatGPTLabel },
                { key: 'claude' as const, label: tp.unifiedAgentClaudeLabel },
                { key: 'gemini' as const, label: tp.unifiedAgentGeminiLabel },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#002D62]">
                    <Bot className="w-4 h-4 text-[#00BCD4]" />
                    {label}
                  </div>
                  <p className="text-sm text-slate-700">
                    {responses[key] || <span className="text-slate-400">&mdash;</span>}
                  </p>
                </div>
              ))}
            </div>

            {responses.unified && (
              <div className="mt-6 p-6 bg-gradient-to-br from-[#002D62] to-[#003a7a] rounded-xl border border-[#00BCD4]/30 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#00BCD4]" />
                  <span className="font-bold text-sm uppercase tracking-wider text-[#00BCD4]">
                    {tp.unifiedAgentUnifiedLabel}
                  </span>
                </div>
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  {responses.unified}
                </p>
              </div>
            )}

            {hasAny && !isProcessing && (
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={handleNewQuery}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-white transition-colors text-sm"
                >
                  {tp.unifiedAgentNewQuery}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
