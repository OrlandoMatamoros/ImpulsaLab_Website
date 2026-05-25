'use client'

import Image from 'next/image'
import { IMAGES } from '@/lib/constants'
import { useLanguage } from '@/contexts/LanguageContext'
import MascotV15 from '@/components/MascotV15'

export default function TeamSection() {
  const { t } = useLanguage()

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

  const teamMembers = [
    {
      name: "Orlando Matamoros",
      role: t.team.roles.director,
      title: t.team.roles.director,
      description: t.team.memberDescs.orlando,
      linkedin: "https://www.linkedin.com/in/orlando-matamoros-377430194",
      email: "orlando@tuimpulsalab.com",
      hasPhoto: true,
      photoSrc: IMAGES.orlandoPhoto
    },
    {
      name: "Diego Flores",
      role: "CMO",
      title: t.team.roles.cmo,
      description: t.team.memberDescs.diego,
      linkedin: "https://www.diegolflores.com/",
      email: "diego@tuimpulsalab.com",
      hasPhoto: true,
      photoSrc: "/images/team/diego-flores.jpg"
    },
    {
      name: "Katty Garces",
      role: "COO",
      title: t.team.roles.coo,
      description: t.team.memberDescs.katty,
      linkedin: "https://www.linkedin.com/in/katty-garces-b0574555/",
      email: "katty@tuimpulsalab.com",
      hasPhoto: true,
      photoSrc: "/images/team/katty-garces.jpg"
    },
    {
      name: "Alex Cruces",
      role: "CSO",
      title: t.team.roles.cso,
      description: t.team.memberDescs.alex,
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

        {/* Nova 4.0 - Plataforma de IA Integrada */}
        <div className="mb-16">
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

        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
          <h4 className="text-2xl font-bold text-center mb-8">{t.team.statsTitle}</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-brand-cyan mb-2">50+</p>
              <p className="text-sm text-gray-300">{t.team.statsAnos}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-cyan mb-2">200+</p>
              <p className="text-sm text-gray-300">{t.team.statsProyectos}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-cyan mb-2">4</p>
              <p className="text-sm text-gray-300">{t.team.statsExpertos}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-cyan mb-2">1</p>
              <p className="text-sm text-gray-300">{t.team.statsIA}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
