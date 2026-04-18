'use client'

import { Suspense } from 'react'
import VerificationContent from './VerificationContent'

export default function VerificationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <VerificationContent />
    </Suspense>
  )
}
