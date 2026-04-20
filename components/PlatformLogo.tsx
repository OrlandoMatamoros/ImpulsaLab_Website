'use client'

import { useState, type ComponentType } from 'react'

type Props = {
  domain?: string
  /**
   * Local logo filename (without extension) in /public/logos/platforms/.
   * Component tries <slug>.svg first, then <slug>.png, before falling back
   * to Clearbit or the provided fallback.
   */
  slug?: string
  name: string
  className?: string
  fallback?: 'text' | ComponentType<{ className?: string }>
}

type Step = 'local-svg' | 'local-png' | 'clearbit' | 'fallback'

export default function PlatformLogo({
  domain,
  slug,
  name,
  className = 'h-10 w-auto object-contain',
  fallback = 'text',
}: Props) {
  const initial: Step = slug ? 'local-svg' : domain ? 'clearbit' : 'fallback'
  const [step, setStep] = useState<Step>(initial)

  if (step === 'fallback') {
    if (fallback === 'text') {
      return <span className={`font-semibold whitespace-nowrap ${className}`}>{name}</span>
    }
    const FallbackIcon = fallback
    return <FallbackIcon className={className} />
  }

  const src =
    step === 'local-svg'
      ? `/logos/platforms/${slug}.svg`
      : step === 'local-png'
        ? `/logos/platforms/${slug}.png`
        : `https://logo.clearbit.com/${domain}`

  return (
    <img
      src={src}
      alt={name}
      className={className}
      loading="lazy"
      onError={() => {
        if (step === 'local-svg' && slug) setStep('local-png')
        else if (step === 'local-png' && domain) setStep('clearbit')
        else setStep('fallback')
      }}
    />
  )
}
