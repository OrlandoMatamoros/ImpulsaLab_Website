'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { isAdminEmail } from '@/lib/admin-emails'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DirectorResponse {
  name: string
  role: string
  emoji: string
  color: string
  model: string
  content: string
  keyPoints: string[]
  recommendation: string
  confidence: number
}

interface Resolution {
  content: string
  consenso: string
  desacuerdos: string
  recomendacion: string
  confianza: number
  acciones: string[]
}

interface DebateResult {
  claude: string
  gemini: string
  gpt: string
  resolution: string
}

type AppState = 'lobby' | 'debate' | 'resolution'

/* ------------------------------------------------------------------ */
/*  Director definitions                                               */
/* ------------------------------------------------------------------ */

const DIRECTORS = [
  {
    id: 'claude',
    name: 'CLAUDE',
    roleKey: 'technicalDirector' as const,
    emoji: '\u2699\uFE0F',
    color: '#00BCD4',
    model: 'Claude Sonnet 4.5',
  },
  {
    id: 'gemini',
    name: 'GEMINI',
    roleKey: 'strategyDirector' as const,
    emoji: '\uD83E\uDDED',
    color: '#8B5CF6',
    model: 'Gemini 2.5 Flash',
  },
  {
    id: 'gpt',
    name: 'GPT',
    roleKey: 'marketDirector' as const,
    emoji: '\uD83C\uDF0E',
    color: '#10B981',
    model: 'GPT-4o',
  },
] as const

/* ------------------------------------------------------------------ */
/*  Parsing helpers                                                    */
/* ------------------------------------------------------------------ */

function parseDirectorResponse(
  raw: string,
  director: (typeof DIRECTORS)[number],
  role: string
): DirectorResponse {
  const keyPoints: string[] = []
  let recommendation = ''
  let confidence = 75

  const kpMatch = raw.match(/##\s*Puntos\s*Clave[\s\S]*?(?=##\s*Recomendaci[oó]n|$)/i)
  if (kpMatch) {
    const bullets = kpMatch[0].match(/[-*]\s+(.+)/g)
    if (bullets) {
      bullets.forEach((b) => keyPoints.push(b.replace(/^[-*]\s+/, '').trim()))
    }
  }

  const recMatch = raw.match(/##\s*Recomendaci[oó]n[\s\S]*?(?=##\s*Confianza|$)/i)
  if (recMatch) {
    recommendation = recMatch[0].replace(/##\s*Recomendaci[oó]n\s*/i, '').trim()
  }

  const confMatch = raw.match(/##?\s*Confianza[:\s]*(\d+)%/i)
  if (confMatch) {
    confidence = parseInt(confMatch[1], 10)
  }

  return {
    name: director.name,
    role,
    emoji: director.emoji,
    color: director.color,
    model: director.model,
    content: raw,
    keyPoints: keyPoints.length > 0 ? keyPoints : ['...'],
    recommendation: recommendation || '...',
    confidence: Math.min(100, Math.max(0, confidence)),
  }
}

function parseResolution(raw: string): Resolution {
  let consenso = ''
  let desacuerdos = ''
  let recomendacion = ''
  let confianza = 80
  const acciones: string[] = []

  const consensoMatch = raw.match(/##\s*Consenso[\s\S]*?(?=##\s*Desacuerdos|$)/i)
  if (consensoMatch) consenso = consensoMatch[0].replace(/##\s*Consenso\s*/i, '').trim()

  const desMatch = raw.match(/##\s*Desacuerdos[\s\S]*?(?=##\s*Recomendaci[oó]n\s*Final|$)/i)
  if (desMatch) desacuerdos = desMatch[0].replace(/##\s*Desacuerdos\s*/i, '').trim()

  const recMatch = raw.match(/##\s*Recomendaci[oó]n\s*Final[\s\S]*?(?=##\s*Confianza|$)/i)
  if (recMatch) recomendacion = recMatch[0].replace(/##\s*Recomendaci[oó]n\s*Final\s*/i, '').trim()

  const confMatch = raw.match(/##?\s*Confianza[:\s]*(\d+)%/i)
  if (confMatch) confianza = parseInt(confMatch[1], 10)

  const actMatch = raw.match(/##\s*Acciones\s*Inmediatas[\s\S]*/i)
  if (actMatch) {
    const items = actMatch[0].match(/\d+[.)]\s*(.+)/g)
    if (items) {
      items.forEach((item) => acciones.push(item.replace(/^\d+[.)]\s*/, '').trim()))
    }
  }

  return {
    content: raw,
    consenso: consenso || '...',
    desacuerdos: desacuerdos || '...',
    recomendacion: recomendacion || '...',
    confianza: Math.min(100, Math.max(0, confianza)),
    acciones: acciones.length > 0 ? acciones : ['...'],
  }
}

/* ------------------------------------------------------------------ */
/*  Typing effect hook                                                 */
/* ------------------------------------------------------------------ */

function useTypingEffect(text: string, speed: number = 18) {
  const [displayed, setDisplayed] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!text) {
      setDisplayed('')
      setIsDone(false)
      return
    }

    setDisplayed('')
    setIsDone(false)
    let i = 0

    const interval = setInterval(() => {
      const chunk = text.slice(i, i + 3)
      if (i < text.length) {
        setDisplayed((prev) => prev + chunk)
        i += 3
      } else {
        setIsDone(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, isDone }
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ConfidenceBar({
  value,
  color,
  label,
}: {
  value: number
  color: string
  label: string
}) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span style={{ color }} className="font-semibold">
          {value}%
        </span>
      </div>
      <div className="confidence-bar w-full h-2 rounded-full bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function DirectorCard({
  director,
  status,
  response,
  index,
}: {
  director: (typeof DIRECTORS)[number]
  status: 'waiting' | 'analyzing' | 'done'
  response: DirectorResponse | null
  index: number
}) {
  const { t } = useLanguage()
  const { displayed, isDone } = useTypingEffect(
    status === 'done' && response ? response.content : '',
    12
  )

  return (
    <motion.div
      className="director-card bg-slate-900/50 backdrop-blur-sm rounded-xl border-l-4 p-5 flex flex-col"
      style={{ borderLeftColor: director.color }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{director.emoji}</span>
        <div>
          <h3 className="font-bold text-lg" style={{ color: director.color }}>
            {director.name}
          </h3>
          <p className="text-slate-400 text-sm">{t.boardPage[director.roleKey]}</p>
        </div>
      </div>

      <p className="text-slate-500 text-xs mb-4">{director.model}</p>

      {status === 'waiting' && (
        <div className="flex items-center gap-2 text-slate-500 text-sm mt-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-slate-600" />
          {t.boardPage.waiting}
        </div>
      )}

      {status === 'analyzing' && (
        <div
          className="flex items-center gap-2 text-sm mt-auto"
          style={{ color: director.color }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full board-pulse-dot"
            style={{ backgroundColor: director.color }}
          />
          {t.boardPage.analyzing}
        </div>
      )}

      {status === 'done' && response && (
        <div className="space-y-3 flex-1 flex flex-col">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold">
              {t.boardPage.keyPoints}
            </h4>
            <ul className="space-y-1.5">
              {response.keyPoints.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                  <span style={{ color: director.color }} className="mt-0.5">
                    &#9656;
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold">
              {t.boardPage.recommendation}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isDone ? response.recommendation : <span>{displayed.slice(-120)}</span>}
            </p>
          </div>

          <div className="mt-auto">
            <ConfidenceBar
              value={response.confidence}
              color={director.color}
              label={t.boardPage.confidence}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

function ResolutionCard({ resolution }: { resolution: Resolution }) {
  const { t } = useLanguage()

  return (
    <motion.div
      className="resolution-card mt-8 border-2 border-amber-500/50 bg-amber-500/5 rounded-xl p-6 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-3xl">&#11088;</span>
        <h2 className="text-2xl font-bold text-amber-400 tracking-wide">
          {t.boardPage.boardResolution}
        </h2>
      </div>
      <p className="text-[#00BCD4] text-xs tracking-wider font-medium mb-6 ml-12">
        {t.boardPage.resolutionSubtitle}
      </p>

      <div className="mb-5">
        <h3 className="text-sm uppercase tracking-wider text-amber-500 font-semibold mb-2">
          {t.boardPage.consensus}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {resolution.consenso}
        </p>
      </div>

      <div className="mb-5">
        <h3 className="text-sm uppercase tracking-wider text-amber-500 font-semibold mb-2">
          {t.boardPage.disagreements}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {resolution.desacuerdos}
        </p>
      </div>

      <div className="mb-5">
        <h3 className="text-sm uppercase tracking-wider text-amber-500 font-semibold mb-2">
          {t.boardPage.finalRecommendation}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {resolution.recomendacion}
        </p>
      </div>

      <ConfidenceBar
        value={resolution.confianza}
        color="#F59E0B"
        label={t.boardPage.confidence}
      />

      <div className="mt-5">
        <h3 className="text-sm uppercase tracking-wider text-amber-500 font-semibold mb-2">
          {t.boardPage.immediateActions}
        </h3>
        <ol className="space-y-2">
          {resolution.acciones.map((accion, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-300">
              <span className="text-amber-400 font-bold min-w-[20px]">{i + 1}.</span>
              <span>{accion}</span>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function JuntaEstrategicaAppPage() {
  const { t, language } = useLanguage()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [appState, setAppState] = useState<AppState>('lobby')
  const [question, setQuestion] = useState('')
  const [domain, setDomain] = useState('General')
  const [error, setError] = useState<string | null>(null)

  const [activeDirector, setActiveDirector] = useState<number>(-1)
  const [directorResponses, setDirectorResponses] = useState<(DirectorResponse | null)[]>([
    null,
    null,
    null,
  ])
  const [resolution, setResolution] = useState<Resolution | null>(null)
  const [synthesizing, setSynthesizing] = useState(false)

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!isAdminEmail(user?.email)) {
      router.replace('/unauthorized')
    }
  }, [user, authLoading, router])

  const DOMAINS_MAP = [
    { value: 'General', label: t.boardPage.domainGeneral },
    { value: 'Finanzas', label: t.boardPage.domainFinance },
    { value: 'Marketing', label: t.boardPage.domainMarketing },
    { value: 'Operaciones', label: t.boardPage.domainOperations },
    { value: 'Producto', label: t.boardPage.domainProduct },
    { value: 'Tecnologia', label: t.boardPage.domainTechnology },
  ]

  const resetAll = useCallback(() => {
    setAppState('lobby')
    setActiveDirector(-1)
    setDirectorResponses([null, null, null])
    setResolution(null)
    setSynthesizing(false)
    setError(null)
    if (abortRef.current) abortRef.current.abort()
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!question.trim()) return
    if (!user) {
      setError('Session expired. Please sign in again.')
      return
    }

    setError(null)
    setAppState('debate')
    setActiveDirector(0)
    setDirectorResponses([null, null, null])
    setResolution(null)
    setSynthesizing(false)

    const controller = new AbortController()
    abortRef.current = controller
    const timeoutId = setTimeout(() => controller.abort(), 120000)

    try {
      const locale = language === 'EN' ? 'en' : 'es'
      const idToken = await user.getIdToken()
      const res = await fetch('/api/strategic-board/debate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ question: question.trim(), domain, locale }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Server error (${res.status})`)
      }

      const data: DebateResult = await res.json()

      setActiveDirector(0)
      await delay(800)
      const claudeResp = parseDirectorResponse(data.claude, DIRECTORS[0], t.boardPage.technicalDirector)
      setDirectorResponses((prev) => [claudeResp, prev[1], prev[2]])

      setActiveDirector(1)
      await delay(800)
      const geminiResp = parseDirectorResponse(data.gemini, DIRECTORS[1], t.boardPage.strategyDirector)
      setDirectorResponses((prev) => [prev[0], geminiResp, prev[2]])

      setActiveDirector(2)
      await delay(800)
      const gptResp = parseDirectorResponse(data.gpt, DIRECTORS[2], t.boardPage.marketDirector)
      setDirectorResponses((prev) => [prev[0], prev[1], gptResp])

      setActiveDirector(3)
      setSynthesizing(true)
      await delay(1200)
      const resolutionParsed = parseResolution(data.resolution)
      setResolution(resolutionParsed)
      setSynthesizing(false)
      setAppState('resolution')
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Unexpected error')
      setAppState('lobby')
    } finally {
      clearTimeout(timeoutId)
    }
  }, [question, domain, t, language, user])

  const handlePrint = () => {
    window.print()
  }

  const directorStatus = (idx: number): 'waiting' | 'analyzing' | 'done' => {
    if (directorResponses[idx]) return 'done'
    if (activeDirector === idx) return 'analyzing'
    return 'waiting'
  }

  if (authLoading || !isAdminEmail(user?.email)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-slate-400">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white">
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Print-only header */}
        <div className="print-only hidden mb-6">
          <h1 className="text-2xl font-bold">{t.boardPage.printTitle}</h1>
          <p className="text-sm text-gray-600">
            Impulsa Lab LLC | {new Date().toLocaleDateString('es-MX')}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {t.boardPage.printQuery}: {question}
          </p>
          <p className="text-sm text-gray-600">
            {t.boardPage.printDomain}: {domain}
          </p>
          <hr className="my-4" />
        </div>

        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#00BCD4] via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            {t.boardPage.mainTitle}
          </h1>
          <p className="text-slate-400 mt-2 text-sm tracking-widest uppercase">
            {t.boardPage.poweredBy}{' '}
            <span className="text-white font-semibold">IMPULSA</span>{' '}
            <span className="text-[#00BCD4] font-semibold">LAB</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {DIRECTORS.map((dir, idx) => (
            <DirectorCard
              key={dir.id}
              director={dir}
              status={directorStatus(idx)}
              response={directorResponses[idx]}
              index={idx}
            />
          ))}
        </div>

        <AnimatePresence>
          {synthesizing && (
            <motion.div
              className="flex items-center justify-center gap-3 py-6 text-amber-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="inline-block w-3 h-3 rounded-full bg-amber-400 board-pulse-dot" />
              <span className="text-lg font-medium">{t.boardPage.synthesizing}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {appState === 'resolution' && resolution && <ResolutionCard resolution={resolution} />}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="no-print mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {(appState === 'lobby' || appState === 'resolution') && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="question"
                  className="block text-sm text-slate-300 mb-2 font-medium"
                >
                  {appState === 'resolution'
                    ? t.boardPage.newQueryForBoard
                    : t.boardPage.questionForBoard}
                </label>
                <textarea
                  id="question"
                  rows={3}
                  className="w-full bg-slate-900/70 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/50 focus:border-[#00BCD4]/50 resize-none text-sm leading-relaxed"
                  placeholder={t.boardPage.questionPlaceholder}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />

                <div className="flex flex-wrap gap-2 mt-3">
                  {t.boardPage.exampleQueries.map((eq, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setQuestion(eq)}
                      className="bg-slate-800 text-slate-300 hover:bg-[#00BCD4]/10 hover:text-[#00BCD4] rounded-full px-3 py-1.5 text-xs transition-colors cursor-pointer text-left leading-snug"
                    >
                      {eq}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex-1">
                  <label
                    htmlFor="domain"
                    className="block text-xs text-slate-400 mb-1"
                  >
                    {t.boardPage.domainLabel}
                  </label>
                  <select
                    id="domain"
                    className="bg-slate-900/70 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/50"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  >
                    {DOMAINS_MAP.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 sm:mt-5">
                  {appState === 'resolution' && (
                    <button
                      onClick={handlePrint}
                      className="px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition-colors cursor-pointer"
                    >
                      {t.boardPage.downloadMinutes}
                    </button>
                  )}

                  <button
                    onClick={
                      appState === 'resolution'
                        ? () => {
                            resetAll()
                            setQuestion('')
                          }
                        : handleSubmit
                    }
                    disabled={appState === 'lobby' && !question.trim()}
                    className="px-6 py-2.5 rounded-xl bg-[#00BCD4] text-slate-950 font-semibold text-sm hover:bg-[#00BCD4]/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {appState === 'resolution' ? t.boardPage.newQuery : t.boardPage.conveneBoard}
                  </button>
                </div>
              </div>
            </div>
          )}

          {appState === 'debate' && (
            <div className="text-center">
              <button
                onClick={resetAll}
                className="px-5 py-2 rounded-lg bg-slate-800 text-slate-400 text-sm hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {t.boardPage.cancel}
              </button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
