import Link from 'next/link'
import { LINKS } from '@/lib/constants'

// Reusable check icon (green) — same pattern as the ES service pages
function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

// Reusable alert icon (red) — for the problem bullets
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
    q: 'What is AI automation for a small business, exactly?',
    a: "It's software that does your repetitive tasks for you — answering customer messages, capturing and following up on leads, logging invoices, sending reminders, and moving data between the tools you already use. We build it with n8n and Claude AI so it runs 24/7 without you babysitting it. You don't need any technical knowledge; if you can use WhatsApp and Google Sheets, you can use what we build.",
  },
  {
    q: 'How much does it cost, and are there hidden fees?',
    a: 'Plans start at $97/mo for workflow automation and AI consulting, and from $297/mo for a full WhatsApp AI customer service bot. The free 3D Diagnostic costs $0. The only possible extra costs are third-party platform fees you would pay anyway (for example, WhatsApp Business API usage). We walk through any of that with you in the Diagnostic before you commit — no surprises.',
  },
  {
    q: 'How fast can it go live?',
    a: 'Most small-business automations go live in days, not months. The WhatsApp AI bot can start answering customers from day one. We build and test with your real data first, then launch, train your team, and support you through the first month.',
  },
  {
    q: 'Do you work with my industry — like a dental office or a restaurant?',
    a: 'Yes. We build AI automation for dental and medical offices, restaurants and food service, salons and spas, accounting firms, and retail shops, plus other service businesses. Each setup is tailored to how your business actually runs — we will cover the right use cases for your industry in the free Diagnostic.',
  },
  {
    q: 'Do I need to know anything technical, or hire an AI automation expert in-house?',
    a: "No. We're your AI automation and n8n expert for hire — that's the whole point of working with us. You tell us how your business works; we design, build, connect, and maintain the system. We hand it over with plain-language training so you and your team can run the day-to-day without depending on us for every change.",
  },
  {
    q: 'Do you serve businesses near me in NYC?',
    a: "Yes. We're a service-area business based in Queens, NYC, serving small businesses across the five boroughs and the wider New York area — and remotely across the U.S. and LATAM. We're bilingual in English and Spanish, so we can work with you in whichever you prefer.",
  },
]

export default function AiAutomationSmallBusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">AI Automation for Small Business</span>
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
              AI Automation for Small Business in NYC — Real Systems, Not Slides
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We build the AI automations that answer your customers, track your invoices, and capture your leads — running 24/7 so you don&apos;t have to. Bilingual team in Queens, NYC. Real implementation with measurable KPIs, from $97/mo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Get your free 3D Diagnostic (30 min)
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
              5.0 rating on Google · Bilingual English &amp; Spanish · NYC-based, serving the U.S. &amp; LATAM · No technical knowledge required
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 max-w-4xl">

        {/* Problem */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            You&apos;re the owner, the operator, and the answering machine
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            If you run a small business, your day already has too many jobs in it. The repetitive ones are quietly costing you money:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'Customers message you at 11pm on WhatsApp asking about hours, prices, and bookings — and you lose them when no one replies fast enough.',
              'Invoices, receipts, and payments live in your inbox and your head. You reconcile them on Sundays, by hand.',
              'Leads come in from your website, Instagram, and Google — but follow-up is slow, so they go cold.',
              "You're paying people to copy data between Excel, email, and your POS, instead of growing the business.",
              "Bigger competitors already have AI doing this for them. You don't, yet.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-lg">
                <AlertIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-700 font-medium">
            Every one of these is a repeatable task. And repeatable tasks are exactly what AI automation is built to take off your plate.
          </p>
        </section>

        {/* Solution */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We set up the AI that handles the busywork for you
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Impulsa Lab is a bilingual AI automation agency based in Queens, NYC. We don&apos;t sell you an 80-page strategy deck — we build the actual systems and hand them over working. We use n8n (the automation engine), Claude AI (the brain that understands your customers), and the tools you already use, like WhatsApp, Gmail, Google Sheets, Square, and QuickBooks.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              { t: '24/7 AI customer service', d: 'A WhatsApp AI bot that answers questions, shares prices, takes bookings, and only escalates to you when it truly needs a human.' },
              { t: 'Lead capture & instant follow-up', d: 'Catch every lead from your website and channels, qualify it, and respond automatically in seconds.' },
              { t: 'Invoice & payment tracking', d: 'Pull data from incoming invoices, log it automatically, and get a clean daily summary instead of a Sunday spreadsheet marathon.' },
              { t: 'Workflow automation for any repetitive task', d: "If it's a step-by-step process, an n8n automation consultant on our team can wire it up to run on its own." },
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
            Built for your industry — whether you run a dental office, a restaurant, a salon, or a retail shop. You don&apos;t need to know any tech. You tell us how your business works; we automate it.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How it works — 3 simple steps</h2>
          <div className="space-y-6">
            {[
              { label: 'Free 3D Diagnostic (30 min)', desc: 'We meet over video and look at your business across three axes: Finance, Operations, and Marketing. We pinpoint the 1–3 automations with the highest ROI for your specific business. You leave with a clear action plan — whether you hire us or not.' },
              { label: 'We build it', desc: 'We configure and connect everything to the tools you already use, then test it with your real data. Most projects go live in days, not months. You stay in your business; we handle the technical work.' },
              { label: 'Launch, train & support', desc: 'Your system goes live. We train you and your team to run it in plain language, hand over full access, and stay on for the first month to fine-tune it as real cases come in. Simple monthly plans from $97/mo — no long-term lock-in to get started.' },
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

        {/* Proof — only verifiable facts; real testimonials to be added by Orlando (do not invent) */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Trusted by small business owners in NYC</h2>
          <div className="bg-blue-50 border-l-4 border-[#002D62] rounded-r-xl p-6">
            <p className="text-lg text-[#002D62] font-semibold mb-2">
              5.0 rating on Google · Service-area business based in Queens, NYC
            </p>
            <p className="text-gray-700">
              We work with restaurants, dental and medical offices, salons, accounting firms, and retail shops across NYC and LATAM — in English and Spanish.
            </p>
          </div>
        </section>

        {/* Offer */}
        <section className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start with a free 3D Diagnostic — then automate from $97/mo
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            There&apos;s no cost and no obligation. In 30 minutes we map your highest-ROI automation and give you a clear plan and price. If it&apos;s a fit, you start small and scale when you see the value.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">What you get in the free Diagnostic</h3>
              <ul className="space-y-3">
                {[
                  'A review of your Finance, Operations & Marketing processes',
                  'The top 1–3 automations to do first, ranked by ROI',
                  'A clear price and timeline — no hidden fees',
                  'An honest answer on whether AI is worth it for you right now',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent pricing</h3>
              <ul className="space-y-3 text-gray-800">
                <li className="flex justify-between border-b border-gray-200 pb-2"><span>Workflow automation</span><span className="font-bold text-[#002D62]">from $97/mo</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span>AI consulting for small business</span><span className="font-bold text-[#002D62]">from $97/mo</span></li>
                <li className="flex justify-between border-b border-gray-200 pb-2"><span>WhatsApp AI customer service bot</span><span className="font-bold text-[#002D62]">from $297/mo</span></li>
                <li className="flex justify-between"><span>Free 3D Diagnostic</span><span className="font-bold text-green-600">$0</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#003d82] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get your free 3D Diagnostic (30 min)
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
              30 minutes. No cost. No commitment. Just a clear answer on what to automate first for the biggest ROI — built and supported by a bilingual team right here in NYC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostico"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#002D62] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Get your free 3D Diagnostic (30 min)
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
            <p className="text-blue-200 text-sm mt-8">
              Impulsa Lab · Queens, NYC · Serving the U.S. &amp; LATAM · English &amp; Español · Call (347) 450-9281
            </p>
          </div>
        </section>

      </article>
    </div>
  )
}
