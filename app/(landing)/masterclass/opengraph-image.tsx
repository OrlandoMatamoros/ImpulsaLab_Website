import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { TALLER } from '@/lib/taller/config'
import { fechaCorta, fechaLarga, hora } from '@/lib/taller/fechas'

// Tarjeta que aparece al pegar el enlace en WhatsApp, Facebook o LinkedIn.
// Sin precio a propósito: WhatsApp guarda la vista previa por días y el precio cambia.
// PESO: WhatsApp suele omitir miniaturas de más de ~300 KB. Fondo plano (los degradados la
// engordan) y la foto de Orlando en círculo, ya recortada a su tamaño final (orlando-og.jpg, 340×340,
// sacada de FotoWebImpulsalab.png). Medir con `curl -o /dev/null -w %{size_download}` si se cambia.
export const runtime = 'nodejs'
export const alt = `${TALLER.evento.nombre} en Brooklyn, ${fechaLarga(TALLER.inicio)}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default async function Image() {
  const publico = path.join(process.cwd(), 'public')
  const [fuente, fuenteMedia, foto, isotipo] = await Promise.all([
    readFile(path.join(publico, 'fonts/Manrope-ExtraBold.ttf')),
    readFile(path.join(publico, 'fonts/Manrope-Medium.ttf')),
    readFile(path.join(publico, 'images/taller/orlando-og.jpg')),
    readFile(path.join(publico, 'images/taller/isotipo-negativo.png')),
  ])
  const uri = (b: Buffer, tipo: string) => `data:${tipo};base64,${b.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#002D62', fontFamily: 'Manrope', color: '#FFFFFF', position: 'relative' }}>
        {/* Foto en círculo con aro cian: un círculo pesa la mitad que la foto a lo alto (el fondo de
            oficina engorda el PNG: 445 KB contra el límite de ~300 KB de WhatsApp). */}
        <div
          style={{
            position: 'absolute',
            right: 70,
            top: 135,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: '#00BCD4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={uri(foto, 'image/jpeg')} width={340} height={340} alt="" style={{ borderRadius: 9999 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 0 56px 64px', width: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={uri(isotipo, 'image/png')} width={30} height={54} alt="" />
            <span style={{ fontSize: 28, fontWeight: 800 }}>Impulsa Lab</span>
          </div>
          <div style={{ display: 'flex', marginTop: 44, fontSize: 30, fontWeight: 800, color: '#00BCD4' }}>{TALLER.evento.nombre}</div>
          <div style={{ display: 'flex', marginTop: 12, fontSize: 64, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>
            Pon la IA a trabajar en tu negocio
          </div>
          <div style={{ display: 'flex', marginTop: 26, fontSize: 28, fontWeight: 500, color: 'rgba(255,255,255,0.88)' }}>
            Presencial, en español y con casos reales resueltos en vivo
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
            {`${cap(fechaCorta(TALLER.inicio))} · ${hora(TALLER.inicio)} · Brooklyn`}
          </div>
        </div>
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
