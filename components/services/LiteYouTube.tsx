'use client'

import { useState } from 'react'

interface LiteYouTubeProps {
  videoId: string
  title: string
  className?: string
}

/**
 * Facade de YouTube: renderiza la miniatura y solo monta el <iframe> al hacer clic.
 *
 * Motivo: la consolidacion de /servicios/operaciones/* en una sola URL junta 5 videos
 * en la misma pagina. Cinco iframes de YouTube en carga inicial cuestan ~1.5MB y
 * bloquean el hilo principal — exactamente lo que se corrigio en el trabajo de
 * performance de julio. El facade deja la carga inicial en una imagen.
 */
export default function LiteYouTube({ videoId, title, className = '' }: LiteYouTubeProps) {
  const [activo, setActivo] = useState(false)

  if (activo) {
    return (
      <iframe
        className={`absolute top-0 left-0 w-full h-full ${className}`}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActivo(true)}
      aria-label={`Reproducir video: ${title}`}
      className={`group absolute top-0 left-0 w-full h-full cursor-pointer ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 shadow-lg transition-transform group-hover:scale-110">
          <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  )
}
