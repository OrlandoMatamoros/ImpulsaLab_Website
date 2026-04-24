import { LanguageProvider } from '@/contexts/LanguageContext'
import { FirebaseProviders } from '@/components/FirebaseProviders'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DeferredWidgetProvider from '@/components/widgets/DeferredWidgetProvider'
import CookieBanner from '@/components/CookieBanner'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <FirebaseProviders>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <DeferredWidgetProvider />
        <CookieBanner />
      </FirebaseProviders>
    </LanguageProvider>
  )
}
