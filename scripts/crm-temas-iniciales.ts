// scripts/crm-temas-iniciales.ts
// Escribe el campo `tema` (segunda persona, corto) de los contactos ya cargados.
// Es el texto que entra en el mensaje de WhatsApp; la nota interna `interes` NO se usa ahí.
// Correr:  npx tsx scripts/crm-temas-iniciales.ts
import { config } from 'dotenv'
config({ path: '.env.local' })

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const TEMAS: Record<string, string> = {
  tel_5215533031499: 'implementar IA en tu empresa y capacitar a tu equipo',
  tel_817076391334: 'una posible alianza entre UPSTART e Impulsa Lab',
  tel_17183500564: 'automatizar el trabajo de tu compañía de impuestos',
  tel_14255486781: 'poner a trabajar la IA en tu taquería',
  tel_17869914570: 'lo que podemos hacer por El Molino',
  tel_573126507341: 'lo que hacemos en Impulsa Lab',
  tel_18452480554: 'lo que hacemos en Impulsa Lab',
  mail_ooorale41_gmail_com: 'los resultados de tu Diagnóstico 3D',
}

async function main() {
  if (!getApps().length) {
    const privateKey = Buffer.from(process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64!, 'base64').toString('utf8')
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
      }),
    })
  }
  const db = getFirestore()
  let escritos = 0
  for (const [id, tema] of Object.entries(TEMAS)) {
    const ref = db.collection('crm_contactos').doc(id)
    const doc = await ref.get()
    if (!doc.exists) {
      console.log('  (no existe) ' + id)
      continue
    }
    // No pisa un tema que Orlando ya haya escrito a mano.
    if ((doc.get('tema') || '').trim()) {
      console.log('  (ya tenía tema) ' + doc.get('nombre'))
      continue
    }
    await ref.update({ tema, actualizado: new Date().toISOString() })
    escritos++
    console.log('  ok  ' + doc.get('nombre') + ' → ' + tema)
  }
  console.log(escritos + ' temas escritos')
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
