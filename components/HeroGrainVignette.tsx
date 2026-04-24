'use client'

/**
 * Cinematic grain + vignette overlay. Zero JS runtime cost — pure SVG + CSS.
 * Grain pans via transform: translate on a wrapper (GPU-composited) instead of
 * animating background-position (non-composited/paint-triggering).
 * Respects prefers-reduced-motion (grain freezes, vignette stays).
 */
export default function HeroGrainVignette() {
  return (
    <>
      {/* Grain layer — wrapper animates via transform (composited), inner tile is static */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.18] overflow-hidden"
      >
        <div
          className="hero-grain-wrapper"
        >
          <div
            className="hero-grain"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: '160px 160px',
            }}
          />
        </div>
      </div>
      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 30%, rgba(5,8,18,0.55) 80%, rgba(5,8,18,0.85) 100%)',
        }}
      />
    </>
  )
}
