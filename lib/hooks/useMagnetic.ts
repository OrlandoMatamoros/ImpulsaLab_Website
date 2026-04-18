'use client'

import { useRef, useEffect } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * useMagnetic — hook for subtle magnetic hover on CTAs.
 *
 * Attaches mousemove/mouseleave listeners to the element and returns two
 * MotionValues (x, y) you can bind to a <motion.*> element via style.
 * Max displacement capped at `strength` px (default 15). Respects
 * prefers-reduced-motion: the motion values stay at 0.
 *
 * Usage:
 *   const { ref, x, y } = useMagnetic()
 *   return <motion.a ref={ref} style={{ x, y }}>...</motion.a>
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength = 15,
  radius = 150,
) {
  const ref = useRef<T | null>(null)
  const prefersReduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius) {
        x.set(0)
        y.set(0)
        return
      }
      const factor = 1 - dist / radius
      x.set((dx / radius) * strength * factor * 2)
      y.set((dy / radius) * strength * factor * 2)
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [prefersReduced, radius, strength, x, y])

  return { ref, x, y }
}
