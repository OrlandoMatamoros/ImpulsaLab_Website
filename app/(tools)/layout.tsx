import { LanguageProvider } from '@/contexts/LanguageContext'
import { FirebaseProviders } from '@/components/FirebaseProviders'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DeferredWidgetProvider from '@/components/widgets/DeferredWidgetProvider'
import CookieBanner from '@/components/CookieBanner'

// FirebaseProviders is scoped here (not at root) so that public routes
// get clean Server Component trees with all JSON-LD schemas rendered inline.
// FirebaseProviders uses dynamic({ ssr: false }) internally — importing it
// in a Server Component is valid; only the client boundary activates on hydration.
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProviders>
      <LanguageProvider>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <DeferredWidgetProvider />
        <CookieBanner />
      </LanguageProvider>
    </FirebaseProviders>
  )
}
