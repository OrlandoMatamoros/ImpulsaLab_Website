'use client';

// app/legal/cookies/page.tsx
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookiesPolicy() {
  const { t, language } = useLanguage();

  return (
    <>
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          {t.cookiesPage.volverInicio}
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">{t.cookiesPage.titulo}</h1>

        <p className="text-gray-600 mb-8">
          {t.cookiesPage.ultimaActualizacion} {new Date().toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.cookiesPage.quesonTitulo}</h2>
          <p>{t.cookiesPage.quesonTexto}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.cookiesPage.comoUsamosTitulo}</h2>
          <p>{t.cookiesPage.comoUsamosTexto}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.cookiesPage.comoUsamosItems.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.cookiesPage.tiposTitulo}</h2>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">{t.cookiesPage.esencialesTitulo}</h3>
            <p>{t.cookiesPage.esencialesTexto}</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              {t.cookiesPage.esencialesItems.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">{t.cookiesPage.analisisTitulo}</h3>
            <p>{t.cookiesPage.analisisTexto}</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              {t.cookiesPage.analisisItems.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">{t.cookiesPage.marketingTitulo}</h3>
            <p>{t.cookiesPage.marketingTexto}</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              {t.cookiesPage.marketingItems.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{t.cookiesPage.funcionalidadTitulo}</h3>
            <p>{t.cookiesPage.funcionalidadTexto}</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              {t.cookiesPage.funcionalidadItems.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.cookiesPage.gestionTitulo}</h2>
          <p>{t.cookiesPage.gestionTexto}</p>

          <h3 className="text-xl font-semibold mb-2 mt-4">{t.cookiesPage.navegadorTitulo}</h3>
          <p>{t.cookiesPage.navegadorTexto}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Chrome:</strong> {t.cookiesPage.navegadorChrome}
            </li>
            <li>
              <strong>Firefox:</strong> {t.cookiesPage.navegadorFirefox}
            </li>
            <li>
              <strong>Safari:</strong> {t.cookiesPage.navegadorSafari}
            </li>
            <li>
              <strong>Edge:</strong> {t.cookiesPage.navegadorEdge}
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 mt-4">{t.cookiesPage.optOutTitulo}</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {t.cookiesPage.optOutGA}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                {t.cookiesPage.optOutGALink}
              </a>
            </li>
            <li>
              {t.cookiesPage.optOutAds}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                {t.cookiesPage.optOutAdsLink}
              </a>
            </li>
            <li>
              {t.cookiesPage.optOutFB}
              <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                {t.cookiesPage.optOutFBLink}
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.cookiesPage.consecuenciasTitulo}</h2>
          <p>{t.cookiesPage.consecuenciasTexto}</p>
          <ul className="list-disc pl-6 space-y-2">
            {t.cookiesPage.consecuenciasItems.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.cookiesPage.actualizacionesTitulo}</h2>
          <p>{t.cookiesPage.actualizacionesTexto}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.cookiesPage.masInfoTitulo}</h2>
          <p>{t.cookiesPage.masInfoTexto}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                AboutCookies.org
              </a>
            </li>
            <li>
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                AllAboutCookies.org
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t.cookiesPage.contactoTitulo}</h2>
          <p>{t.cookiesPage.contactoTexto}</p>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p><strong>{t.cookiesPage.contactoEmpresa}</strong></p>
            <p>{t.cookiesPage.contactoEmailLabel} <a href={`mailto:${t.cookiesPage.contactoEmail}`} className="text-blue-600 hover:underline">{t.cookiesPage.contactoEmail}</a></p>
            <p>{t.cookiesPage.contactoTelefonoLabel} {t.cookiesPage.contactoTelefono}</p>
          </div>
        </section>
      </article>
    </>
  );
}
