import { ImageResponse } from 'next/og'

// Flyer composer para el LinkedIn Content Publisher (n8n XJUCPujPhFcZvZwy).
// Recibe la imagen AI (Mystic) + layout decidido por Claude y compone el
// flyer final con gradiente continuo + tipografía Manrope del brand.
// GET /api/flyer?img=<url>&headline=...&subhead=...&credit=...&pos=top|bottom&hc=%23FFFFFF&ac=%23BFE3FF

export const runtime = 'edge'

const ALLOWED_IMG_HOSTS = [
  'cdn-magnific.freepik.com',
  'api.freepik.com',
  'ai-statics.freepik.com',
  'www.tuimpulsalab.com',
  'tuimpulsalab.com',
]

const HEX = /^#[0-9a-fA-F]{6}$/

let fontsPromise: Promise<{ extraBold: ArrayBuffer; medium: ArrayBuffer }> | null = null
function loadFonts(origin: string) {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      fetch(new URL('/fonts/Manrope-ExtraBold.ttf', origin)).then((r) => r.arrayBuffer()),
      fetch(new URL('/fonts/Manrope-Medium.ttf', origin)).then((r) => r.arrayBuffer()),
    ]).then(([extraBold, medium]) => ({ extraBold, medium }))
  }
  return fontsPromise
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const p = url.searchParams

  const img = p.get('img') || ''
  let imgHost = ''
  try {
    imgHost = new URL(img).hostname
  } catch {
    return new Response('img param must be a valid URL', { status: 400 })
  }
  if (!ALLOWED_IMG_HOSTS.includes(imgHost)) {
    return new Response('img host not allowed', { status: 403 })
  }

  const headline = (p.get('headline') || '').slice(0, 90).trim()
  const subhead = (p.get('subhead') || '').slice(0, 110).trim()
  const credit = (p.get('credit') || 'tuimpulsalab.com').slice(0, 90).trim()
  const pos = p.get('pos') === 'top' ? 'top' : 'bottom'
  const hcRaw = p.get('hc') || ''
  const acRaw = p.get('ac') || ''
  const hc = HEX.test(hcRaw) ? hcRaw : '#FFFFFF'
  const ac = HEX.test(acRaw) ? acRaw : '#BFE3FF'

  if (!headline) return new Response('headline required', { status: 400 })

  const { extraBold, medium } = await loadFonts(url.origin)

  const headlineSize = headline.length > 58 ? 48 : 58
  const gradient =
    pos === 'bottom'
      ? 'linear-gradient(to top, rgba(4,14,40,0.93) 0%, rgba(4,14,40,0.74) 16%, rgba(4,14,40,0.38) 32%, rgba(4,14,40,0) 50%)'
      : 'linear-gradient(to bottom, rgba(4,14,40,0.93) 0%, rgba(4,14,40,0.74) 16%, rgba(4,14,40,0.38) 32%, rgba(4,14,40,0) 50%)'

  return new ImageResponse(
    (
      <div style={{ width: 1024, height: 1024, display: 'flex', position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          width={1024}
          height={1024}
          style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 1024, objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1024, height: 1024, display: 'flex', backgroundImage: gradient }} />
        <div
          style={{
            position: 'absolute',
            left: 60,
            right: 60,
            ...(pos === 'bottom' ? { bottom: 56 } : { top: 56 }),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', width: 72, height: 7, backgroundColor: ac, borderRadius: 4, marginBottom: 26 }} />
          <div
            style={{
              display: 'flex',
              fontFamily: 'Manrope',
              fontWeight: 800,
              fontSize: headlineSize,
              lineHeight: 1.14,
              color: hc,
              letterSpacing: '-0.5px',
              textShadow: '0 2px 14px rgba(0,0,0,0.55)',
              maxWidth: 880,
            }}
          >
            {headline}
          </div>
          {subhead ? (
            <div
              style={{
                display: 'flex',
                fontFamily: 'Manrope',
                fontWeight: 500,
                fontSize: 30,
                lineHeight: 1.3,
                color: ac,
                marginTop: 18,
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                maxWidth: 860,
              }}
            >
              {subhead}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontFamily: 'Manrope',
              fontWeight: 500,
              fontSize: 23,
              color: 'rgba(255,255,255,0.78)',
              marginTop: 22,
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            {credit}
          </div>
        </div>
      </div>
    ),
    {
      width: 1024,
      height: 1024,
      fonts: [
        { name: 'Manrope', data: extraBold, weight: 800, style: 'normal' },
        { name: 'Manrope', data: medium, weight: 500, style: 'normal' },
      ],
      headers: {
        'Cache-Control': 'no-store',
        'Content-Disposition': 'inline; filename="flyer.png"',
      },
    }
  )
}
