'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Concentric SVG rings with orbiting nodes. Autonomous rotation,
 * different speeds per ring for parallax effect. Decorative only —
 * sits absolute behind section content, pointer-events disabled.
 */
export default function OrbitalRings({ className = '' }: { className?: string }) {
  const prefersReduced = useReducedMotion()
  const loop = (duration: number) => prefersReduced
    ? { duration: 0 }
    : { duration, repeat: Infinity, ease: 'linear' as const }

  return (
    <div aria-hidden className={`absolute pointer-events-none ${className}`}>
      <svg viewBox="0 0 600 600" className="w-full h-full">
        {/* Outer ring */}
        <motion.g
          style={{ transformOrigin: '300px 300px' }}
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={loop(60)}
        >
          <circle cx="300" cy="300" r="260" fill="none" stroke="rgba(0,191,255,0.35)" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="560" cy="300" r="4" fill="#00BFFF" opacity="0.7" />
          <circle cx="300" cy="40" r="3" fill="#00BFFF" opacity="0.5" />
        </motion.g>

        {/* Middle ring (counter-rotation) */}
        <motion.g
          style={{ transformOrigin: '300px 300px' }}
          animate={prefersReduced ? undefined : { rotate: -360 }}
          transition={loop(45)}
        >
          <circle cx="300" cy="300" r="190" fill="none" stroke="rgba(0,191,255,0.4)" strokeWidth="1" strokeDasharray="2 6" />
          <circle cx="490" cy="300" r="3" fill="#00BFFF" opacity="0.6" />
          <circle cx="110" cy="300" r="5" fill="#00BFFF" opacity="0.8" />
        </motion.g>

        {/* Inner ring */}
        <motion.g
          style={{ transformOrigin: '300px 300px' }}
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={loop(30)}
        >
          <circle cx="300" cy="300" r="130" fill="none" stroke="rgba(0,191,255,0.5)" strokeWidth="1" />
          <circle cx="430" cy="300" r="3" fill="#00BFFF" opacity="0.9" />
          <circle cx="300" cy="170" r="2.5" fill="#00BFFF" opacity="0.7" />
          <circle cx="240" cy="410" r="2" fill="#00BFFF" opacity="0.6" />
        </motion.g>

        {/* Center pulse */}
        <motion.circle
          cx="300" cy="300" r="6" fill="#00BFFF"
          animate={prefersReduced ? undefined : { opacity: [0.3, 0.9, 0.3], scale: [1, 1.4, 1] }}
          transition={prefersReduced ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
