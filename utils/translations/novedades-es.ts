// Auto-generated — ES-only slice of novedades.ts
// DO NOT edit directly; update novedades.ts and re-run scripts/split-translations.mjs
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

export default novedadesES
