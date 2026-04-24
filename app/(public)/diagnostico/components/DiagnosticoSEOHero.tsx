'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function DiagnosticoSEOHero() {
  const { t } = useLanguage()
  const tp = t.diagnosticoSeoHero

  return (
    <section
      className="bg-gradient-to-br from-blue-50 to-white py-12 border-b border-gray-200"
      aria-labelledby="diagnostico-h1"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h1
          id="diagnostico-h1"
          className="text-4xl md:text-5xl font-bold text-[#002D62] mb-6"
        >
          {tp.h1}
        </h1>

        <p className="text-lg text-gray-700 mb-6">{tp.intro}</p>

        <h2 className="text-2xl font-semibold text-[#002D62] mt-8 mb-4">
          {tp.h2Benefits}
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          {tp.benefits.map((b, i) => (
            <li key={i}>
              <strong>{b.strong}</strong>
              {b.rest}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-[#002D62] mt-8 mb-4">
          {tp.h2How}
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
          {tp.steps.map((s, i) => (
            <li key={i}>
              <strong>{s.strong}</strong>
              {s.rest}
            </li>
          ))}
        </ol>

        <p className="text-lg text-gray-700 mb-4">
          {tp.socialProofPrefix}
          <strong>{tp.socialProofStrong}</strong>
          {tp.socialProofSuffix}
        </p>
      </div>
    </section>
  )
}
