'use client';
import { useEffect, useRef } from 'react';

/**
 * Pauses CSS animations on children when the container scrolls out of view.
 * Prevents infinite animations from burning main-thread budget while off-screen.
 * Uses IntersectionObserver — zero JS cost when element is visible.
 *
 * Usage:
 *   <AnimateInView>
 *     <div className="animate-blob" data-animate> ... </div>
 *   </AnimateInView>
 *
 * Or wrap an entire section:
 *   <AnimateInView className="relative">
 *     <BlobBackground />
 *   </AnimateInView>
 */
export function AnimateInView({
  children,
  className = '',
  rootMargin = '100px',
}: {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state — start paused, play when in view
    const setPlayState = (state: 'running' | 'paused') => {
      el.style.animationPlayState = state;
      el.querySelectorAll<HTMLElement>('[data-animate]').forEach((child) => {
        child.style.animationPlayState = state;
      });
    };

    const obs = new IntersectionObserver(
      ([entry]) => setPlayState(entry.isIntersecting ? 'running' : 'paused'),
      { threshold: 0.01, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
