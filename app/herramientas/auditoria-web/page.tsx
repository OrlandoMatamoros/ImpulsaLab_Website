'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import ScoreGauge from './components/ScoreGauge'
import SectionCard from './components/SectionCard'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/FirebaseAuthContext'

interface Section {
  id: string
  name: string
  score: number
  findings: string[]
  recommendations: string[]
}

interface AnalysisResult {
  companyName: string
  sections: Section[]
  overallScore: number
  maturityLevel: string
  topRecommendations: string[]
  impulsaServices: string[]
}

function LoadingSkeleton({ step }: { step: number }) {
  const { t } = useLanguage()
  const loadingSteps = t.auditPage.loadingSteps

  return (
    <div className="mt-12 space-y-6 max-w-4xl mx-auto w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/80 border border-slate-800">
          <svg className="w-5 h-5 animate-spin text-[#00BCD4]" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className="text-sm font-medium text-[#00BCD4]">
            {loadingSteps[step] || loadingSteps[loadingSteps.length - 1]}
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 flex items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full audit-shimmer flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-48 audit-shimmer rounded" />
              <div className="h-4 w-32 audit-shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AuditoriaWebPage() {
  const { t } = useLanguage()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [url, setUrl] = useState('')
  const [sourceCode, setSourceCode] = useState('')
  const [showSourceInput, setShowSourceInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [analyzedUrl, setAnalyzedUrl] = useState('')
  const [error, setError] = useState('')

  // Admin gate: only orlando@tuimpulsalab.com
  useEffect(() => {
    if (authLoading) return
    if (!user || user.email !== 'orlando@tuimpulsalab.com') {
      router.replace('/unauthorized')
    }
  }, [user, authLoading, router])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!url && !sourceCode) return

    setLoading(true)
    setError('')
    setResult(null)
    setLoadingStep(0)

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < t.auditPage.loadingSteps.length - 1) return prev + 1
        return prev
      })
    }, 2500)

    try {
      const res = await fetch('/api/auditoria-web/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), sourceCode: sourceCode.trim() }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || t.auditPage.unexpectedError)
        return
      }

      setResult(data.analysis)
      setAnalyzedUrl(data.url || url)
    } catch {
      setError(t.auditPage.connectionError)
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  function handlePrint() {
    window.print()
  }

  function handleReset() {
    setResult(null)
    setError('')
    setUrl('')
    setSourceCode('')
    setShowSourceInput(false)
    setAnalyzedUrl('')
  }

  if (authLoading || !user || user.email !== 'orlando@tuimpulsalab.com') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-slate-400">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-950 text-white min-h-[calc(100vh-4rem)]">
      {/* Print-only header */}
      <div className="print-header hidden print:block text-center py-4 border-b border-slate-300 mb-6">
        <p className="text-lg font-bold" style={{ color: '#002D62' }}>
          <span>IMPULSA </span>
          <span style={{ color: '#00BCD4' }}>LAB</span>
          <span className="text-slate-500 font-normal"> &mdash; {t.auditPage.printTitle}</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Reset button when result shown */}
        {result && (
          <div className="flex justify-end mb-4 no-print">
            <button
              onClick={handleReset}
              className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {t.auditPage.newAudit}
            </button>
          </div>
        )}

        {/* Hero */}
        {!result && !loading && (
          <section className="text-center pt-12 pb-8">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3 text-[#00BCD4]">
              Impulsa Lab
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="text-white">{t.auditPage.smartWebAudit}</span>{' '}
              <span className="text-[#00BCD4]">{t.auditPage.smartWebAuditHighlight}</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-2">
              {t.auditPage.heroSubtitle}
            </p>
            <p className="text-slate-500 text-sm">
              {t.auditPage.poweredBy}{' '}
              <span className="font-semibold text-[#00BCD4]">Impulsa Lab</span>
            </p>
          </section>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`max-w-2xl mx-auto no-print ${result ? 'mb-8' : 'mt-4'}`}
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t.auditPage.placeholder}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || (!url && !sourceCode)}
              className="px-6 py-3 rounded-xl text-white font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap bg-gradient-to-r from-[#002D62] to-[#00BCD4]"
            >
              {loading ? t.auditPage.analyzing : t.auditPage.analyzeButton}
            </button>
          </div>

          {!loading && (
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => setShowSourceInput(!showSourceInput)}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                {showSourceInput ? t.auditPage.hideSourceCode : t.auditPage.showSourceCode}
              </button>
            </div>
          )}

          {showSourceInput && !loading && (
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder={t.auditPage.sourceCodePlaceholder}
              rows={6}
              className="mt-3 w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent transition-all font-mono text-sm resize-y"
            />
          )}
        </form>

        {error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading && <LoadingSkeleton step={loadingStep} />}

        {result && (
          <div className="mt-8 space-y-8">
            <section className="text-center py-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-slate-400 text-sm mb-1">
                {t.auditPage.resultFor}{' '}
                <span className="text-white font-medium">{analyzedUrl}</span>
              </p>
              {result.companyName && (
                <h2 className="text-2xl font-bold text-white mb-6">{result.companyName}</h2>
              )}
              <ScoreGauge score={result.overallScore} label={t.auditPage.overallScore} size={160} />
              <p className="mt-4 text-lg font-semibold text-slate-300">
                {t.auditPage.maturityLevel}{' '}
                <span className="text-[#00BCD4]">{result.maturityLevel}</span>
              </p>
            </section>

            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {result.sections.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-col items-center p-4 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <ScoreGauge score={s.score} label={s.name} size={72} />
                </div>
              ))}
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">{t.auditPage.detailedAnalysis}</h3>
              {result.sections.map((section) => (
                <SectionCard key={section.id} section={section} />
              ))}
            </section>

            {result.topRecommendations && result.topRecommendations.length > 0 && (
              <section className="p-6 rounded-2xl border bg-gradient-to-br from-[#002D62]/15 to-[#00BCD4]/8 border-[#00BCD4]/25">
                <h3 className="text-xl font-bold text-white mb-4">
                  {t.auditPage.topRecommendations}
                </h3>
                <ol className="space-y-3">
                  {result.topRecommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-[#00BCD4]/20 text-[#00BCD4]">
                        {i + 1}
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {result.impulsaServices && result.impulsaServices.length > 0 && (
              <section className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-2">
                  {t.auditPage.howImpulsaHelps}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{t.auditPage.basedOnAudit}</p>
                <ul className="space-y-2 mb-6">
                  {result.impulsaServices.map((service, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-[#00BCD4] mt-0.5">&#10003;</span>
                      {service}
                    </li>
                  ))}
                </ul>
                <a
                  href="/#contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold hover:brightness-110 transition-all text-sm bg-gradient-to-r from-[#002D62] to-[#00BCD4]"
                >
                  {t.auditPage.scheduleFree}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </section>
            )}

            <div className="flex flex-wrap gap-3 justify-center no-print pb-8">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm cursor-pointer"
              >
                {t.auditPage.downloadPdf}
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm cursor-pointer"
              >
                {t.auditPage.analyzeAnother}
              </button>
            </div>
          </div>
        )}

        {!result && !loading && (
          <section className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pb-16">
            {[
              {
                title: t.auditPage.sixDimensions,
                desc: t.auditPage.sixDimensionsDesc,
                icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
              },
              {
                title: t.auditPage.aiAnalysis,
                desc: t.auditPage.aiAnalysisDesc,
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              },
              {
                title: t.auditPage.actionableReport,
                desc: t.auditPage.actionableReportDesc,
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-[#00BCD4]/10">
                  <svg
                    className="w-6 h-6 text-[#00BCD4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={f.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
