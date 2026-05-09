'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TestimonialsBar() {
  const { t } = useLanguage()
  const testimonials = t.testimonials.items
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="bg-gray-50 border-y border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Quote */}
          <div className="relative min-h-[80px] flex items-center justify-center">
            {testimonials.map((item: { quote: string; name: string; business: string; location: string }, index: number) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <p className="text-lg md:text-xl text-gray-800 italic font-medium mb-3">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold text-gray-700">{item.name}</span>
                  <span>&mdash;</span>
                  <span>{item.business}, {item.location}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_: unknown, index: number) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-brand-navy w-6' : 'bg-gray-300'
                }`}
                aria-label={`Testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
