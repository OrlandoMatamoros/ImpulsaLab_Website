// Auto-generated — EN-only slice of novedades.ts
// DO NOT edit directly; update novedades.ts and re-run scripts/split-translations.mjs
export const novedadesEN = {
  novedadesPage: {
    navLabel: 'Changelog',
    breadcrumbInicio: 'Home',
    breadcrumbNovedades: 'Changelog',

    heroTag: 'Changelog',
    heroTitle: 'What we shipped at',
    heroTitleHighlight: 'Impulsa Lab',
    heroSubtitle: 'Everything we ship on the website and on SOMATT, dated. No adjectives: what changed and what it is for.',
    heroNota: 'Every entry maps to a change that actually shipped. Public log since May 2026.',

    leyendaTitulo: 'What each label means',
    leyendaSitio: 'Website: this site, its pages and the free tools that live on it.',
    leyendaSomatt: 'SOMATT: our software product for business owners.',

    filtroLabel: 'Filter by product',
    filtroTodo: 'Everything',
    filtroSitio: 'Website',
    filtroSomatt: 'SOMATT',

    etiquetaSitio: 'Website',
    etiquetaSomatt: 'SOMATT',

    sinResultados: 'No entries for this product in the period shown.',

    meses: [
      {
        id: '2026-08',
        nombre: 'August 2026',
        entradas: [
          {
            fecha: 'August 3',
            producto: 'sitio',
            titulo: 'Honesty pass across the whole site',
            detalle: 'We went page by page and removed every claim we could not back with a verifiable fact. We also fixed the country listed for Cruzeiro Academy, which was wrong.',
          },
          {
            fecha: 'August 3',
            producto: 'sitio',
            titulo: 'Testimonials sorted by date, header figures corrected',
            detalle: 'The most recent testimonials now come first, and every number in the header was checked against its source before publishing.',
          },
          {
            fecha: 'August 3',
            producto: 'somatt',
            titulo: 'SOMATT states where its data comes from',
            detalle: 'The SOMATT page now names the public sources behind its industry estimates: New York City Department of Health records and SBA volume data.',
          },
        ],
      },
      {
        id: '2026-07',
        nombre: 'July 2026',
        entradas: [
          {
            fecha: 'July 31',
            producto: 'sitio',
            titulo: 'Automated LinkedIn posts now ship with their own image',
            detalle: 'The graphics generator composes each image with the brand typeface and gradient, and now accepts the image by link, not only as a file. Some posts used to publish without an image because the file did not fit in the request.',
          },
          {
            fecha: 'July 30',
            producto: 'somatt',
            titulo: 'The diagnostic takes half the taps, and we know where people drop off',
            detalle: 'Picking an option advances to the next question on its own: one tap per question instead of two. It opens with the easiest question, the progress bar no longer jumps, non-essential data is asked at the end, and we fixed a point where the questionnaire got stuck. Measurement now separates viewing a result from acting on it, with the criteria written down.',
          },
          {
            fecha: 'July 29',
            producto: 'sitio',
            titulo: 'Two legacy addresses stopped returning an error',
            detalle: 'Old links still circulating in search engines led to a not-found page. They now redirect to the current page.',
          },
          {
            fecha: 'July 27',
            producto: 'somatt',
            titulo: 'The diagnostic can be tried without creating an account',
            detalle: 'A visitor lands straight in the questionnaire, on a clean first screen, with nothing floating on top and no need to scroll to start.',
          },
          {
            fecha: 'July 25',
            producto: 'somatt',
            titulo: 'Security and privacy for guest mode',
            detalle: 'Trying it without an account can no longer trigger uncapped AI spend. We stopped writing personal data to the browser console, signing out now clears everything left on the device, and checkout requires a valid session.',
          },
          {
            fecha: 'July 24',
            producto: 'somatt',
            titulo: 'Result first, sign-up second',
            detalle: 'You answer the diagnostic and see the result before we ask for an account. Sign-up is now measured end to end, including where the first visit came from.',
          },
          {
            fecha: 'July 21',
            producto: 'somatt',
            titulo: 'Frictionless sign-up, verified server-side',
            detalle: 'Minimal form, a verification code you can paste that submits itself, and detection of the in-app Instagram browser so sign-up does not break there. The account is created on the server only once the email is genuinely verified, and it lands straight in the diagnostic. Every sign-up notifies the team.',
          },
          {
            fecha: 'July 16',
            producto: 'sitio',
            titulo: 'Security pass on sessions, accounts and AI features',
            detalle: 'The session now travels in a cookie the browser cannot read, the server verifies the signature of every session, creating an account requires a real code and can no longer overwrite an existing account. The website analyzer can no longer be used to reach internal destinations, and AI features share a usage limit.',
          },
        ],
      },
      {
        id: '2026-06',
        nombre: 'June 2026',
        entradas: [
          {
            fecha: 'June 30',
            producto: 'sitio',
            titulo: 'New page for the AI training program',
            detalle: 'We published the training program page, with direct WhatsApp contact and tracking of who requests information from it.',
          },
          {
            fecha: 'June 17',
            producto: 'sitio',
            titulo: 'Site libraries brought up to date',
            detalle: 'We updated production and development dependencies, and set a rule so major changes are not dragged in without a separate, reviewed migration.',
          },
          {
            fecha: 'June 16',
            producto: 'sitio',
            titulo: 'Two new blog articles and an RSS feed',
            detalle: 'We published which process a small business should automate first, and how to use Claude in a small business without hiring developers. The blog now has RSS, so it can be followed from any reader.',
          },
          {
            fecha: 'June 12',
            producto: 'sitio',
            titulo: 'Homepage numbers checked against their source',
            detalle: 'Every figure on the homepage was verified against the current service catalog and against the workflows we actually run. The business address is now identical across every page and in the data Google reads.',
          },
          {
            fecha: 'June 12',
            producto: 'sitio',
            titulo: 'Titles and descriptions rewritten for search',
            detalle: 'Every page now has a title built around its own keyword, structured data Google can read, and blog images in an optimized format.',
          },
          {
            fecha: 'June 11',
            producto: 'sitio',
            titulo: 'Our own graphics generator for LinkedIn',
            detalle: 'We built a service that composes each post image with the brand typeface and gradient, instead of designing them one by one.',
          },
          {
            fecha: 'June 10',
            producto: 'sitio',
            titulo: 'Lighter homepage with better contrast',
            detalle: 'The main block and the homepage counter now load in parts, images ship in modern formats, and grey text moved to a shade that meets the accessibility standard.',
          },
          {
            fecha: 'June 1',
            producto: 'sitio',
            titulo: 'The site goes bilingual and its Google listing is corrected',
            detalle: 'We published service pages in English and Spanish, linked to each other so search engines know which one to show in each language, and reachable from the menu and the footer. We corrected the business listing: we serve by service area out of Queens. We removed the duplicated brand from titles and resolved the old routes that were showing up as errors.',
          },
        ],
      },
      {
        id: '2026-05',
        nombre: 'May 2026',
        entradas: [
          {
            fecha: 'May 28',
            producto: 'sitio',
            titulo: 'Homepage numbers aligned to the live catalog',
            detalle: 'We updated the header figures so they matched the service catalog we were actually selling at the time.',
          },
          {
            fecha: 'May 27',
            producto: 'sitio',
            titulo: 'Every page competes on its own keyword',
            detalle: 'We rewrote titles and descriptions for the homepage and the service pages so they stopped competing with each other in search, fixed accents in titles, and cleaned up the heading hierarchy.',
          },
          {
            fecha: 'May 27',
            producto: 'sitio',
            titulo: 'Google understands where we work and what we sell',
            detalle: 'We published the local business listing with the New York areas we serve, structured data for each service, and the internal directory documentation.',
          },
          {
            fecha: 'May 27',
            producto: 'sitio',
            titulo: 'The site loads with fewer jumps and less weight',
            detalle: 'We reserved space for each block so content does not shift while loading, and deferred the heavy parts: the results panel, the header grid and the mascot.',
          },
          {
            fecha: 'May 27',
            producto: 'sitio',
            titulo: 'One official address',
            detalle: 'All traffic now lands on the www version, and we pulled from search a section that was attracting visits unrelated to what we do.',
          },
          {
            fecha: 'May 25',
            producto: 'sitio',
            titulo: 'Nova has a face',
            detalle: 'The cyan mascot replaces the generic circle that used to stand in for our AI assistant in the team section.',
          },
        ],
      },
    ],

    ctaTitle: 'What we do here is what we do for your business',
    ctaSubtitle: 'Start with the free diagnostic and see what can be automated first.',
    ctaDiagnostico: 'Take the free diagnostic',
    ctaContacto: 'Talk to an advisor',
  },
}

export default novedadesEN
