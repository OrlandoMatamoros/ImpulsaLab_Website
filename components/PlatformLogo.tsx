'use client'

import { useState, type ComponentType } from 'react'

type Props = {
  domain: string
  name: string
  className?: string
  fallback?: 'text' | ComponentType<{ className?: string }>
}

export default function PlatformLogo({
  domain,
  name,
  className = 'h-10 w-auto object-contain',
  fallback = 'text',
}: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    if (fallback === 'text') {
      return <span className={`font-semibold whitespace-nowrap ${className}`}>{name}</span>
    }
    const FallbackIcon = fallback
    return <FallbackIcon className={className} />
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  )
}
