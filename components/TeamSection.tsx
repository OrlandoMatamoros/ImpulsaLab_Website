'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IMAGES } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import MascotV15 from '@/components/MascotV15'

const AvatarPlaceholder = ({ name, role }: { name: string, role: string }) => {
  const initials = name.split(' ').map(n => n[0]).join('')
  const bgGradient =
    role === 'Director de Estrategia' || role === 'Strategy Director' ? 'from-blue-500 to-indigo-500' :
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

type TeamMember = {
  name: string
  role: string
  title: string
  description: string
  linkedin: string
  email: string
  hasPhoto: boolean
  photoSrc: string
}

// Regla 54: lo que se renderiza aparte recibe sus datos POR PARAMETRO,
// incluido el texto ya traducido (verPerfilLabel) — nada de leer el contexto aqui.
const TeamMemberCard = ({ member, verPerfilLabel }: { member: TeamMember, verPerfilLabel: string }) => {
  const [imgFailed, setImgFailed] = useState(false)
  const showPhoto = member.hasPhoto && !imgFailed

  return (
    <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 relative flex-shrink-0">
          {showPhoto ? (
            <Image
              src={member.photoSrc}
              alt={`${member.name} — ${member.title}`}
              fill
              sizes="160px"
              className="object-cover"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <AvatarPlaceholder name={member.name} role={member.role} />
          )}
        </div>

        <div className="flex-1">
          <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
          <p className="text-brand-cyan font-semibold mb-4">{member.title}</p>
          <p className="text-gray-200 leading-relaxed mb-6">{member.description}</p>

          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
            <span>{verPerfilLabel}</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export default function TeamSection() {
  const { t } = useLanguage()

  const teamMembers: TeamMember[] = [
    {
      name: "Orlando Matamoros",
      // Se publica como "Fundador", no CEO ni Director de Estrategia (22-sep-2026):
      // con una sola persona en la seccion, "CEO" sugiere una estructura que no existe.
      role: t.team.roles.director, // solo alimenta el gradiente del AvatarPlaceholder
      title: t.team.roles.fundador,
      description: t.team.memberDescs.orlando,
      linkedin: "https://www.linkedin.com/in/orlando-matamoros-377430194",
      email: "orlando@tuimpulsalab.com",
      hasPhoto: true,
      photoSrc: IMAGES.orlandoPhoto
    },
    // Diego Flores (CMO) retirado de la seccion publica el 22-sep-2026: sigue siendo
    // socio (5 % de la LLC) pero no tiene rol operativo en Impulsa Lab, igual que
    // David Porras. La seccion muestra solo a quien atiende al cliente y da la cara
    // en la Academy, para que el visitante vea a la misma persona real en todos lados.
    // {
    //   name: "Diego Flores",
    //   role: "CMO",
    //   title: t.team.roles.cmo,
    //   description: t.team.memberDescs.diego,
    //   linkedin: "https://www.diegolflores.com/",
    //   email: "diego@tuimpulsalab.com",
    //   hasPhoto: true,
    //   photoSrc: "/images/team/diego-flores.jpg"
    // },
    // Katty Garces (COO) y Alex Cruces (CSO) retirados el 22-sep-2026: ya no forman
    // parte de Impulsa Lab. El reparto vigente de la LLC es Orlando 90 %, David Porras 5 %
    // y Diego Flores 5 %. Se publicaban con correos @tuimpulsalab.com que nadie atiende.
    // Sus descripciones siguen en utils/translations/* sin usarse; se limpian aparte.
  ]

  return (
    <section id="equipo" className="py-20 bg-brand-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t.team.titulo}
          </h2>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {t.team.descripcion}
          </p>
        </div>

        {/* Mision y Vision */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">{t.team.mision}</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              {t.team.misionDesc}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">{t.team.vision}</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              {t.team.visionDesc}
            </p>
          </div>
        </div>

        {/* Quien esta detras */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {t.team.conoceEquipo}
          </h3>
          <div className="space-y-8 max-w-3xl mx-auto">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                verPerfilLabel={t.team.verPerfil}
              />
            ))}
          </div>
        </div>

        {/* Nova 4.0 - Plataforma de IA Integrada — ultimo bloque de la seccion,
            sin margen inferior desde que se quito la fila de cifras (22-sep-2026) */}
        <div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-400/30">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-purple-400/30 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                    {/* Mascota oficial de la IA aplicada Impulsa Lab (cyan)
                        — representación canónica de Nova. Aprobado 2026-05-25. */}
                    <MascotV15
                      size={140}
                      variant="cyan"
                      expression="neutral"
                      animate
                      ariaLabel="Nova - IA aplicada Impulsa Lab"
                      className="relative z-10 drop-shadow-[0_0_24px_rgba(0,191,255,0.55)]"
                    />
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
                    {t.team.ia}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{t.team.novaTitle}</h3>
                  <p className="text-xl text-purple-200 mb-4">{t.team.novaRole}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {t.team.novaDesc}
                  </p>
                  <div className="space-y-3 mb-6">
                    {t.team.novaModels.map((model: string) => (
                      <div key={model} className="flex items-center gap-3 text-purple-200">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                        <span className="text-sm font-medium">{model}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {t.team.novaSkills.map((skill: string) => (
                      <div key={skill} className="flex items-center gap-2 text-purple-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 22-sep-2026: bloque de cifras eliminado por decision de Orlando —
            "200+ Proyectos", "50+ Anos de Experiencia Combinada" y "4 Expertos"
            no se podian sostener. Termina la limpieza que 8ed3a0a hizo en /nosotros.
            Lo que convierte aqui es la persona, no una fila de numeros. */}
      </div>
    </section>
  )
}
