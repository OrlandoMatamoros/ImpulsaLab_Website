// Mascota oficial Impulsa Lab — V15 master (mantarraya geométrica 3-ejes).
// Aprobada 2026-05-16 tras 4 rondas de diseño. Cuernos cefálicos + aletas
// trianguladas + cola flagelo + 2 ojos cyan micro.

type MascotVariant = 'default' | 'light' | 'dark' | 'mono'
type MascotExpression = 'neutral' | 'feliz' | 'sorpresa' | 'parpadeo' | 'cool' | 'pensativo'

interface MascotV15Props {
  size?: number
  variant?: MascotVariant
  expression?: MascotExpression
  animate?: boolean
  className?: string
  ariaLabel?: string
}

const COLORS: Record<MascotVariant, { body: string; eyes: string }> = {
  default: { body: '#0a0e1a', eyes: '#00BFFF' },
  light: { body: '#0a0e1a', eyes: '#00BFFF' },
  dark: { body: '#FFFFFF', eyes: '#00BFFF' },
  mono: { body: '#0a0e1a', eyes: '#0a0e1a' },
}

export default function MascotV15({
  size = 64,
  variant = 'default',
  expression = 'neutral',
  animate = false,
  className = '',
  ariaLabel = 'Mascota Impulsa Lab',
}: MascotV15Props) {
  const c = COLORS[variant]

  const renderEyes = () => {
    switch (expression) {
      case 'feliz':
        return (
          <>
            <path d="M114 110 Q118 105 122 110" stroke={c.eyes} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M134 110 Q138 105 142 110" stroke={c.eyes} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        )
      case 'sorpresa':
        return (
          <>
            <circle cx="118" cy="108" r="4" fill={c.eyes} />
            <circle cx="138" cy="108" r="4" fill={c.eyes} />
          </>
        )
      case 'parpadeo':
        return (
          <>
            <line x1="114" y1="108" x2="122" y2="108" stroke={c.eyes} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="134" y1="108" x2="142" y2="108" stroke={c.eyes} strokeWidth="2.5" strokeLinecap="round" />
          </>
        )
      case 'cool':
        return (
          <>
            <rect x="112" y="106" width="12" height="4" rx="2" fill={c.eyes} />
            <rect x="132" y="106" width="12" height="4" rx="2" fill={c.eyes} />
          </>
        )
      case 'pensativo':
        return (
          <>
            <line x1="114" y1="108" x2="122" y2="108" stroke={c.eyes} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="138" cy="108" r="2.5" fill={c.eyes} />
          </>
        )
      case 'neutral':
      default:
        return (
          <>
            <circle cx="118" cy="108" r="2.5" fill={c.eyes} />
            <circle cx="138" cy="108" r="2.5" fill={c.eyes} />
          </>
        )
    }
  }

  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={`${animate ? 'mascot-float' : ''} ${className}`.trim()}
    >
      <line x1="118" y1="78" x2="112" y2="44" stroke={c.body} strokeWidth="7" strokeLinecap="round" />
      <line x1="138" y1="78" x2="144" y2="44" stroke={c.body} strokeWidth="7" strokeLinecap="round" />
      <path
        d="M118 78 L20 130 Q50 160 124 174 L128 178 L132 174 Q206 160 236 130 L138 78 Q128 80 118 78 Z"
        fill={c.body}
      />
      <path
        d="M128 178 Q134 208 122 240"
        stroke={c.body}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {renderEyes()}
    </svg>
  )
}
