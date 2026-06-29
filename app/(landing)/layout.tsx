import type { ReactNode } from 'react'

// Layout enfocado para landings de campañas pagadas: sin navbar ni footer global,
// para máximo message-match y conversión. El <html>/<body> y el gtag de Google Ads
// vienen del root app/layout.tsx, así que esta landing hereda el tag automáticamente.
export default function LandingLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#0a0e1a] text-white">{children}</div>
}
