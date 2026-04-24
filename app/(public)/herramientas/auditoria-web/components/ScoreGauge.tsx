'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface ScoreGaugeProps {
  score: number
  label: string
  size?: number
}

function getScoreColor(score: number): string {
  if (score <= 30) return '#ef4444'
  if (score <= 60) return '#f59e0b'
  if (score <= 80) return '#00BCD4'
  return '#34d399'
}

export default function ScoreGauge({ score, label, size = 120 }: ScoreGaugeProps) {
  const { t } = useLanguage()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)

  function getScoreLabel(s: number): string {
    if (s <= 30) return t.auditPage.critical
    if (s <= 60) return t.auditPage.developing
    if (s <= 80) return t.auditPage.good
    return t.auditPage.excellent
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          className="transform -rotate-90"
          style={{ width: size, height: size }}
        >
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? offset : circumference}
            style={{
              transition: 'stroke-dashoffset 1.2s ease-out',
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-bold"
            style={{ color, fontFamily: 'var(--font-mono, monospace)' }}
          >
            {score}
          </span>
        </div>
      </div>
      {label && (
        <div className="text-center">
          <p className="text-sm font-medium text-slate-300">{label}</p>
          <p className="text-xs" style={{ color }}>
            {getScoreLabel(score)}
          </p>
        </div>
      )}
    </div>
  )
}
