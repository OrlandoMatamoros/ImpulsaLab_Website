'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import BusinessPlanForm, { type BusinessPlanFormData } from './components/BusinessPlanForm'
import SectionCard, { type PlanSection } from './components/SectionCard'
import PlanExport from './components/PlanExport'
import { useLanguage } from '@/contexts/LanguageContext'

const ALLOWED_EMAILS = [
  'orlando@tuimpulsalab.com',
]

interface KeyMetrics {
  estimatedRevYear1: string
  breakEvenMonths: string
  initialInvestmentNeeded: string
  projectedMarginYear3: string
}

interface PlanResult {
  businessName: string
  sections: PlanSection[]
  keyMetrics: KeyMetrics
}

const FREE_PLAN_KEY = 'impulsa_bp_count'

function LoadingSkeleton({ step }: { step: number }) {
  const { t } = useLanguage()
  const loadingSteps = t.businessPlanPage.loadingSteps

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
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg audit-shimmer flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-56 audit-shimmer rounded" />
              <div className="h-4 w-32 audit-shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BusinessPlanPage() {
  const { t, language } = useLanguage()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const bp = t.businessPlanPage

  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<PlanResult | null>(null)
  const [error, setError] = useState('')
  const [hasFreePlan, setHasFreePlan] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user || !ALLOWED_EMAILS.includes(user.email || '')) {
      router.replace('/unauthorized')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const count = parseInt(localStorage.getItem(FREE_PLAN_KEY) || '0', 10)
    setHasFreePlan(count < 1)
  }, [])

  const handleReset = useCallback(() => {
    setResult(null)
    setError('')
    setLoadingStep(0)
  }, [])

  async function handleSubmit(formData: BusinessPlanFormData) {
    setLoading(true)
    setError('')
    setResult(null)
    setLoadingStep(0)

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < bp.loadingSteps.length - 1) return prev + 1
        return prev
      })
    }, 4000)

    try {
      const res = await fetch('/api/business-plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale: language }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || bp.unexpectedError)
        return
      }

      setResult(data.plan)

      // Track free plan usage
      const count = parseInt(localStorage.getItem(FREE_PLAN_KEY) || '0', 10)
      localStorage.setItem(FREE_PLAN_KEY, String(count + 1))
      setHasFreePlan(count + 1 < 1)
    } catch (err) {
      console.error('Business plan fetch error:', err)
      setError(err instanceof Error ? err.message : bp.connectionError)
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  if (authLoading || !user || !ALLOWED_EMAILS.includes(user.email || '')) {
    return (
      <div className="bg-slate-950 text-white min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00BCD4] border-t-transparent rounded-full animate-spin" />
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
          <span className="text-slate-500 font-normal"> &mdash; {bp.printTitle}</span>
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
              {bp.newPlan}
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
              <span className="text-white">{bp.heroTitle}</span>{' '}
              <span className="text-[#00BCD4]">{bp.heroHighlight}</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-2">
              {bp.heroSubtitle}
            </p>
            <p className="text-slate-500 text-sm">
              {bp.poweredBy}{' '}
              <span className="font-semibold text-[#00BCD4]">Impulsa Lab</span>
            </p>
          </section>
        )}

        {/* Free plan gate notice */}
        {!result && !loading && !hasFreePlan && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm text-center">
            {bp.freePlanUsed}{' '}
            <a href="/#contacto" className="underline hover:text-amber-300">
              {bp.contactUs}
            </a>
          </div>
        )}

        {/* Form */}
        {!result && !loading && hasFreePlan && (
          <div className="mt-4">
            <BusinessPlanForm onSubmit={handleSubmit} loading={loading} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingSkeleton step={loadingStep} />}

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-8">
            {/* Header */}
            <section className="text-center py-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h2 className="text-3xl font-bold text-white mb-2">{result.businessName}</h2>
              <p className="text-slate-400 text-sm">{bp.planGenerated}</p>

              {/* Key Metrics */}
              {result.keyMetrics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-3xl mx-auto px-4">
                  {[
                    { label: bp.metricRevenue, value: result.keyMetrics.estimatedRevYear1 },
                    { label: bp.metricBreakEven, value: result.keyMetrics.breakEvenMonths },
                    { label: bp.metricInvestment, value: result.keyMetrics.initialInvestmentNeeded },
                    { label: bp.metricMargin, value: result.keyMetrics.projectedMarginYear3 },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800"
                    >
                      <p className="text-xs text-slate-400 mb-1">{m.label}</p>
                      <p className="text-lg font-bold text-[#00BCD4]">{m.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Sections */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">{bp.planSections}</h3>
              {result.sections.map((section, i) => (
                <SectionCard key={section.id} section={section} defaultExpanded={i === 0} />
              ))}
            </section>

            {/* CTA */}
            <section className="p-6 rounded-2xl bg-gradient-to-br from-[#002D62]/15 to-[#00BCD4]/8 border border-[#00BCD4]/25 text-center">
              <h3 className="text-xl font-bold text-white mb-3">{bp.ctaTitle}</h3>
              <p className="text-slate-300 text-sm mb-5 max-w-xl mx-auto">
                {bp.ctaDescription}
              </p>
              <a
                href="/#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:brightness-110 transition-all text-sm bg-gradient-to-r from-[#002D62] to-[#00BCD4]"
              >
                {bp.ctaButton}
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

            {/* Export */}
            <PlanExport onReset={handleReset} plan={result} />
          </div>
        )}

        {/* Features (shown on landing) */}
        {!result && !loading && (
          <section className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto pb-16">
            {[
              {
                title: bp.feature1Title,
                desc: bp.feature1Desc,
                icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
              },
              {
                title: bp.feature2Title,
                desc: bp.feature2Desc,
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              },
              {
                title: bp.feature3Title,
                desc: bp.feature3Desc,
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
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
