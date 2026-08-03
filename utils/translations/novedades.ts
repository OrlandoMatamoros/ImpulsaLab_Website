// Translations for /novedades — changelog publico de Impulsa Lab.
//
// FUENTE UNICA DE VERDAD: el historial de commits de este repositorio
// (ImpulsaLab_Website) y del repositorio de SOMATT. Cada entrada de este
// archivo corresponde a uno o varios commits reales, agrupados en un hito
// legible. Reglas al editar:
//   1. No agregar una entrada que no se pueda rastrear a un commit real.
//   2. Cero metricas: nada de porcentajes, tiempos, cifras de clientes,
//      ingresos ni usuarios. Las mejoras se describen cualitativamente.
//   3. Clientes por nombre: solo COERVER, Cruzeiro Academy y Golden Touch
//      (ya publicos en el sitio). Cualquier otro nombre es confidencial.
//   4. Sin lenguaje inflado. Se describe lo que cambio y para que sirve.
//   5. Meses de mas reciente a mas antiguo; entradas dentro del mes, igual.
//
// producto: 'sitio' (esta web y sus herramientas) | 'somatt' (el producto SaaS)

export const novedadesES = {
  novedadesPage: {
    navLabel: 'Novedades',
    breadcrumbInicio: 'Inicio',
    breadcrumbNovedades: 'Novedades',

    heroTag: 'Registro de cambios',
    heroTitle: 'Novedades de',
    heroTitleHighlight: 'Impulsa Lab',
    heroSubtitle: 'Todo lo que publicamos en el sitio y en SOMATT, con su fecha. Sin adjetivos: qué cambió y para qué sirve.',
    heroNota: 'Cada entrada corresponde a un cambio realmente publicado. Registro público desde mayo de 2026.',

    leyendaTitulo: 'Qué es cada cosa',
    leyendaSitio: 'Sitio: esta web, sus páginas y las herramientas gratuitas que viven en ella.',
    leyendaSomatt: 'SOMATT: nuestro producto de software para dueños de negocio.',

    filtroLabel: 'Filtrar por producto',
    filtroTodo: 'Todo',
    filtroSitio: 'Sitio',
    filtroSomatt: 'SOMATT',

    etiquetaSitio: 'Sitio',
    etiquetaSomatt: 'SOMATT',

    sinResultados: 'No hay entradas de este producto en el periodo mostrado.',

    meses: [
      {
        id: '2026-08',
        nombre: 'Agosto 2026',
        entradas: [
          {
            fecha: '3 de agosto',
            producto: 'sitio',
            titulo: 'Revisión de honestidad en todo el sitio',
            detalle: 'Pasamos página por página y quitamos toda afirmación que no pudiéramos respaldar con un hecho verificable. De paso corregimos el país de Cruzeiro Academy, que figuraba mal.',
          },
          {
            fecha: '3 de agosto',
            producto: 'sitio',
            titulo: 'Testimonios ordenados por fecha y cifras del encabezado corregidas',
            detalle: 'Ahora ves primero lo más reciente, y cada dato del encabezado se contrastó contra su fuente antes de publicarse.',
          },
          {
            fecha: '3 de agosto',
            producto: 'somatt',
            titulo: 'SOMATT dice de dónde salen sus datos',
            detalle: 'La página de SOMATT ahora nombra las fuentes públicas que usa para sus estimaciones del sector: los registros del Departamento de Salud de Nueva York y los datos de volumen de la SBA.',
          },
        ],
      },
      {
        id: '2026-07',
        nombre: 'Julio 2026',
        entradas: [
          {
            fecha: '31 de julio',
            producto: 'sitio',
            titulo: 'Las publicaciones automáticas en LinkedIn salen con imagen propia',
            detalle: 'El generador de piezas gráficas arma la imagen con la tipografía y el degradado de la marca, y ahora la recibe también por enlace, no solo como archivo. Antes había publicaciones que salían sin imagen porque el archivo no cabía en el envío.',
          },
          {
            fecha: '30 de julio',
            producto: 'somatt',
            titulo: 'El diagnóstico se responde en la mitad de toques, y sabemos dónde se pierde la gente',
            detalle: 'Al elegir una opción el cuestionario avanza solo a la siguiente pregunta: un toque por pregunta en lugar de dos. Abre con la pregunta más fácil, la barra de progreso ya no salta, los datos que no son imprescindibles se piden al final y se corrigió un punto donde el cuestionario se quedaba trabado. Además, la medición ahora distingue ver un resultado de hacer algo con él, con el criterio escrito.',
          },
          {
            fecha: '29 de julio',
            producto: 'sitio',
            titulo: 'Dos direcciones antiguas dejaron de dar error',
            detalle: 'Enlaces viejos que seguían circulando en buscadores llevaban a página no encontrada. Ahora redirigen a la página vigente.',
          },
          {
            fecha: '27 de julio',
            producto: 'somatt',
            titulo: 'El diagnóstico se prueba sin crear cuenta',
            detalle: 'Un visitante entra directo al cuestionario, en una primera pantalla limpia, sin nada flotando encima y sin tener que desplazarse para empezar.',
          },
          {
            fecha: '25 de julio',
            producto: 'somatt',
            titulo: 'Seguridad y privacidad del modo invitado',
            detalle: 'Probar sin cuenta ya no puede disparar consumo de inteligencia artificial sin control. Dejamos de escribir datos personales en la consola del navegador, cerrar sesión limpia todo lo que quedaba guardado en el equipo y el cobro exige una sesión válida.',
          },
          {
            fecha: '24 de julio',
            producto: 'somatt',
            titulo: 'Primero el resultado, después el registro',
            detalle: 'Respondes el diagnóstico y ves el resultado antes de que te pidamos una cuenta. El alta quedó medida de punta a punta, incluido el origen de la primera visita.',
          },
          {
            fecha: '21 de julio',
            producto: 'somatt',
            titulo: 'Registro sin fricción y verificado en el servidor',
            detalle: 'Formulario mínimo, código de verificación que se pega y se envía solo, y detección del navegador dentro de Instagram para que el registro no se rompa ahí. La cuenta se crea en el servidor únicamente cuando el correo quedó verificado de verdad, y aterriza directo en el diagnóstico. Cada alta avisa al equipo.',
          },
          {
            fecha: '16 de julio',
            producto: 'sitio',
            titulo: 'Tanda de seguridad en sesiones, cuentas y funciones de IA',
            detalle: 'La sesión viaja en una cookie que el navegador no puede leer, el servidor verifica la firma de cada sesión, crear una cuenta exige un código real y ya no puede sobrescribir una cuenta existente. El analizador de sitios dejó de poder usarse para alcanzar destinos internos, y las funciones de IA quedaron con un límite de uso compartido.',
          },
        ],
      },
      {
        id: '2026-06',
        nombre: 'Junio 2026',
        entradas: [
          {
            fecha: '30 de junio',
            producto: 'sitio',
            titulo: 'Nueva página del programa de formación en IA',
            detalle: 'Publicamos la página del programa de formación, con contacto directo por WhatsApp y con la medición de quién pide información desde ahí.',
          },
          {
            fecha: '17 de junio',
            producto: 'sitio',
            titulo: 'Librerías del sitio al día',
            detalle: 'Actualizamos las dependencias de producción y de desarrollo, y fijamos una regla para no arrastrar cambios mayores sin una migración revisada aparte.',
          },
          {
            fecha: '16 de junio',
            producto: 'sitio',
            titulo: 'Dos artículos nuevos y feed RSS en el blog',
            detalle: 'Publicamos qué proceso conviene automatizar primero en una PYME y cómo usar Claude en un negocio pequeño sin contratar desarrolladores. El blog ya tiene RSS: se puede seguir desde cualquier lector.',
          },
          {
            fecha: '12 de junio',
            producto: 'sitio',
            titulo: 'Los números de la portada, contrastados contra su fuente',
            detalle: 'Cada cifra que aparece en la portada se verificó contra el catálogo de servicios vigente y contra los flujos que tenemos corriendo. La dirección del negocio quedó igual en todas las páginas y en los datos que lee Google.',
          },
          {
            fecha: '12 de junio',
            producto: 'sitio',
            titulo: 'Títulos y descripciones reescritos para buscadores',
            detalle: 'Cada página tiene ahora un título con su propia palabra clave, datos estructurados que Google puede leer y las imágenes del blog en formato optimizado.',
          },
          {
            fecha: '11 de junio',
            producto: 'sitio',
            titulo: 'Generador propio de piezas gráficas para LinkedIn',
            detalle: 'Montamos un servicio que compone la imagen de cada publicación con la tipografía y el degradado de la marca, en lugar de diseñar una por una.',
          },
          {
            fecha: '10 de junio',
            producto: 'sitio',
            titulo: 'Portada más liviana y con mejor contraste',
            detalle: 'El bloque principal y el contador de la portada se cargan por partes, las imágenes salen en formatos modernos y los textos grises pasaron a un tono que cumple el estándar de accesibilidad.',
          },
          {
            fecha: '1 de junio',
            producto: 'sitio',
            titulo: 'El sitio pasa a ser bilingüe y su ficha ante Google queda corregida',
            detalle: 'Publicamos páginas de servicio en inglés y en español, enlazadas entre sí para que el buscador sepa cuál mostrar en cada idioma, y accesibles desde el menú y el pie. Corregimos la ficha del negocio: atendemos por área de servicio desde Queens. Quitamos la marca duplicada de los títulos y resolvimos las rutas viejas que aparecían como error.',
          },
        ],
      },
      {
        id: '2026-05',
        nombre: 'Mayo 2026',
        entradas: [
          {
            fecha: '28 de mayo',
            producto: 'sitio',
            titulo: 'Los números de la portada, al catálogo vigente',
            detalle: 'Actualizamos las cifras del encabezado para que coincidieran con el catálogo de servicios que estábamos vendiendo en ese momento.',
          },
          {
            fecha: '27 de mayo',
            producto: 'sitio',
            titulo: 'Cada página compite con su propia palabra clave',
            detalle: 'Reescribimos títulos y descripciones de la portada y de las páginas de servicio para que dejaran de competir entre sí en buscadores, corregimos las tildes de los títulos y ordenamos la jerarquía de encabezados.',
          },
          {
            fecha: '27 de mayo',
            producto: 'sitio',
            titulo: 'Google entiende dónde atendemos y qué vendemos',
            detalle: 'Publicamos la ficha de negocio local con las áreas de Nueva York donde damos servicio, una ficha estructurada por cada servicio y la documentación interna de directorios.',
          },
          {
            fecha: '27 de mayo',
            producto: 'sitio',
            titulo: 'El sitio abre con menos saltos y menos peso',
            detalle: 'Reservamos el espacio de los bloques para que el contenido no brinque al cargar, y dejamos para después las partes pesadas: el panel de resultados, la rejilla del encabezado y la mascota.',
          },
          {
            fecha: '27 de mayo',
            producto: 'sitio',
            titulo: 'Una sola dirección oficial',
            detalle: 'Todo el tráfico llega ahora a la versión con www, y sacamos de los buscadores una sección que atraía visitas sin relación con lo que hacemos.',
          },
          {
            fecha: '25 de mayo',
            producto: 'sitio',
            titulo: 'Nova tiene cara',
            detalle: 'La mascota cian reemplaza el círculo genérico que representaba a nuestra asistente de IA en la sección de equipo.',
          },
        ],
      },
    ],

    ctaTitle: 'Lo mismo que hacemos aquí lo hacemos para tu negocio',
    ctaSubtitle: 'Empieza por el diagnóstico gratuito y mira qué se puede automatizar primero.',
    ctaDiagnostico: 'Hacer el diagnóstico gratuito',
    ctaContacto: 'Hablar con un asesor',
  },
}

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
