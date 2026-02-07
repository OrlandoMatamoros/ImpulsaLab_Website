'use client'

import Image from 'next/image'
import { IMAGES } from '@/lib/constants'

export default function TeamSection() {
  // Placeholder para avatares mientras consigues las fotos
  const AvatarPlaceholder = ({ name, role }: { name: string, role: string }) => {
    const initials = name.split(' ').map(n => n[0]).join('')
    const bgGradient = 
      role === 'Director de Estrategia' ? 'from-blue-500 to-indigo-500' :
      role === 'CMO' ? 'from-purple-500 to-pink-500' : 
      role === 'COO' ? 'from-green-500 to-teal-500' : 
      role === 'CSO' ? 'from-orange-500 to-red-500' : 
      'from-gray-500 to-gray-600'
    
    return (
      <div className={`w-full h-full bg-gradient-to-br ${bgGradient} flex items-center justify-center`}>
        <span className="text-4xl font-bold text-white">{initials}</span>
      </div>
    )
  }

  const teamMembers = [
    {
      name: "Orlando Matamoros",
      role: "Director de Estrategia",
      title: "Director de Estrategia",
      description: "+20 años de experiencia en planificación estratégica, finanzas y optimización de operaciones. Conoce el ecosistema empresarial de NY desde adentro.",
      linkedin: "https://www.linkedin.com/in/orlando-matamoros-377430194",
      email: "orlando@tuimpulsalab.com",
      hasPhoto: true,
      photoSrc: IMAGES.orlandoPhoto
    },
    {
      name: "Diego Flores",
      role: "CMO",
      title: "Director de Creatividad y Marca",
      description: "Artista visual y diseñador gráfico con sólida experiencia en desarrollo de identidades visuales y comunicación estratégica. Especialista en crear marcas con propósito que conectan emocionalmente con la audiencia.",
      linkedin: "https://www.diegolflores.com/",
      email: "diego@tuimpulsalab.com",
      hasPhoto: true,
      photoSrc: "/images/team/diego-flores.jpg" // Necesitarás guardar la imagen aquí
    },
    {
      name: "Katty Garces",
      role: "COO", 
      title: "Directora de Operaciones",
      description: "Líder experimentada en desarrollo de servicios empresariales con historial probado en gestión de programas para pequeñas empresas en NY. Experta bilingüe que traduce estrategia en operaciones diarias.",
      linkedin: "https://www.linkedin.com/in/katty-garces-b0574555/",
      email: "katty@tuimpulsalab.com",
      hasPhoto: true,
      photoSrc: "/images/team/katty-garces.jpg"
    },
    {
      name: "Alex Cruces",
      role: "CSO",
      title: "Director de Ventas", 
      description: "Profesional apasionado con experiencia en análisis de mercado y desarrollo de cuentas. Experto en convertir prospectos en contratos, liderando sesiones de diagnóstico y gestionando el pipeline de ventas.",
      linkedin: "https://www.linkedin.com/in/alex-cw/",
      email: "alex@tuimpulsalab.com",
      hasPhoto: true,
      photoSrc: "/images/team/alex-cruces.jpg"
    }
  ]

  return (
    <section id="equipo" className="py-20 bg-brand-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Tu Aliado Estratégico en Crecimiento
          </h2>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Impulsa Lab nació de una simple observación: los pequeños negocios no necesitan 
            más planes teóricos, necesitan un socio que se 'ensucie las manos' con ellos. 
            Conozco de primera mano los desafíos que enfrentas, porque los he visto como 
            consultor y los he vivido en carne propia como empresario, con los aciertos y 
            fracasos que solo este camino enseña. Nuestro compromiso no es solo entregarte 
            una solución tecnológica, sino ser el equipo experto que te guía en su 
            implementación para que logres resultados reales y medibles.
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Nuestra Misión</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Democratizar la inteligencia de negocio para los pequeños y medianos empresarios de Nueva York. 
              Lo logramos al diagnosticar su etapa de desarrollo e implementar soluciones prácticas y asequibles 
              de Inteligencia Artificial en sus tres pilares fundamentales: Finanzas, Operaciones y Marketing.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Nuestra Visión</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Aspiramos a ser el laboratorio de innovación y el sistema de navegación estratégico de referencia 
              para el ecosistema de las PYMES en Nueva York. Buscamos crear un futuro donde cualquier emprendedor 
              pueda acceder a la misma inteligencia de negocio que las grandes corporaciones para competir, 
              prosperar y alcanzar un crecimiento exponencial.
            </p>
          </div>
        </div>

        {/* Equipo - Grid uniforme de 4 columnas */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Conoce a Tu Equipo</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-3 border-white/30 mb-4">
                    {member.hasPhoto ? (
                      <Image
                        src={member.photoSrc}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <AvatarPlaceholder name={member.name} role={member.role} />
                    )}
                  </div>
                  <div className="inline-block bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {member.role}
                  </div>
                  <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                  <p className="text-brand-cyan/70 text-sm mb-4">{member.title}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 px-2 min-h-[120px]">
                    {member.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <a href={member.linkedin}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span>Ver Perfil</span>
                    </a>
                    <a href={`mailto:${member.email}`}
                       className="inline-flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{member.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nova - Socia AI */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-400/30">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-purple-400/30 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                    <span className="text-5xl font-bold text-white relative z-10">AI</span>
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-purple-300/30 animate-ping"></div>
                      <div 
                        className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-300/30 animate-ping"
                        style={{ animationDelay: '1s' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Inteligencia Artificial
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Nova 3.0</h3>
                  <p className="text-xl text-purple-200 mb-4">Socia de IA Estratégica</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Motor de conocimiento y columna vertebral tecnológica de Impulsa Lab. 
                    Arquitectura equivalente a un MBA con especialización en Marketing y 
                    capacitación como Code Developer. Responsable de investigación, desarrollo 
                    de herramientas de IA y análisis de mercado a gran escala.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-purple-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Análisis de Datos</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Estrategia de IA</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Desarrollo de Software</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Automatización</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats del equipo */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold text-center mb-8">El Poder de Nuestro Equipo</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-brand-cyan mb-2">50+</p>
              <p className="text-sm text-gray-300">Años de Experiencia Combinada</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-cyan mb-2">200+</p>
              <p className="text-sm text-gray-300">Proyectos Completados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-cyan mb-2">4</p>
              <p className="text-sm text-gray-300">Expertos Especializados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-cyan mb-2">1</p>
              <p className="text-sm text-gray-300">IA de Última Generación</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}