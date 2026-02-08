'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <>
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          {t.privacidadPage.volverInicio}
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">{t.privacidadPage.titulo}</h1>

        <p className="text-gray-600 mb-8">
          {t.privacidadPage.ultimaActualizacion} {new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion1Titulo}</h2>
          <p>
            {t.privacidadPage.seccion1Texto}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion2Titulo}</h2>
          <h3 className="text-xl font-semibold mb-2">{t.privacidadPage.seccion2Sub1Titulo}</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {t.privacidadPage.seccion2Sub1Items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-2">{t.privacidadPage.seccion2Sub2Titulo}</h3>
          <ul className="list-disc pl-6 space-y-2">
            {t.privacidadPage.seccion2Sub2Items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion3Titulo}</h2>
          <p>{t.privacidadPage.seccion3Texto}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.privacidadPage.seccion3Items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion4Titulo}</h2>
          <p>
            {t.privacidadPage.seccion4Texto}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            {t.privacidadPage.seccion4Items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion5Titulo}</h2>
          <p>
            {t.privacidadPage.seccion5Texto}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion6Titulo}</h2>
          <p>{t.privacidadPage.seccion6Texto}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.privacidadPage.seccion6Items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion7Titulo}</h2>
          <p>
            {t.privacidadPage.seccion7Texto}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion8Titulo}</h2>
          <p>
            {t.privacidadPage.seccion8Texto}{' '}
            <Link href="/legal/cookies" className="text-blue-600 hover:underline">
              {t.privacidadPage.seccion8Link}
            </Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion9Titulo}</h2>
          <p>
            {t.privacidadPage.seccion9Texto}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.privacidadPage.seccion10Titulo}</h2>
          <p>{t.privacidadPage.seccion10Texto}</p>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p><strong>{t.privacidadPage.contactoEmpresa}</strong></p>
            <p>{t.privacidadPage.contactoEmailLabel} <a href={`mailto:${t.privacidadPage.contactoEmail}`} className="text-blue-600 hover:underline">{t.privacidadPage.contactoEmail}</a></p>
            <p>{t.privacidadPage.contactoTelefonoLabel} {t.privacidadPage.contactoTelefono}</p>
            <p>{t.privacidadPage.contactoDireccionLabel} {t.privacidadPage.contactoDireccion}</p>
          </div>
        </section>
      </article>
    </>
  );
}
