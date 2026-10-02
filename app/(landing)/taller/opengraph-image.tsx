import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { TALLER } from '@/lib/taller/config'
import { fechaLarga, hora } from '@/lib/taller/fechas'

// Tarjeta que aparece al pegar el enlace en WhatsApp, Facebook o LinkedIn.
// Sin precio a propósito: WhatsApp guarda la vista previa por días y el precio cambia.
export const runtime = 'nodejs'
export const alt = `${TALLER.nombre} en Brooklyn, ${fechaLarga(TALLER.inicio)}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default async function Image() {
  const publico = path.join(process.cwd(), 'public')
  const [fuente, fuenteMedia, retrato, isotipo] = await Promise.all([
    readFile(path.join(publico, 'fonts/Manrope-ExtraBold.ttf')),
    readFile(path.join(publico, 'fonts/Manrope-Medium.ttf')),
    readFile(path.join(publico, 'images/taller/orlando-taller.png')),
    readFile(path.join(publico, 'images/taller/isotipo-negativo.png')),
  ])
  const src = (b: Buffer) => `data:image/png;base64,${b.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #002D62 0%, #002D62 55%, #001B3D 100%)',
          fontFamily: 'Manrope',
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -40,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(0,188,212,0.45) 0%, rgba(0,188,212,0) 65%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 0 56px 64px', width: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={src(isotipo)} width={30} height={54} alt="" />
            <span style={{ fontSize: 28, fontWeight: 800 }}>Impulsa Lab</span>
          </div>
          <div style={{ display: 'flex', marginTop: 44, fontSize: 30, fontWeight: 800, color: '#00BCD4' }}>{TALLER.nombre}</div>
          <div style={{ display: 'flex', marginTop: 12, fontSize: 64, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>
            Pon la IA a trabajar en tu negocio
          </div>
          <div style={{ display: 'flex', marginTop: 26, fontSize: 28, fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>
            Presencial, en español, con tu negocio real y con mentoría
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 'auto',
              alignSelf: 'flex-start',
              background: '#FFFFFF',
              color: '#002D62',
              borderRadius: 18,
              padding: '16px 26px',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            {`${cap(fechaLarga(TALLER.inicio))}, ${hora(TALLER.inicio)} · Brooklyn`}
          </div>
        </div>
        <img
          src={src(retrato)}
          width={420}
          height={573}
          alt=""
          style={{ position: 'absolute', right: 20, bottom: 0 }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Manrope', data: fuente, weight: 800, style: 'normal' },
        { name: 'Manrope', data: fuenteMedia, weight: 500, style: 'normal' },
      ],
    },
  )
}
