import type { Metadata } from 'next'
import WhatsAppCTA from './WhatsAppCTA'

export const metadata: Metadata = {
  title: 'Aprende a Usar IA en tu Negocio — Sesión 1-a-1 $297 | Impulsa Academy',
  description:
    'Capacitación práctica en IA para dueños de PYME, en español. Sesión 1-a-1 de 3 horas con plan de acción de 30 días. Escríbenos por WhatsApp.',
  robots: { index: false, follow: true }, // landing de campaña: no competir en orgánico con /capacitacion
  alternates: { canonical: 'https://www.tuimpulsalab.com/aprende-ia' },
}

export default function AprendeIaPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-12">
      {/* HERO */}
      <section className="text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#00BCD4]">
          Impulsa Academy
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
          Aprende a usar IA en tu negocio
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Sesión 1-a-1 de 3 horas, en español. Configuramos tus herramientas y sales con un plan de
          acción de 30 días. <span className="font-semibold text-white">Desde $297.</span>
        </p>
        <div className="mt-8">
          <WhatsAppCTA />
        </div>
        <p className="mt-3 text-sm text-gray-400">Te respondemos hoy mismo por WhatsApp.</p>
      </section>

      {/* BENEFICIOS */}
      <section className="grid gap-6 sm:grid-cols-3">
        {[
          ['Para dueños, no técnicos', 'Sin tecnicismos. Aprendes con casos reales de tu propio negocio.'],
          ['Práctico, no teoría', '3-5 casos en vivo: chatbots, prompts y automatización aplicada.'],
          ['Resultados desde el día 1', 'Sales con tus cuentas configuradas y un plan de acción de 30 días.'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-bold text-[#00BCD4]">{t}</h3>
            <p className="mt-2 text-sm text-gray-300">{d}</p>
          </div>
        ))}
      </section>

      {/* QUÉ INCLUYE */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Qué incluye tu Sesión Esencial ($297)</h2>
        <ul className="space-y-2 text-gray-300">
          {[
            'Configuración de tus cuentas y herramientas de IA',
            'Fundamentos de prompts aplicados a tu negocio',
            '3-5 casos prácticos resueltos en vivo',
            'Plan de acción personalizado de 30 días',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="text-[#00BCD4]">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-400">
          ¿Quieres más profundidad? El Intensivo de 6 horas está en $497. ¿Equipo completo? Taller
          empresarial disponible — escríbenos y te asesoramos.
        </p>
      </section>

      {/* CIERRE */}
      <section className="rounded-2xl border border-[#00BCD4]/30 bg-[#00BCD4]/10 p-8 text-center">
        <h2 className="text-2xl font-bold">Empieza hoy</h2>
        <p className="mx-auto mt-2 max-w-md text-gray-300">
          Escríbenos por WhatsApp y te decimos el siguiente cupo disponible.
        </p>
        <div className="mt-6">
          <WhatsAppCTA />
        </div>
      </section>
    </main>
  )
}
