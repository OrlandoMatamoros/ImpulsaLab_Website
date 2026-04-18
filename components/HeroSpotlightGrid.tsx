'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function HeroSpotlightGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)
  const x = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.4 })
  const y = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.4 })

  useEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
    const onLeave = () => {
      const rect = el.getBoundingClientRect()
      mouseX.set(rect.width / 2)
      mouseY.set(rect.height / 2)
    }
    onLeave()
    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [mouseX, mouseY, prefersReduced])

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static SVG grid */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(0,191,255,0.08)" strokeWidth="1" />
          </pattern>
          <radialGradient id="hero-grid-fade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-grid-mask">
            <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#hero-grid-mask)" />
      </svg>

      {/* Moving spotlight that illuminates the grid */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(0,191,255,0.14) 0%, rgba(0,191,255,0.06) 35%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Strong outer vignette — preserves navy deep tone */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 45%, transparent 25%, rgba(5,8,18,0.7) 85%, rgba(5,8,18,0.95) 100%)',
        }}
      />
    </div>
  )
}
