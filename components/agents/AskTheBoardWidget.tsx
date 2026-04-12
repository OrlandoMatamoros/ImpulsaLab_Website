'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Brain,
  Loader2,
  Lock,
  Send,
  Sparkles,
  UserPlus,
} from 'lucide-react'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

interface BoardResponses {
  chatgpt: string
  claude: string
  gemini: string
  unified: string
}

const LIFETIME_LIMIT = 3
const CALENDLY_URL = 'https://calendly.com/orlando-tuimpulsalab/30min'
const REDIRECT = '/herramientas/agentes'

export default function AskTheBoardWidget() {
  const { t, language } = useLanguage()
  const { user, loading: authLoading } = useAuth()
  const tp = t.herramientasAgentesPage

  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')
  const [question, setQuestion] = useState('')
  const [responses, setResponses] = useState<BoardResponses>({
    chatgpt: '',
    claude: '',
    gemini: '',
    unified: '',
  })
  const [queriesUsed, setQueriesUsed] = useState<number | null>(null)

  // Fetch current usage from the server once we know there's a user.
  useEffect(() => {
    if (!user) return
    let cancelled = false

    const fetchUsage = async () => {
      try {
        const idToken = await user.getIdToken()
        const res = await fetch('/api/ask-the-board', {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setQueriesUsed(typeof data.queriesUsed === 'number' ? data.queriesUsed : 0)
      } catch (err) {
        console.error('ask-the-board usage fetch failed:', err)
      }
    }

    fetchUsage()
    return () => {
      cancelled = true
    }
  }, [user])

  const isLocked = queriesUsed !== null && queriesUsed >= LIFETIME_LIMIT
  const remaining = queriesUsed !== null ? Math.max(0, LIFETIME_LIMIT - queriesUsed) : LIFETIME_LIMIT

  const handleSubmit = useCallback(async () => {
    if (!user || !question.trim() || isLocked) return

    setStatus('loading')
    setError('')
    setResponses({ chatgpt: '', claude: '', gemini: '', unified: '' })

    try {
      const idToken = await user.getIdToken()
      const res = await fetch('/api/ask-the-board', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ question: question.trim(), locale: language }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 403 && data.locked) {
          setQueriesUsed(LIFETIME_LIMIT)
          setStatus('idle')
          return
        }
        setError(data.error || tp.askTheBoardError)
        setStatus('error')
        return
      }

      setResponses({
        chatgpt: data.chatgpt || '',
        claude: data.claude || '',
        gemini: data.gemini || '',
        unified: data.unified || '',
      })
      if (typeof data.queriesUsed === 'number') {
        setQueriesUsed(data.queriesUsed)
      }
      setStatus('idle')
    } catch (err) {
      console.error('ask-the-board submit error:', err)
      setError(tp.askTheBoardError)
      setStatus('error')
    }
  }, [user, question, isLocked, language, tp])

  const handleNewQuestion = () => {
    setQuestion('')
    setResponses({ chatgpt: '', claude: '', gemini: '', unified: '' })
    setError('')
    setStatus('idle')
  }

  // ===== State 1: loading auth =====
  if (authLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00BCD4] mx-auto" />
      </div>
    )
  }

  // ===== State 2: not authenticated — signup gate =====
  if (!user) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00BCD4]/20 border border-[#00BCD4]/40 rounded-2xl mb-6">
            <Brain className="w-8 h-8 text-[#00BCD4]" />
          </div>
          <h3 className="text-3xl font-bold mb-3">{tp.askTheBoardTitle}</h3>
          <p className="text-lg text-[#00BCD4] mb-2">{tp.askTheBoardSubtitle}</p>
          <p className="text-white/70 max-w-2xl mx-auto">{tp.askTheBoardDescription}</p>
        </div>

        <div className="p-8 text-center bg-slate-50">
          <h4 className="text-2xl font-bold text-slate-900 mb-3">{tp.askTheBoardGateTitle}</h4>
          <p className="text-slate-600 max-w-xl mx-auto mb-8">{tp.askTheBoardGateDescription}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/signup?redirect=${encodeURIComponent(REDIRECT)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white font-bold hover:brightness-110 transition-all shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              {tp.askTheBoardSignupCTA}
            </Link>
            <Link
              href={`/login?redirect=${encodeURIComponent(REDIRECT)}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-[#002D62] text-[#002D62] font-semibold hover:bg-[#002D62] hover:text-white transition-all"
            >
              {tp.askTheBoardLoginCTA}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ===== State 3: authenticated + locked =====
  if (isLocked) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-2xl mb-6">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-3xl font-bold mb-4">{tp.askTheBoardLockedTitle}</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            {tp.askTheBoardLockedDescription}
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00BCD4] text-[#001a3a] font-bold text-base hover:bg-white transition-all shadow-xl"
          >
            {tp.askTheBoardLockedCTA}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    )
  }

  // ===== State 4: authenticated + active =====
  const hasAny = responses.chatgpt || responses.claude || responses.gemini || responses.unified
  const isProcessing = status === 'loading'

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003a7a] text-white p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#00BCD4]/20 border border-[#00BCD4]/40 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-[#00BCD4]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{tp.askTheBoardTitle}</h2>
              <p className="text-[#00BCD4]/90 text-sm">{tp.askTheBoardSubtitle}</p>
            </div>
          </div>

          {queriesUsed !== null && (
            <div className="text-right">
              <div className="text-3xl font-bold text-[#00BCD4]">
                {remaining}/{LIFETIME_LIMIT}
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">
                {tp.askTheBoardQuestionsLeft}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-slate-50">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isProcessing) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            placeholder={tp.askTheBoardPlaceholder}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#00BCD4] text-slate-900 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!question.trim() || isProcessing}
            className="px-6 py-3 bg-gradient-to-r from-[#002D62] to-[#00BCD4] text-white rounded-xl font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {tp.askTheBoardAnalyzing}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {tp.askTheBoardAnalyze}
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
                { key: 'chatgpt' as const, label: tp.askTheBoardGPTLabel },
                { key: 'claude' as const, label: tp.askTheBoardClaudeLabel },
                { key: 'gemini' as const, label: tp.askTheBoardGeminiLabel },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#002D62]">
                    <Bot className="w-4 h-4 text-[#00BCD4]" />
                    {label}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
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
                    {tp.askTheBoardSynthLabel}
                  </span>
                </div>
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  {responses.unified}
                </p>
              </div>
            )}

            {!isProcessing && !isLocked && (
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={handleNewQuestion}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-white transition-colors text-sm"
                >
                  {tp.askTheBoardNewQuestion}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
