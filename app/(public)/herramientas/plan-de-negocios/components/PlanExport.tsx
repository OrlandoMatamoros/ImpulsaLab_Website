'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { sanitizePdfText } from '@/lib/pdf-helpers'
import type { PlanSection } from './SectionCard'

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function PlanExport({
  onReset,
  plan,
}: {
  onReset: () => void
  plan: PlanResult
}) {
  const { t, language } = useLanguage()
  const bp = t.businessPlanPage
  const [generating, setGenerating] = useState(false)
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  async function handleDownloadClick() {
    setEmailError('')
    setShowEmailGate(true)
  }

  async function handleEmailSubmit() {
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setEmailError(bp.emailInvalid)
      return
    }

    setEmailError('')
    setGenerating(true)

    // Fire-and-forget lead capture — do not block the PDF if it fails.
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: trimmed,
        source: 'business-plan-builder',
        locale: language,
        metadata: { businessName: plan.businessName },
      }),
      signal: AbortSignal.timeout(15000),
    }).catch((err) => {
      console.error('Lead capture failed:', err)
    })

    try {
      await generatePDF()
    } finally {
      setGenerating(false)
      setShowEmailGate(false)
    }
  }

  async function generatePDF() {
    const { default: jsPDF } = await import('jspdf')
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    const marginL = 20
    const marginR = 20
    const contentW = pageW - marginL - marginR
    let y = 0

    const NAVY = [0, 45, 98] as const
    const CYAN = [0, 188, 212] as const
    const DARK = [30, 41, 59] as const
    const GRAY = [100, 116, 139] as const
    const LIGHT_BG = [248, 250, 252] as const

    const S = sanitizePdfText

    function addFooter(pageNum: number) {
      doc.setFontSize(8)
      doc.setTextColor(...GRAY)
      doc.text(`IMPULSA LAB - ${S(bp.printTitle)}`, marginL, pageH - 10)
      doc.text(`${pageNum}`, pageW - marginR, pageH - 10, { align: 'right' })
      doc.setDrawColor(226, 232, 240)
      doc.line(marginL, pageH - 14, pageW - marginR, pageH - 14)
    }

    function checkPage(needed: number, pageNum: number): number {
      if (y + needed > pageH - 20) {
        addFooter(pageNum)
        doc.addPage()
        y = 25
        return pageNum + 1
      }
      return pageNum
    }

    // ===== COVER PAGE =====
    doc.setFillColor(...NAVY)
    doc.rect(0, 0, pageW, 85, 'F')

    doc.setFillColor(...CYAN)
    doc.rect(0, 85, pageW, 3, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(255, 255, 255)
    doc.text('IMPULSA', marginL, 30)
    doc.setTextColor(...CYAN)
    doc.text('LAB', marginL + doc.getTextWidth('IMPULSA '), 30)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(28)
    doc.setTextColor(255, 255, 255)
    doc.text(S(plan.businessName), marginL, 55)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(14)
    doc.setTextColor(200, 220, 255)
    doc.text(S(bp.printTitle), marginL, 68)

    doc.setFontSize(10)
    doc.text(
      new Date().toLocaleDateString(language === 'ES' ? 'es-US' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      marginL,
      78
    )

    if (plan.keyMetrics) {
      y = 105
      const boxW = (contentW - 9) / 4
      const metrics = [
        { label: bp.metricRevenue, value: plan.keyMetrics.estimatedRevYear1 },
        { label: bp.metricBreakEven, value: plan.keyMetrics.breakEvenMonths },
        { label: bp.metricInvestment, value: plan.keyMetrics.initialInvestmentNeeded },
        { label: bp.metricMargin, value: plan.keyMetrics.projectedMarginYear3 },
      ]

      metrics.forEach((m, i) => {
        const x = marginL + i * (boxW + 3)
        doc.setFillColor(...LIGHT_BG)
        doc.roundedRect(x, y, boxW, 28, 2, 2, 'F')
        doc.setDrawColor(226, 232, 240)
        doc.roundedRect(x, y, boxW, 28, 2, 2, 'S')

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(...GRAY)
        doc.text(S(m.label), x + 4, y + 10)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(...NAVY)
        doc.text(S(m.value), x + 4, y + 21)
      })
    }

    y = 155
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...NAVY)
    doc.text(S(bp.planSections).toUpperCase(), marginL, y)
    y += 8

    plan.sections.forEach((section, i) => {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(...DARK)
      doc.text(`${i + 1}. ${S(section.title)}`, marginL + 4, y)
      y += 6
    })

    addFooter(1)
    let pageNum = 2

    // ===== CONTENT PAGES =====
    plan.sections.forEach((section, sIdx) => {
      doc.addPage()
      y = 25

      doc.setFillColor(...NAVY)
      doc.roundedRect(marginL, y, 10, 10, 2, 2, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.setTextColor(255, 255, 255)
      doc.text(`${sIdx + 1}`, marginL + 3.5, y + 7.5)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(...NAVY)
      const titleLines = doc.splitTextToSize(S(section.title), contentW - 16)
      doc.text(titleLines, marginL + 14, y + 7.5)
      y += 10 + (titleLines.length - 1) * 6

      doc.setFillColor(...CYAN)
      doc.rect(marginL, y + 3, 40, 1.5, 'F')
      y += 10

      if (section.highlights.length > 0) {
        let hlHeight = 10
        section.highlights.forEach((h) => {
          const lines = doc.splitTextToSize(S(h), contentW - 16)
          hlHeight += lines.length * 5 + 2
        })

        pageNum = checkPage(hlHeight + 5, pageNum)

        doc.setFillColor(240, 253, 250)
        doc.roundedRect(marginL, y, contentW, hlHeight, 2, 2, 'F')
        doc.setDrawColor(153, 246, 228)
        doc.roundedRect(marginL, y, contentW, hlHeight, 2, 2, 'S')

        y += 6
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        doc.setTextColor(...CYAN)
        doc.text(S(bp.keyHighlights).toUpperCase(), marginL + 6, y)
        y += 5

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(...DARK)
        section.highlights.forEach((h) => {
          const lines = doc.splitTextToSize(S(h), contentW - 20)
          pageNum = checkPage(lines.length * 5 + 2, pageNum)
          doc.setTextColor(0, 160, 180)
          doc.text('*', marginL + 6, y)
          doc.setTextColor(...DARK)
          doc.text(lines, marginL + 12, y)
          y += lines.length * 5 + 2
        })

        y += 6
      }

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9.5)
      doc.setTextColor(...DARK)

      const paragraphs = section.content.split('\n').filter((p) => p.trim())

      paragraphs.forEach((para) => {
        const trimmed = para.trim()

        if (trimmed.startsWith('|')) {
          const cells = trimmed
            .split('|')
            .filter((c) => c.trim())
            .map((c) => c.trim())

          if (cells.every((c) => /^[-:]+$/.test(c))) return

          const isHeader =
            paragraphs.indexOf(para) === paragraphs.findIndex((p) => p.trim().startsWith('|'))
          const colW = contentW / cells.length

          pageNum = checkPage(8, pageNum)

          if (isHeader) {
            doc.setFillColor(...NAVY)
            doc.rect(marginL, y - 3.5, contentW, 7, 'F')
            doc.setFont('helvetica', 'bold')
            doc.setFontSize(8)
            doc.setTextColor(255, 255, 255)
          } else {
            doc.setDrawColor(226, 232, 240)
            doc.line(marginL, y + 3, marginL + contentW, y + 3)
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(8)
            doc.setTextColor(...DARK)
          }

          cells.forEach((cell, ci) => {
            const cellText = doc.splitTextToSize(S(cell), colW - 4)
            doc.text(cellText[0] || '', marginL + ci * colW + 2, y)
          })

          y += 7
          return
        }

        const lines = doc.splitTextToSize(S(trimmed), contentW)
        lines.forEach((line: string) => {
          pageNum = checkPage(5.5, pageNum)
          doc.text(line, marginL, y)
          y += 5
        })
        y += 3
      })

      addFooter(pageNum)
      pageNum++
    })

    // ===== CTA PAGE =====
    doc.addPage()
    y = pageH / 2 - 30

    doc.setFillColor(...LIGHT_BG)
    doc.roundedRect(marginL, y - 15, contentW, 70, 4, 4, 'F')
    doc.setDrawColor(...CYAN)
    doc.roundedRect(marginL, y - 15, contentW, 70, 4, 4, 'S')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(...NAVY)
    const ctaTitleLines = doc.splitTextToSize(S(bp.ctaTitle), contentW - 20)
    doc.text(ctaTitleLines, pageW / 2, y + 5, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...GRAY)
    const ctaDescLines = doc.splitTextToSize(S(bp.ctaDescription), contentW - 30)
    doc.text(ctaDescLines, pageW / 2, y + 20, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...CYAN)
    doc.text('www.tuimpulsalab.com', pageW / 2, y + 42, { align: 'center' })

    addFooter(pageNum)

    const safeName = plan.businessName.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_')
    doc.save(`${safeName || 'Business'}_Business_Plan.pdf`)
  }

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center no-print pb-8">
        <button
          onClick={handleDownloadClick}
          disabled={generating}
          className="px-5 py-2.5 rounded-xl text-white font-semibold hover:brightness-110 transition-all text-sm cursor-pointer inline-flex items-center gap-2 disabled:opacity-50 bg-gradient-to-r from-[#002D62] to-[#00BCD4]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {bp.exportPdf}
        </button>
        <button
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm cursor-pointer inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {bp.newPlan}
        </button>
      </div>

      {/* Email gate modal */}
      {showEmailGate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm no-print"
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-gate-title"
        >
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 id="email-gate-title" className="text-xl font-bold text-white mb-2">
              {bp.emailGateTitle}
            </h3>
            <p className="text-sm text-slate-400 mb-5">{bp.emailGateSubtitle}</p>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !generating) handleEmailSubmit()
              }}
              placeholder={bp.emailGatePlaceholder}
              disabled={generating}
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent transition-all disabled:opacity-50"
            />

            {emailError && (
              <p className="mt-2 text-sm text-red-400">{emailError}</p>
            )}

            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => {
                  setShowEmailGate(false)
                  setEmail('')
                  setEmailError('')
                }}
                disabled={generating}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm cursor-pointer disabled:opacity-50"
              >
                {bp.emailGateCancel}
              </button>
              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={generating || !email.trim()}
                className="flex-1 px-4 py-2.5 rounded-xl text-white font-semibold hover:brightness-110 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#002D62] to-[#00BCD4] inline-flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    {bp.emailGateSending}
                  </>
                ) : (
                  bp.emailGateSubmit
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
