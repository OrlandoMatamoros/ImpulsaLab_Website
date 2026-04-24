'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { sanitizePdfText } from '@/lib/pdf-helpers'

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

export default function AuditExport({
  analyzedUrl,
  analysis,
}: {
  analyzedUrl: string
  analysis: AnalysisResult
}) {
  const { t, language } = useLanguage()
  const tp = t.auditPage
  const [generating, setGenerating] = useState(false)

  async function handleDownload() {
    setGenerating(true)
    try {
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
      const AMBER = [245, 158, 11] as const
      const RED = [239, 68, 68] as const
      const GREEN = [52, 211, 153] as const

      const S = sanitizePdfText

      function scoreColor(score: number): readonly [number, number, number] {
        if (score <= 30) return RED
        if (score <= 60) return AMBER
        if (score <= 80) return CYAN
        return GREEN
      }

      function addFooter(pageNum: number) {
        doc.setFontSize(8)
        doc.setTextColor(...GRAY)
        doc.text(`IMPULSA LAB - ${S(tp.exportPdfTitle)}`, marginL, pageH - 10)
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

      // ===== COVER =====
      doc.setFillColor(...NAVY)
      doc.rect(0, 0, pageW, 95, 'F')

      doc.setFillColor(...CYAN)
      doc.rect(0, 95, pageW, 3, 'F')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(255, 255, 255)
      doc.text('IMPULSA', marginL, 30)
      doc.setTextColor(...CYAN)
      doc.text('LAB', marginL + doc.getTextWidth('IMPULSA '), 30)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(24)
      doc.setTextColor(255, 255, 255)
      const companyTitle = S(analysis.companyName || analyzedUrl)
      const companyLines = doc.splitTextToSize(companyTitle, contentW)
      doc.text(companyLines, marginL, 52)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(12)
      doc.setTextColor(200, 220, 255)
      doc.text(S(tp.exportPdfTitle), marginL, 72)

      doc.setFontSize(9)
      doc.text(
        new Date().toLocaleDateString(language === 'ES' ? 'es-US' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        marginL,
        82
      )
      doc.text(analyzedUrl, marginL, 88)

      // Overall score badge
      y = 115
      const overallColor = scoreColor(analysis.overallScore)
      doc.setFillColor(...LIGHT_BG)
      doc.roundedRect(marginL, y, contentW, 40, 3, 3, 'F')
      doc.setDrawColor(226, 232, 240)
      doc.roundedRect(marginL, y, contentW, 40, 3, 3, 'S')

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...GRAY)
      doc.text(S(tp.overallScore).toUpperCase(), marginL + 8, y + 12)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(36)
      doc.setTextColor(...overallColor)
      doc.text(`${analysis.overallScore}`, marginL + 8, y + 32)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...GRAY)
      doc.text(S(tp.maturityLevel), pageW - marginR - 70, y + 12)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(...NAVY)
      doc.text(S(analysis.maturityLevel), pageW - marginR - 70, y + 26)

      // Section scores grid (6 mini boxes)
      y = 165
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(...NAVY)
      doc.text(S(tp.detailedAnalysis).toUpperCase(), marginL, y)
      y += 6

      const boxW = (contentW - 15) / 3
      const boxH = 22
      analysis.sections.forEach((s, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const x = marginL + col * (boxW + 7.5)
        const by = y + row * (boxH + 5)

        const sColor = scoreColor(s.score)
        doc.setFillColor(...LIGHT_BG)
        doc.roundedRect(x, by, boxW, boxH, 2, 2, 'F')
        doc.setDrawColor(226, 232, 240)
        doc.roundedRect(x, by, boxW, boxH, 2, 2, 'S')

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(14)
        doc.setTextColor(...sColor)
        doc.text(`${s.score}`, x + 5, by + 14)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(...DARK)
        const nameLines = doc.splitTextToSize(S(s.name), boxW - 20)
        doc.text(nameLines[0] || '', x + 18, by + 9)
        if (nameLines[1]) doc.text(nameLines[1], x + 18, by + 14)
      })

      addFooter(1)
      let pageNum = 2

      // ===== SECTION PAGES =====
      analysis.sections.forEach((section, sIdx) => {
        doc.addPage()
        y = 25

        // Score badge
        const sColor = scoreColor(section.score)
        doc.setFillColor(...sColor)
        doc.roundedRect(marginL, y, 14, 14, 2, 2, 'F')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(255, 255, 255)
        doc.text(`${section.score}`, marginL + 7, y + 9.5, { align: 'center' })

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(14)
        doc.setTextColor(...NAVY)
        const titleLines = doc.splitTextToSize(`${sIdx + 1}. ${S(section.name)}`, contentW - 20)
        doc.text(titleLines, marginL + 18, y + 9.5)
        y += 14 + (titleLines.length - 1) * 6

        doc.setFillColor(...CYAN)
        doc.rect(marginL, y + 3, 40, 1.5, 'F')
        y += 10

        // Findings
        if (section.findings.length > 0) {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9)
          doc.setTextColor(...AMBER)
          doc.text(S(tp.findings).toUpperCase(), marginL, y)
          y += 5

          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          doc.setTextColor(...DARK)
          section.findings.forEach((f) => {
            const lines = doc.splitTextToSize(S(f), contentW - 8)
            pageNum = checkPage(lines.length * 5 + 2, pageNum)
            doc.setTextColor(...AMBER)
            doc.text('>', marginL, y)
            doc.setTextColor(...DARK)
            doc.text(lines, marginL + 5, y)
            y += lines.length * 5 + 2
          })

          y += 4
        }

        // Recommendations
        if (section.recommendations.length > 0) {
          pageNum = checkPage(10, pageNum)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9)
          doc.setTextColor(...CYAN)
          doc.text(S(tp.recommendations).toUpperCase(), marginL, y)
          y += 5

          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          doc.setTextColor(...DARK)
          section.recommendations.forEach((r) => {
            const lines = doc.splitTextToSize(S(r), contentW - 8)
            pageNum = checkPage(lines.length * 5 + 2, pageNum)
            doc.setTextColor(...CYAN)
            doc.text('+', marginL, y)
            doc.setTextColor(...DARK)
            doc.text(lines, marginL + 5, y)
            y += lines.length * 5 + 2
          })
        }

        addFooter(pageNum)
        pageNum++
      })

      // ===== TOP RECOMMENDATIONS + SERVICES =====
      if (analysis.topRecommendations?.length || analysis.impulsaServices?.length) {
        doc.addPage()
        y = 25

        if (analysis.topRecommendations?.length) {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(14)
          doc.setTextColor(...NAVY)
          doc.text(S(tp.topRecommendations), marginL, y)
          y += 8

          doc.setFillColor(...CYAN)
          doc.rect(marginL, y - 1, 40, 1.5, 'F')
          y += 6

          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          analysis.topRecommendations.forEach((rec, i) => {
            const lines = doc.splitTextToSize(S(rec), contentW - 10)
            pageNum = checkPage(lines.length * 5 + 4, pageNum)
            doc.setTextColor(...CYAN)
            doc.setFont('helvetica', 'bold')
            doc.text(`${i + 1}.`, marginL, y)
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(...DARK)
            doc.text(lines, marginL + 7, y)
            y += lines.length * 5 + 3
          })

          y += 8
        }

        if (analysis.impulsaServices?.length) {
          pageNum = checkPage(30, pageNum)
          doc.setFillColor(...LIGHT_BG)
          const svcStartY = y
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(12)
          doc.setTextColor(...NAVY)
          doc.text(S(tp.howImpulsaHelps), marginL + 6, y + 8)

          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          doc.setTextColor(...GRAY)
          const descLines = doc.splitTextToSize(S(tp.basedOnAudit), contentW - 12)
          doc.text(descLines, marginL + 6, y + 15)
          let innerY = y + 15 + descLines.length * 5 + 3

          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          doc.setTextColor(...DARK)
          analysis.impulsaServices.forEach((svc) => {
            const lines = doc.splitTextToSize(S(svc), contentW - 16)
            doc.setTextColor(...CYAN)
            doc.text('*', marginL + 6, innerY)
            doc.setTextColor(...DARK)
            doc.text(lines, marginL + 12, innerY)
            innerY += lines.length * 5 + 2
          })

          const svcHeight = innerY - svcStartY + 4
          doc.setFillColor(...LIGHT_BG)
          doc.roundedRect(marginL, svcStartY, contentW, svcHeight, 3, 3, 'F')
          doc.setDrawColor(...CYAN)
          doc.roundedRect(marginL, svcStartY, contentW, svcHeight, 3, 3, 'S')

          // Redraw the content on top of the fill (order matters)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(12)
          doc.setTextColor(...NAVY)
          doc.text(S(tp.howImpulsaHelps), marginL + 6, svcStartY + 8)

          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          doc.setTextColor(...GRAY)
          doc.text(descLines, marginL + 6, svcStartY + 15)
          let innerY2 = svcStartY + 15 + descLines.length * 5 + 3

          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          analysis.impulsaServices.forEach((svc) => {
            const lines = doc.splitTextToSize(S(svc), contentW - 16)
            doc.setTextColor(...CYAN)
            doc.text('*', marginL + 6, innerY2)
            doc.setTextColor(...DARK)
            doc.text(lines, marginL + 12, innerY2)
            innerY2 += lines.length * 5 + 2
          })

          y = svcStartY + svcHeight + 6
        }

        addFooter(pageNum)
      }

      const safe = (analysis.companyName || 'audit')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, '_')
      doc.save(`${safe || 'Audit'}_Web_Audit.pdf`)
    } catch (err) {
      console.error('PDF generation error:', err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={generating}
      className="px-5 py-2.5 rounded-xl text-white font-semibold hover:brightness-110 transition-all text-sm cursor-pointer inline-flex items-center gap-2 disabled:opacity-50 bg-gradient-to-r from-[#002D62] to-[#00BCD4]"
    >
      {generating ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          {tp.exportingPdf}
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {tp.exportPdf}
        </>
      )}
    </button>
  )
}
