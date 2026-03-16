'use client';

// app/legal/terminos/page.tsx
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsOfService() {
  const { t, language } = useLanguage();

  return (
    <>
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          {t.terminosPage.volverInicio}
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">{t.terminosPage.titulo}</h1>

        <p className="text-gray-600 mb-8">
          {t.terminosPage.ultimaActualizacion} {new Date().toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion1Titulo}</h2>
          <p>{t.terminosPage.seccion1Texto}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion2Titulo}</h2>
          <p>{t.terminosPage.seccion2Texto}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.terminosPage.seccion2Items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion3Titulo}</h2>
          <p>{t.terminosPage.seccion3Texto}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.terminosPage.seccion3Items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion4Titulo}</h2>
          <p>{t.terminosPage.seccion4Texto}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.terminosPage.seccion4Items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion5Titulo}</h2>
          <p>{t.terminosPage.seccion5Texto}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion6Titulo}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {t.terminosPage.seccion6Items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion7Titulo}</h2>
          <p>{t.terminosPage.seccion7Texto}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.terminosPage.seccion7Items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion8Titulo}</h2>
          <p>{t.terminosPage.seccion8Texto}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion9Titulo}</h2>
          <p>{t.terminosPage.seccion9Texto}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion10Titulo}</h2>
          <p>{t.terminosPage.seccion10Texto}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion11Titulo}</h2>
          <p>{t.terminosPage.seccion11Texto}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.terminosPage.seccion12Titulo}</h2>
          <p>{t.terminosPage.seccion12Texto}</p>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p><strong>{t.terminosPage.contactoEmpresa}</strong></p>
            <p>{t.terminosPage.contactoEmailLabel} <a href={`mailto:${t.terminosPage.contactoEmail}`} className="text-blue-600 hover:underline">{t.terminosPage.contactoEmail}</a></p>
            <p>{t.terminosPage.contactoTelefonoLabel} {t.terminosPage.contactoTelefono}</p>
          </div>
        </section>
      </article>
    </>
  );
}
