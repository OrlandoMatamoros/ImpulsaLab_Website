'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LINKS } from '@/lib/constants'
import { ArrowRight, Target, Megaphone, PenTool, TrendingUp, CheckCircle2, Package, Rocket, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ProtectedSection from '@/components/ProtectedSection'
import ContentStrategistChat from '@/components/services/marketing/ContentStrategistChat'
import AIToolsShowcase from '@/components/services/marketing/AIToolsShowcase'
import { useLanguage } from '@/contexts/LanguageContext'

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
           <Link
             href={LINKS.calendly}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
           >
             {t.marketingPage.ctaDiagnostico}
             <ArrowRight className="w-5 h-5" />
           </Link>
         </div>
       </div>
     </section>

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
     <AIToolsShowcase />

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

     {/* CONTENIDO PROTEGIDO - MANTENIDO TAL CUAL */}
     <ProtectedSection
       message={t.marketingPage.protectedMessage}
       showPreview={true}
       previewBlur={false}
     >
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

       {/* Planes Section - MANTENIDO */}
       <section className="py-16 bg-white">
         <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
               {t.marketingPage.plansTitle}
             </h2>

             <div className="grid md:grid-cols-2 gap-8">
               {/* Plan Identidad */}
               <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-purple-500 transition-all duration-300 hover:shadow-xl">
                 <div className="mb-4">
                   <Package className="w-12 h-12 text-purple-600" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">{t.marketingPage.planIdentidad.name}</h3>
                 <p className="text-gray-600 mb-6">
                   {t.marketingPage.planIdentidad.description}
                 </p>
                 <div className="text-3xl font-bold mb-6">
                   {t.marketingPage.planIdentidad.priceFrom} <span className="text-purple-600">$1,200</span>
                   <div className="text-sm font-normal text-gray-500 mt-1">{t.marketingPage.planIdentidad.priceNote}</div>
                 </div>
                 <ul className="space-y-3 mb-8">
                   {t.marketingPage.planIdentidad.features.map((feature, index) => (
                     <li key={index} className="flex items-start gap-2">
                       <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                       <span className="text-gray-700">{feature}</span>
                     </li>
                   ))}
                 </ul>
                 <Link
                   href={LINKS.calendly}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                 >
                   {t.marketingPage.planIdentidad.cta}
                 </Link>
               </div>

               {/* Plan Crecimiento */}
               <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-500 rounded-lg p-8 relative hover:shadow-2xl transition-all duration-300">
                 <div className="absolute -top-4 right-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                   {t.marketingPage.planCrecimiento.badge}
                 </div>
                 <div className="mb-4">
                   <Rocket className="w-12 h-12 text-purple-600" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">{t.marketingPage.planCrecimiento.name}</h3>
                 <p className="text-gray-600 mb-6">
                   {t.marketingPage.planCrecimiento.description}
                 </p>
                 <div className="text-3xl font-bold mb-6">
                   {t.marketingPage.planCrecimiento.priceFrom} <span className="text-purple-600">$2,500</span>
                   <div className="text-sm font-normal text-gray-600 mt-1">{t.marketingPage.planCrecimiento.priceNote}</div>
                 </div>
                 <ul className="space-y-3 mb-8">
                   {t.marketingPage.planCrecimiento.features.map((feature, index) => (
                     <li key={index} className="flex items-start gap-2">
                       <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                       <span className="text-gray-700">{feature}</span>
                     </li>
                   ))}
                 </ul>
                 <Link
                   href={LINKS.calendly}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                 >
                   {t.marketingPage.planCrecimiento.cta}
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </section>
     </ProtectedSection>

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
             href={LINKS.calendly}
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
   </div>
 )
}
