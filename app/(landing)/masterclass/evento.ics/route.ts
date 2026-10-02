import { archivoIcs } from '@/lib/taller/calendario'

// /masterclass/evento.ics — el taller para Apple Calendar, Outlook o cualquier calendario.
export const dynamic = 'force-static'

export function GET() {
  return new Response(archivoIcs(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="taller-ia-impulsa-lab.ics"',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
  })
}
