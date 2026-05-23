'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LINKS } from '@/lib/constants'
import { ArrowRight, Target, Megaphone, PenTool, TrendingUp, CheckCircle2, Package, Rocket, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ContentStrategistChat from '@/components/services/marketing/ContentStrategistChat'
import AIToolsShowcase from '@/components/services/marketing/AIToolsShowcase'
import AutomationVsEmployee from '@/components/services/AutomationVsEmployee'
import PricingColumns from '@/components/services/PricingColumns'
import MarketingToolsTicker from '@/components/services/MarketingToolsTicker'
import { useLanguage } from '@/contexts/LanguageContext'

const WA = (msg: string) => `https://wa.me/13479043169?text=${encodeURIComponent(msg)}`

const methodologyIcons = [Target, PenTool, Megaphone, TrendingUp]

export default function MarketingPage() {
 const { t } = useLanguage()
 const [selectedImage, setSelectedImage] = useState<string | null>(null)
 const [currentImageIndex, setCurrentImageIndex] = useState(0)
 const [activeVideoCategory, setActiveVideoCategory] = useState('todos')

 // Imágenes del portfolio organizadas
 const portfolioImages = [
   // Imágenes principales
   { src: '/images/portfolio/diagnostico 3d.jpg', category: 'principal', title: 'Diagnóstico 3D' },
   { src: '/images/portfolio/identidad visula.jpg', category: 'principal', title: 'Identidad Visual' },
   { src: '/images/portfolio/proptotipo de logo AI.jpg', category: 'principal', title: 'Prototipo Logo AI' },
   { src: '/images/portfolio/Imagen conceptual.jpg', category: 'principal', title: 'Imagen Conceptual' },
   { src: '/images/portfolio/Producto impactante.jpg', category: 'principal', title: 'Producto Impactante' },
   // Branding
   { src: '/images/portfolio/branding/Gemini_Generated_Image_tsjx6utsjx6utsjx.png', category: 'branding', title: 'Brand Identity 1' },
   { src: '/images/portfolio/branding/Gemini_Generated_Image_tsjx6utsjx6utsjx (1).png', category: 'branding', title: 'Brand Identity 2' },
   // Social
   { src: '/images/portfolio/social/Gemini_Generated_Image_svl0s2svl0s2svl0.png', category: 'social', title: 'Social Media 1' },
   { src: '/images/portfolio/social/Gemini_Generated_Image_vuffeivuffeivuff.png', category: 'social', title: 'Social Media 2' },
   // Web
   { src: '/images/portfolio/web/Gemini_Generated_Image_yd60qqyd60qqyd60.png', category: 'web', title: 'Web Design 1' },
   { src: '/images/portfolio/web/Gemini_Generated_Image_r2rcinr2rcinr2rc.png', category: 'web', title: 'Web Design 2' },
   // Ads
   { src: '/images/portfolio/ads/Gemini_Generated_Image_gna8hygna8hygna8.png', category: 'ads', title: 'Ad Campaign 1' },
   { src: '/images/portfolio/ads/Gemini_Generated_Image_3ls8nw3ls8nw3ls8.png', category: 'ads', title: 'Ad Campaign 2' }
 ];

 // Videos organizados
 const allVideos = {
   herramientas: [
     { id: 'sZ98KeJqH1Y', title: 'Generación de Imágenes con IA', description: 'Freepik AI y Midjourney' },
     { id: 'aMAbubHFe-E', title: 'Creación de Videos con IA', description: 'HeyGen y Runway' },
     { id: '1ARH9SLlqNs', title: 'Automatización de Procesos', description: 'Make y Zapier' },
     { id: 'h8d4N1151PY', title: 'Audio y Voz con IA', description: 'ElevenLabs' },
     { id: 'gqa7BqORA74', title: 'Marketing Automation', description: 'Workflows completos' }
   ],
   casos: [
     { id: 'kRhZxI5Ja9M', title: 'Caso: +300% en Conversiones', description: 'E-commerce transformation' },
     { id: 'BsaACjN7HHc', title: 'Transformación Digital Completa', description: 'De 0 a hero digital' },
     { id: 'UoKJxjQQCns', title: 'De 0 a 10K Leads', description: 'En solo 3 meses' }
   ],
   tutoriales: [
     { id: 'Em-0AuYWrs0', title: 'Tutorial: Campañas con IA', description: 'Paso a paso completo' },
     { id: '8DofthWCpcw', title: 'Configuración Inicial', description: 'Setup de herramientas' },
     { id: 'EpBkbdtFo70', title: 'Optimización Avanzada', description: 'Técnicas pro' },
     { id: 'O23hjmxhc1o', title: 'Métricas y Análisis', description: 'ROI y KPIs' }
   ]
 };

 const nextImage = () => {
   setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length)
 }

 const prevImage = () => {
   setCurrentImageIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length)
 }

 return (
   <div className="min-h-screen bg-white">
     {/* Hero Section MEJORADO */}
     <section className="relative bg-gradient-to-br from-purple-900 to-purple-700 text-white py-20 overflow-hidden">
       <div className="absolute inset-0 opacity-10">
         <div className="absolute inset-0 bg-[url('/images/portfolio/Imagen conceptual.jpg')] bg-cover bg-center" />
       </div>
       <div className="container mx-auto px-4 relative z-10">
         <div className="max-w-4xl mx-auto text-center">
           <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
             {t.marketingPage.heroTitle}
           </h1>
           <p className="text-xl mb-8 text-purple-100">
             {t.marketingPage.heroSubtitle}
           </p>
           <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-purple-800/60 backdrop-blur-sm rounded-full border border-white/20">
             <span className="text-2xl font-bold text-white">{t.marketingPage.heroPriceAnchor}</span>
           </div>
           <div>
             <Link
               href={`https://wa.me/13479043169?text=${encodeURIComponent('Hola Impulsa Lab, me interesa el paquete de Landing Express para mi negocio.')}`}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
             >
               {t.marketingPage.ctaDiagnostico}
               <ArrowRight className="w-5 h-5" />
             </Link>
           </div>
         </div>
       </div>
     </section>

     {/* Marketing Tools Ticker — logos reales del stack de marketing */}
     <MarketingToolsTicker />

     {/* Antes → Después */}
     <div className="bg-slate-100 border-b border-gray-200 py-4">
       <div className="container mx-auto px-4">
         <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
           <div className="flex-1 flex items-center gap-2">
             <span className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-sm">✗</span>
             <p className="text-sm text-gray-600 italic">&ldquo;{t.marketingPage.beforeAfter.before}&rdquo;</p>
           </div>
           <span className="text-2xl text-purple-600 font-bold">→</span>
           <div className="flex-1 flex items-center gap-2">
             <span className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">✓</span>
             <p className="text-sm text-gray-800 font-medium">&ldquo;{t.marketingPage.beforeAfter.after}&rdquo;</p>
           </div>
           <span className="text-xs text-gray-400 whitespace-nowrap">— {t.marketingPage.beforeAfter.name}, {t.marketingPage.beforeAfter.business}</span>
         </div>
       </div>
     </div>

     {/* Portfolio Visual Section */}
     <section className="py-16 bg-gradient-to-b from-white to-gray-50">
       <div className="container mx-auto px-4">
         <div className="max-w-7xl mx-auto">
           <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
             {t.marketingPage.portfolioTitle}
           </h2>
           <p className="text-center text-gray-600 mb-12 text-lg">
             {t.marketingPage.portfolioSubtitle}
           </p>

           <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
             {portfolioImages.slice(0, 8).map((image, index) => (
               <div
                 key={index}
                 className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                 onClick={() => {
                   setSelectedImage(image.src)
                   setCurrentImageIndex(index)
                 }}
               >
                 <div className="aspect-square relative">
                   <Image
                     src={image.src}
                     alt={image.title}
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-300"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="absolute bottom-4 left-4 text-white">
                       <p className="font-semibold">{image.title}</p>
                       <p className="text-sm capitalize opacity-90">{image.category}</p>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>

           <p className="text-center text-sm text-gray-500">
             {t.marketingPage.portfolioNewCreations} • {portfolioImages.length} {t.marketingPage.portfolioDesignsAvailable}
           </p>
         </div>
       </div>
     </section>

     {/* Lightbox Mejorado */}
     {selectedImage && (
       <div
         className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
         onClick={() => setSelectedImage(null)}
       >
         <button
           className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
           onClick={(e) => {
             e.stopPropagation()
             setSelectedImage(null)
           }}
         >
           <X className="w-8 h-8" />
         </button>

         <button
           className="absolute left-4 text-white hover:text-gray-300 z-50"
           onClick={(e) => {
             e.stopPropagation()
             prevImage()
             setSelectedImage(portfolioImages[currentImageIndex === 0 ? portfolioImages.length - 1 : currentImageIndex - 1].src)
           }}
         >
           <ChevronLeft className="w-10 h-10" />
         </button>

         <button
           className="absolute right-4 text-white hover:text-gray-300 z-50"
           onClick={(e) => {
             e.stopPropagation()
             nextImage()
             setSelectedImage(portfolioImages[(currentImageIndex + 1) % portfolioImages.length].src)
           }}
         >
           <ChevronRight className="w-10 h-10" />
         </button>

         <Image
           src={selectedImage}
           alt="Portfolio"
           width={1200}
           height={800}
           className="max-w-full max-h-[90vh] object-contain"
           onClick={(e) => e.stopPropagation()}
         />
       </div>
     )}

     {/* Te Suena Familiar Section */}
     <section className="py-16 bg-white">
       <div className="container mx-auto px-4">
         <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
             {t.marketingPage.painPointsTitle}
           </h2>
           <div className="space-y-6">
             {t.marketingPage.painPoints.map((point, index) => (
               <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                 <p className="text-gray-700">
                   <span className="font-semibold">{point.bold}</span>
                   {' '}{point.rest}
                 </p>
               </div>
             ))}
           </div>
         </div>
       </div>
     </section>

     {/* Automatización vs Empleado Humano (BLS NYC 2023) */}
     <AutomationVsEmployee
       vertical="marketing"
       accent="purple"
       headline="Un equipo de marketing digital, al precio de un freelancer"
       subtitle="Publicar, prospectar y responder reseñas de forma consistente tiene costo real en Nueva York. Compara lo que te ahorras al automatizarlo."
       ctaLabel="Agenda tu diagnóstico"
       ctaHref={LINKS.calendly}
       ctaTarget="_blank"
       rows={[
         { product: 'LinkedIn Publisher',   productPrice: '$197-297/mes', humanRole: 'Social Media Specialist',  nycMonthly: 9017, hoursSaved: 50,  roiNote: '30-46×' },
         { product: 'Social Media Factory', productPrice: '$197-297/mes', humanRole: 'Content Creator jr',        nycMonthly: 6765, hoursSaved: 60,  roiNote: '23-34×' },
         { product: 'Review Manager',       productPrice: '$297-497/mes', humanRole: 'Community Manager',         nycMonthly: 6756, hoursSaved: 30,  roiNote: '14-23×' },
         { product: 'Cold Outreach Engine', productPrice: '$197-797/mes', humanRole: 'SDR',                       nycMonthly: 7960, hoursSaved: 160, roiNote: '10-40×' },
       ]}
     />

     {/* VIDEO SECTION CENTRAL - POSICIÓN ESTRATÉGICA */}
     <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
       <div className="container mx-auto px-4">
         <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
             {t.marketingPage.videoSectionTitle}
           </h2>
           <p className="text-center text-gray-600 mb-8 text-lg">
             {t.marketingPage.videoSectionSubtitle}
           </p>

           {/* Video de YouTube CENTRAL - ACTUALIZABLE */}
           <div className="relative rounded-xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
             <div className="aspect-video">
               <iframe
                 src="https://www.youtube.com/embed/cab7tH4lyDY"
                 title="IA Generativa para Marketing - Impulsa Lab"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 allowFullScreen
                 className="w-full h-full"
               />
             </div>
           </div>

           <p className="text-center text-sm text-gray-500 mt-4">
             {t.marketingPage.videoSectionNote}
           </p>
         </div>
       </div>
     </section>

     {/* Herramientas de IA Section */}
     <div id="arsenal-ia" className="scroll-mt-24">
       <AIToolsShowcase />
     </div>

     {/* Video Hub Section */}
     <section className="py-16 bg-white">
       <div className="container mx-auto px-4">
         <div className="max-w-7xl mx-auto">
           <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
             {t.marketingPage.learningCenterTitle}
           </h2>
           <p className="text-center text-gray-600 mb-8 text-lg">
             {t.marketingPage.learningCenterSubtitle}
           </p>

           <div className="flex justify-center gap-3 mb-12 flex-wrap">
             {['todos', 'herramientas', 'casos', 'tutoriales'].map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveVideoCategory(cat)}
                 className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                   activeVideoCategory === cat
                     ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                 }`}
               >
                 {t.marketingPage.videoCategoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
               </button>
             ))}
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {(activeVideoCategory === 'todos'
               ? [...allVideos.herramientas, ...allVideos.casos, ...allVideos.tutoriales]
               : allVideos[activeVideoCategory as keyof typeof allVideos] || []
             ).map((video) => (
               <div key={video.id} className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                 <div className="aspect-video relative">
                   <iframe
                     src={`https://www.youtube.com/embed/${video.id}`}
                     title={video.title}
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     className="w-full h-full"
                     loading="lazy"
                   />
                 </div>
                 <div className="p-4 bg-white">
                   <h3 className="font-semibold text-gray-900">{video.title}</h3>
                   <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     </section>

     {/* Chat Estratega Section */}
     <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
       <div className="container mx-auto px-4">
         <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
             {t.marketingPage.chatStrategistTitle}
           </h2>
           <p className="text-center text-gray-600 mb-12 text-lg">
             {t.marketingPage.chatStrategistSubtitle}
           </p>
           <ContentStrategistChat />
         </div>
       </div>
     </section>

     {/* Metodología Section */}
       <section className="py-16 bg-gray-50">
         <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
               {t.marketingPage.methodologyTitle}
             </h2>
             <p className="text-center text-gray-600 mb-12">
               {t.marketingPage.methodologySubtitle}
             </p>

             <div className="grid md:grid-cols-2 gap-8">
               {t.marketingPage.methodologySteps.map((step, index) => {
                 const Icon = methodologyIcons[index]
                 return (
                   <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                     <div className="flex items-start gap-4">
                       <div className="bg-purple-100 p-3 rounded-lg">
                         <Icon className="w-6 h-6 text-purple-600" />
                       </div>
                       <div>
                         <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                         <p className="text-gray-600">
                           {step.description}
                         </p>
                         <div className="mt-3 space-y-1 text-sm text-gray-500">
                           {step.items.map((item, i) => (
                             <div key={i}>• {item}</div>
                           ))}
                         </div>
                       </div>
                     </div>
                   </div>
                 )
               })}
             </div>

             {/* Casos de Éxito Preview */}
             <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
               <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                 {t.marketingPage.clientResultsTitle}
               </h3>
               <div className="grid md:grid-cols-3 gap-6">
                 {t.marketingPage.clientResults.map((result, index) => (
                   <div key={index} className="text-center p-6 bg-purple-50 rounded-lg">
                     <div className="text-3xl font-bold text-purple-600 mb-2">{result.value}</div>
                     <div className="text-gray-700">{result.label}</div>
                     <div className="text-sm text-gray-500 mt-2">{result.client}</div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>


     {/* CTA Final MEJORADO */}
     <section className="py-20 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
       <div className="container mx-auto px-4">
         <div className="max-w-3xl mx-auto text-center">
           <h2 className="text-4xl md:text-5xl font-bold mb-6">
             {t.marketingPage.ctaTitle}
           </h2>
           <p className="text-xl mb-8 text-purple-100">
             {t.marketingPage.ctaSubtitle}
           </p>
           <Link
             href={`https://wa.me/13479043169?text=${encodeURIComponent('Hola Impulsa Lab, me interesa el paquete de Landing Express para mi negocio.')}`}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-white text-purple-900 px-10 py-5 rounded-lg font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
           >
             {t.marketingPage.ctaDiagnostico}
             <ArrowRight className="w-6 h-6" />
           </Link>
         </div>
       </div>
     </section>

     {/* Pricing por nivel — Presencia Web (catálogo v1.2) */}
     <PricingColumns
       title="Presencia Web: del primer paso a tu plataforma"
       subtitle="Cada nivel construye sobre el anterior. Precios desde; el alcance final se cotiza según tu negocio."
       accent="purple"
       footnote="Precios desde, en USD. El alcance final se define en el diagnóstico. Hosting y mantenimiento desde $97/mes."
       tiers={[
         {
           sku: 'WEB-001',
           name: 'Landing Express',
           price: 'desde $197',
           subtitle: 'Tu puerta de entrada a internet',
           features: [
             '1 página',
             'Destino para tu Google Business Profile',
             'Botón de WhatsApp',
             'Diseño responsive',
             'Entrega en días',
           ],
           ctaLabel: 'Quiero mi Landing Express',
           ctaHref: WA('Hola Impulsa Lab, me interesa la Landing Express para mi negocio.'),
           ctaTarget: '_blank',
         },
         {
           sku: 'WEB-003',
           name: 'Landing Profesional',
           price: 'desde $697',
           subtitle: 'Una página que vende',
           featured: true,
           badge: 'MÁS POPULAR',
           features: [
             '1 página, 5 secciones',
             'Diseño a medida orientado a conversión',
             'WhatsApp + formulario de contacto',
             'Responsive (perfecto en celular)',
             'SEO on-page básico',
           ],
           ctaLabel: 'Quiero mi Landing Profesional',
           ctaHref: WA('Hola Impulsa Lab, me interesa la Landing Profesional para mi negocio.'),
           ctaTarget: '_blank',
         },
         {
           sku: 'WEB-010',
           name: 'Website',
           price: 'desde $2,497',
           subtitle: 'Presencia digital integral',
           features: [
             'Hasta 10 páginas',
             'Navegación + blog',
             'Formularios + booking',
             'Integración WhatsApp / Google Business',
             'SEO on-page · responsive',
           ],
           ctaLabel: 'Cotizar mi Website',
           ctaHref: WA('Hola Impulsa Lab, me interesa un Website profesional para mi negocio.'),
           ctaTarget: '_blank',
         },
         {
           sku: 'WEB-020',
           name: 'App Web Básica',
           price: 'desde $4,997',
           subtitle: 'Software a medida acotado',
           features: [
             'Hasta 3 módulos (dashboard / CRM / facturación)',
             'Login + base de datos',
             'Responsive',
           ],
           ctaLabel: 'Cotizar mi App Web',
           ctaHref: WA('Hola Impulsa Lab, me interesa una App Web Básica a medida.'),
           ctaTarget: '_blank',
         },
         {
           sku: 'WEB-021',
           name: 'Marketplace / MVP',
           price: 'desde $11,997',
           subtitle: 'Plataforma multi-módulo',
           features: [
             'Plataforma multi-módulo',
             'Pagos con Stripe',
             'Roles de usuario',
             'Base de datos',
             'Panel admin',
           ],
           ctaLabel: 'Cotizar mi plataforma',
           ctaHref: WA('Hola Impulsa Lab, me interesa una plataforma Marketplace/MVP.'),
           ctaTarget: '_blank',
         },
       ]}
     />

     {/* Interlinking: pillar consultoría IA general */}
     <section className="py-10 bg-gray-50 border-t border-gray-200">
       <div className="container mx-auto px-4 text-center">
         <p className="text-gray-600 mb-3">
           ¿Buscás una visión general de cómo implementar IA en tu PYME?
         </p>
         <Link
           href="/servicios/consultoria-ia-para-pymes"
           className="inline-flex items-center gap-2 text-[#002D62] font-semibold hover:underline text-lg"
         >
           Ver guía completa: Consultoría IA para PYMEs
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
           </svg>
         </Link>
       </div>
     </section>
   </div>
 )
}
