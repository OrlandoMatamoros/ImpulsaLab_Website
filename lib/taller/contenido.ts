/**
 * Contenido del evento: los casos que se resuelven en vivo y la agenda.
 * La agenda arranca a la hora de inicio de config.ts y DEBE sumar la duración del evento
 * (lo verifica lib/taller/taller.test.ts). Formato decidido por Orlando el 2-oct: casos reales
 * resueltos en vivo, preguntas en cada caso y media hora final de preguntas; sin clínica.
 */

export interface Caso {
  titulo: string
  detalle: string
}

/** Del más difícil al más sencillo (pedido de Orlando, 2-oct). */
export const CASOS: Caso[] = [
  {
    titulo: 'Analizar las ventas que sacas de tu caja',
    detalle:
      'Bajamos el reporte de ventas de una caja registradora (el POS), la IA lo lee y te dice qué se vende, qué no y a qué hora. Con eso arma un tablero de control.',
  },
  {
    titulo: 'Crear tu asistente administrativo',
    detalle:
      'Abrimos un proyecto en Claude, un espacio de trabajo con la información de tu negocio, y lo convertimos en un asistente que responde y redacta por ti.',
  },
  {
    titulo: 'Diseñar la carta digital de tu restaurante',
    detalle: 'De una lista de platos y precios a una carta lista para compartir por WhatsApp o imprimir.',
  },
  {
    titulo: 'Diseñar un post para vender un producto o servicio',
    detalle: 'De la foto de un producto a la publicación lista: imagen, texto y la invitación a comprar.',
  },
  {
    titulo: 'Conectar la IA con tus aplicaciones',
    detalle: 'Qué es un conector, con un ejemplo en vivo: la IA busca y compara pasajes en una app de viajes.',
  },
  {
    titulo: 'Hacer un Excel, un Word o una presentación',
    detalle: 'Escribes en español lo que necesitas y sale el archivo listo para usar.',
  },
  {
    titulo: 'Contestar correos y reseñas de Google',
    detalle: 'El más sencillo de todos, y el que más tiempo ahorra cada semana.',
  },
]

export interface Bloque {
  min: number
  titulo: string
  texto: string
  tipo?: 'pausa' | 'preguntas'
}

export const AGENDA: Bloque[] = [
  {
    min: 25,
    titulo: 'La IA sin enredos',
    texto:
      'De dónde salió, qué es un «modelo» (el cerebro que hay detrás de ChatGPT o Claude), qué empresas mandan hoy y las tres formas de usarla: en la página web, en la app del celular y en el computador.',
  },
  {
    min: 20,
    titulo: 'Tu cuenta y tu primera conexión',
    texto:
      'Cuál IA conviene para cada tarea y qué es un conector: la forma de unir la IA con las aplicaciones que ya usas. En vivo, la IA busca pasajes en una app de viajes.',
  },
  {
    min: 45,
    titulo: 'Caso 1: tus ventas, analizadas',
    texto: 'El reporte de una caja registradora convertido en respuestas y en un tablero de control.',
  },
  { min: 15, titulo: 'Pausa', texto: 'Café y snacks.', tipo: 'pausa' },
  {
    min: 45,
    titulo: 'Caso 2: tu asistente administrativo',
    texto: 'Un proyecto en Claude con la información de tu negocio, que responde y redacta por ti.',
  },
  {
    min: 40,
    titulo: 'Casos 3 y 4: tu carta y tu publicidad',
    texto: 'La carta digital de un restaurante y un post para vender un producto, de principio a fin.',
  },
  {
    min: 20,
    titulo: 'Lo de todos los días',
    texto: 'Correos y reseñas de Google contestados en un minuto, y un Excel, un Word y una presentación con solo pedirlos.',
  },
  {
    min: 30,
    titulo: 'Preguntas y respuestas',
    texto: 'Media hora para lo que quieras preguntar sobre tu negocio. Además, cada caso deja su espacio para preguntas.',
    tipo: 'preguntas',
  },
]
