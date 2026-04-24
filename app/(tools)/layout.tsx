import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DeferredWidgetProvider from '@/components/widgets/DeferredWidgetProvider'
import CookieBanner from '@/components/CookieBanner'

// FirebaseProviders is now mounted at root layout (app/layout.tsx) so auth
// persists across route groups. No need to re-wrap here.
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <DeferredWidgetProvider />
      <CookieBanner />
    </LanguageProvider>
  )
}
