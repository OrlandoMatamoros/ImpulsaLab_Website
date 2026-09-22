// Este archivo contiene toda la configuración de tu sitio
// Aquí puedes cambiar fácilmente textos, links e imágenes

export const IMAGES = {
  logo: '/images/logo negativo.jpg',  // Para el header sobre fondo blanco
  orlandoPhoto: '/images/FotoWebImpulsalab.png',  // Ya está correcta
  orlandoTeamPhoto: '/images/Fotoweb4.jpg',
  novaAvatar: '/images/nova-avatar.png',  // Esta no la tienes aún
  teamBackground: '/images/team-background.jpg',  // Esta tampoco
  logoBlanco: '/images/logo blanco.jpg',  // Para usar sobre fondo oscuro
  isotipo: '/images/isotipo.jpg',
}

export const LINKS = {
  calendly: 'https://calendly.com/orlando-tuimpulsalab/30min',
  email: 'contacto@tuimpulsalab.com',
  linkedin: 'https://linkedin.com/in/orlando-matamoros',
  // Click-to-chat → chatbot IA Impulsa Lab (Twilio Sender 929-500-7815, ONLINE 2026-05-22).
  // El 347-450-9281 es solo para llamadas/SMS (tel:/sms: links), NO WhatsApp.
  whatsapp: 'https://wa.me/19295007815',
  phone: '+13474509281',
  // Invoicing app (PWA). Admin-only desde el menú; los links del header/nav/tools la abren
  // directo en una pestaña externa para que el browser elija la PWA instalada si existe.
  //
  // 2026-09-22: era 'https://impulsa-invoicing.vercel.app'. Se unifica en el dominio
  // propio. El 22-sep Orlando quedó fuera del invoicing por esto: al pasar la app a
  // entrar con Google, se autorizó en Firebase Auth el dominio propio pero no el alias
  // de Vercel, que es el que este link abría — así que el popup moría con
  // `auth/unauthorized-domain`. Ambos dominios están autorizados ahora, pero tener DOS
  // puertas a la misma app significa configurar dos veces todo lo que va por dominio,
  // o fallar a medias. Una sola puerta, y que sea la nuestra.
  invoicingApp: 'https://invoicing.tuimpulsalab.com',
}

export const COMPANY_INFO = {
  name: 'Impulsa Lab',
  tagline: 'La fuerza que impulsa tu negocio',
  mainSlogan: 'Inteligencia de Negocios en la \'Coordenada\' Correcta',
}
