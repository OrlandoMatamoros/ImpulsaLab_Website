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
    q: 'What does an AI consultant for small business actually do?',
    a: 'We find where AI can save you time and money, then we build and launch it inside your business — automations, a WhatsApp AI bot, or workflows connected to the tools you already use. You get working systems, not a strategy report that sits in a drawer.',
  },
  {
    q: 'How much does AI consulting cost for a small business?',
    a: 'You start with a free 30-minute 3D Diagnostic. After that, plans are sized for small budgets: AI automation from $97/mo, a WhatsApp AI customer-service bot from $297/mo, and AI consulting from $97/mo. Clear pricing, no surprise hourly bills.',
  },
  {
    q: 'Do I need to understand technology to work with you?',
    a: 'No technical knowledge required. Your job is to tell us how your business works; our job is to automate it. We connect everything to tools you already use — WhatsApp, Google Sheets, Gmail, your POS — and we train you. If you can use WhatsApp, you can use what we build.',
  },
  {
    q: 'Do you work with restaurants and other local NYC businesses?',
    a: 'Yes. We work with restaurants, retail and e-commerce, professional services, beauty and wellness, and more — across New York City and beyond. As a bilingual, Queens-based team, we serve both English- and Spanish-speaking owners.',
  },
  {
    q: 'How fast will I see results?',
    a: 'It depends on the project, but most automations and WhatsApp bots can go live quickly. From day one your system starts handling repetitive work, and we track real KPIs — hours saved, faster customer replies, fewer manual errors.',
  },
  {
    q: 'Is the 3D Diagnostic really free, and is there any obligation?',
    a: "It's 100% free and there's no obligation. In 30 minutes we review your operations, customers, and finances, and you leave with a clear plan of where AI fits and what it would cost. You decide if and when to move forward.",
  },
]

export default function AiConsultingSmallBusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">AI Consulting for Small Businesses</span>
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
              AI Consulting for Small Businesses in NYC — Real Tools, Not Just Advice
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Stop guessing how AI fits your business. In a free 30-minute 3D Diagnostic, an AI implementation consultant shows you exactly where AI can save you hours and money — and we build it for you. Bilingual team (English / Spanish), based in Queens, NYC. From $97/mo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Book your free 3D Diagnostic
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              5.0 rating on Google · Serving small businesses across NYC &amp; beyond · No long-term contract on starter plans
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Problem */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            You&apos;re busy running your business. AI feels like one more thing you don&apos;t have time for.
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Everyone says &quot;use AI&quot; — but nobody tells a small business owner where to actually start. So you keep doing it the hard way:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'Answering the same customer questions on WhatsApp, phone, and email all day long.',
              'Chasing invoices and copying numbers between spreadsheets by hand.',
              "Missing leads after hours because there's no one to reply.",
              'Watching big competitors automate while you stay stuck doing admin instead of growing.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-lg">
                <AlertIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-700 font-medium">
            Most &quot;AI consultants&quot; hand you a strategy deck and disappear. You don&apos;t need another report. You need tools that work.
          </p>
        </section>

        {/* Solution */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Impulsa Lab actually does</h2>
          <p className="text-lg text-gray-700 mb-6">
            We&apos;re an AI implementation consultant for small businesses — which means we don&apos;t just advise, we build and launch the system inside your business.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              { t: 'AI automations', d: 'Handle repetitive admin — invoice tracking, lead replies, data entry.', price: 'from $97/mo' },
              { t: 'WhatsApp AI bot', d: 'Answers your customers 24/7 in English and Spanish.', price: 'from $297/mo' },
              { t: 'Ongoing AI consulting', d: 'Find your next highest-ROI automation, step by step.', price: 'from $97/mo' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">{item.t}</h3>
                <p className="text-gray-700 text-sm mb-2">{item.d}</p>
                <p className="text-[#002D62] font-bold text-sm">{item.price}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700">
            Clear prices. Real implementation. Measurable KPIs. No jargon, no &quot;it depends&quot; billing surprises.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How it works — 3 simple steps</h2>
          <div className="space-y-6">
            {[
              { label: 'Free 3D Diagnostic (30 min)', desc: 'We look at your business across three dimensions — operations, customers, and finances — and pinpoint exactly where AI will save you the most time and money. You leave with a clear plan, free, no obligation.' },
              { label: 'We build it', desc: 'Our team implements the automation or AI bot for you — connected to the tools you already use (WhatsApp, Google Sheets, Gmail, your POS, and more). You need no technical knowledge.' },
              { label: 'You see results & we track KPIs', desc: 'Your system goes live fast. We measure the impact (hours saved, faster replies, fewer errors) and tune it so it keeps paying for itself.' },
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Small businesses across NYC trust Impulsa Lab</h2>
          <div className="bg-blue-50 border-l-4 border-[#002D62] rounded-r-xl p-6">
            <p className="text-lg text-[#002D62] font-semibold mb-2">
              5.0 rating on Google Business Profile · Bilingual, NYC-based team
            </p>
            <p className="text-gray-700">
              We understand both the anglo and Latino small-business market. Industries we serve: restaurants, retail &amp; e-commerce, professional services, beauty &amp; wellness, and more.
            </p>
          </div>
        </section>

        {/* Offer */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start with a free 3D Diagnostic — then pay only for what works
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Your free 30-minute 3D Diagnostic comes with no cost and no commitment. You&apos;ll walk away knowing exactly which AI tools fit your business and what they&apos;d cost.
          </p>
          <div className="bg-slate-50 border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Plans built for small-business budgets</h3>
            <ul className="space-y-3 text-gray-800">
              <li className="flex justify-between border-b border-gray-200 pb-2"><span>AI Automation</span><span className="font-bold text-[#002D62]">from $97/mo</span></li>
              <li className="flex justify-between border-b border-gray-200 pb-2"><span>WhatsApp AI Customer Service Bot</span><span className="font-bold text-[#002D62]">from $297/mo</span></li>
              <li className="flex justify-between border-b border-gray-200 pb-2"><span>AI Consulting</span><span className="font-bold text-[#002D62]">from $97/mo</span></li>
              <li className="flex justify-between"><span>Free 3D Diagnostic</span><span className="font-bold text-green-600">$0</span></li>
            </ul>
            <p className="text-gray-600 text-sm mt-4">No long-term contracts on starter plans. Cancel anytime. Start small, scale when you see the value.</p>
          </div>
          <div className="text-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#003d82] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book your free 3D Diagnostic
            </Link>
            <p className="text-gray-600 mt-3 text-sm">
              Prefer to talk first? <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#002D62] font-semibold hover:underline">Message us on WhatsApp</a> or call <a href="tel:+13474509281" className="text-[#002D62] font-semibold hover:underline">(347) 450-9281</a>.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to put AI to work in your business?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Book your free 3D Diagnostic and find out — in 30 minutes — exactly where AI can save you time and money. No cost, no obligation, no tech-speak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Book your free 3D Diagnostic
              </Link>
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                <WhatsAppIcon />
                Message us on WhatsApp
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-8">
              Call (347) 450-9281 · Serving small businesses in NYC &amp; beyond, in English and Spanish
            </p>
          </div>
        </section>

      </article>
    </div>
  )
}
