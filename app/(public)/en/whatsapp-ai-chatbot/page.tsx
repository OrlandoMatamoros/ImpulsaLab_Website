import Link from 'next/link'
import { LINKS } from '@/lib/constants'

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const FAQS = [
  {
    q: 'What is a WhatsApp AI chatbot for business?',
    a: "It's an AI assistant connected to your WhatsApp Business number that automatically answers customer messages, books appointments, and captures leads 24/7 — in English and Spanish. It replies instantly so you never miss a customer, even when you're busy or closed.",
  },
  {
    q: 'Do I need any tech skills or to install anything?',
    a: "No. This is a done-for-you service. We build, set up, test, and launch the chatbot on your existing WhatsApp Business number. You don't write any code or install software — we handle the whole setup.",
  },
  {
    q: 'How long does setup take?',
    a: 'Most setups go live in days, not months. After your free 3D Diagnostic, we build your chatbot around how your business actually works, test every conversation, and launch it for you.',
  },
  {
    q: 'Can it speak both English and Spanish?',
    a: "Yes. We're a bilingual NYC team and your chatbot answers customers in both English and Spanish automatically — ideal for serving diverse neighborhoods across the city.",
  },
  {
    q: 'Will the chatbot replace me or my staff?',
    a: 'No — it handles the repetitive questions and bookings so you and your team can focus on real work. The moment a conversation needs a human, it hands off to you. Think of it as your tireless first responder, not a replacement.',
  },
  {
    q: 'How much does it cost?',
    a: "The WhatsApp AI chatbot service starts at $297/mo with clear, upfront pricing and no surprise fees. The best place to start is the free 3D Diagnostic — a 30-minute call to see if it's the right fit before you commit to anything.",
  },
]

export default function WhatsAppAiChatbotPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">WhatsApp AI Chatbot for Business</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-[#002D62] text-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              WhatsApp AI Chatbot for Business — Answer Every Customer 24/7
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Stop losing customers to missed messages. We build and set up a WhatsApp AI chatbot that replies instantly, books appointments, and captures leads for your business — day and night, in English and Spanish.
            </p>
            <p className="text-lg text-blue-200 mb-8 font-medium">Done for you. No tech skills needed. Up and running in days, not months.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Get your free 3D Diagnostic
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <WhatsAppIcon />
                Chat with us on WhatsApp now
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              Based in Queens, NYC · Bilingual (English &amp; Spanish) · 5.0 rating on Google · Clear pricing, real results
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Problem */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            You&apos;re losing business while you sleep — and while you work
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Every missed WhatsApp message is a customer who went to your competitor. If you run a small business in NYC, you know the drill:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "Messages pile up while you're serving customers, on a job, or closed for the night.",
              'People ask the same questions over and over — hours, prices, location, "are you open?"',
              'Bookings and quotes slip through the cracks because nobody replied in time.',
              "You can't afford to hire someone just to sit on the phone all day.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-lg">
                <AlertIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-700 font-medium">
            Customers expect an answer in minutes. When they don&apos;t get one, they move on.
          </p>
        </section>

        {/* Solution */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            A WhatsApp AI chatbot that works like your best employee — without the payroll
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Impulsa Lab sets up an AI assistant right inside your WhatsApp Business number. It understands what customers are asking and answers in plain language, in English or Spanish, automatically.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              { t: 'Answer common questions instantly', d: 'Hours, prices, location, services — answered the moment a customer asks.' },
              { t: 'Book appointments & reservations', d: 'Straight into your calendar, with no back-and-forth.' },
              { t: 'Capture leads & contact info', d: 'So you can follow up and close the sale instead of losing it.' },
              { t: 'Hand off to a real person', d: 'The moment a conversation needs a human touch, it passes it to you.' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.t}</h3>
                    <p className="text-gray-700 text-sm">{item.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700">
            We build it around your business, test it, and launch it for you. You just watch the conversations — and the bookings — come in.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Three simple steps to your own WhatsApp AI chatbot</h2>
          <div className="space-y-6">
            {[
              { label: 'Free 3D Diagnostic (30 min)', desc: 'We get on a call, learn how your business runs, and map the exact questions and tasks your chatbot should handle. You leave with a clear plan.' },
              { label: 'We build & set it up', desc: "Our team builds your bilingual WhatsApp AI chatbot, connects it to your WhatsApp Business number and calendar, and tests every conversation. You don't touch a line of code." },
              { label: 'Go live & improve', desc: 'Your chatbot goes live answering customers 24/7. We track results with real KPIs and fine-tune it every month so it keeps getting better.' },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl border-2 bg-blue-50 border-blue-200">
                <div className="flex-shrink-0 w-12 h-12 bg-[#002D62] text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{step.label}</h3>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Real NYC businesses, real conversations handled</h2>
          <div className="bg-blue-50 border-l-4 border-[#002D62] rounded-r-xl p-6">
            <p className="text-lg text-[#002D62] font-semibold mb-2">
              We run live WhatsApp AI chatbots in production for real clients · 5.0 rating on Google
            </p>
            <p className="text-gray-700">
              Bilingual setups serving restaurants, clinics, salons and service businesses across NYC — in English and Spanish.
            </p>
          </div>
        </section>

        {/* Offer */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start with a free 3D Diagnostic. Launch from $297/mo.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">Your free 3D Diagnostic (30 min, $0)</h3>
              <ul className="space-y-3">
                {[
                  'A walkthrough of how a WhatsApp AI chatbot fits your specific business',
                  'The exact questions and tasks it would automate for you',
                  'A clear, no-pressure plan and what to expect',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp AI Chatbot — from $297/mo</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><CheckIcon /><span>Done-for-you build, setup, and launch on your WhatsApp Business number</span></li>
                <li className="flex items-start gap-2"><CheckIcon /><span>Bilingual (English &amp; Spanish) AI that answers, books, and captures leads 24/7</span></li>
                <li className="flex items-start gap-2"><CheckIcon /><span>Monthly tuning and KPI reporting so it keeps improving</span></li>
                <li className="flex items-start gap-2"><CheckIcon /><span>Clear pricing. No surprise fees.</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#003d82] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get your free 3D Diagnostic
            </Link>
            <p className="text-gray-600 mt-3 text-sm">
              Book the free diagnostic first — you only move forward if it makes sense for you.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQS.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900">{item.q}</h3>
                </div>
                <div className="px-6 py-5 bg-white">
                  <p className="text-gray-700">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-[#002D62] to-[#0057b8] px-8 py-14 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to stop missing customers?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Get your free 3D Diagnostic — a 30-minute call to see exactly how a WhatsApp AI chatbot would work for your business. No cost, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Get your free 3D Diagnostic
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-all duration-300"
              >
                <WhatsAppIcon />
                Message us on WhatsApp
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-8">
              Based in Ozone Park, Queens · Serving small businesses across NYC and beyond, in English and Spanish · Call (347) 450-9281
            </p>
          </div>
        </section>

      </article>
    </div>
  )
}
