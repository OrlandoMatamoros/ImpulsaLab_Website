import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Designer',
  description: 'Herramienta de diseno de prompts de Impulsa Lab.',
  robots: { index: false, follow: false },
}

export default function PromptDesignerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
