import { Suspense } from 'react'
import DiagnosticoClient from './DiagnosticoClient'

export default function DiagnosticoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D62] mx-auto"></div>
        </div>
      </div>
    }>
      <DiagnosticoClient />
    </Suspense>
  )
}
