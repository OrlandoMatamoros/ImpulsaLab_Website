'use client'

import { useState, type ComponentType } from 'react'

type Props = {
  domain?: string
  /** Local SVG filename (without .svg) in /public/logos/platforms/. Preferred over domain. */
  slug?: string
  name: string
  className?: string
  fallback?: 'text' | ComponentType<{ className?: string }>
}

type Step = 'local' | 'clearbit' | 'fallback'

export default function PlatformLogo({
  domain,
  slug,
  name,
  className = 'h-10 w-auto object-contain',
  fallback = 'text',
}: Props) {
  const initial: Step = slug ? 'local' : domain ? 'clearbit' : 'fallback'
  const [step, setStep] = useState<Step>(initial)

  if (step === 'fallback') {
    if (fallback === 'text') {
      return <span className={`font-semibold whitespace-nowrap ${className}`}>{name}</span>
    }
    const FallbackIcon = fallback
    return <FallbackIcon className={className} />
  }

  const src =
    step === 'local' ? `/logos/platforms/${slug}.svg` : `https://logo.clearbit.com/${domain}`

  return (
    <img
      src={src}
      alt={name}
      className={className}
      loading="lazy"
      onError={() => {
        if (step === 'local' && domain) setStep('clearbit')
        else setStep('fallback')
      }}
    />
  )
}
