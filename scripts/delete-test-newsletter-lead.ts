/**
 * scripts/delete-test-newsletter-lead.ts
 *
 * One-off cleanup script: deletes any Firestore `leads` documents matching
 *   email  = test@impulsa.dev
 *   source = noticias-newsletter
 *
 * Run once with:
 *   npx tsx -r dotenv/config scripts/delete-test-newsletter-lead.ts dotenv_config_path=.env.local
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const TARGET_EMAIL = 'test@impulsa.dev'
const TARGET_SOURCE = 'noticias-newsletter'

async function main() {
  if (
    !process.env.FIREBASE_ADMIN_PROJECT_ID ||
    !process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
    !process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64
  ) {
    throw new Error('Missing FIREBASE_ADMIN_* env vars (check .env.local)')
  }

  const privateKey = Buffer.from(
    process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64,
    'base64'
  ).toString('utf-8')

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
      }),
    })
  }

  const db = getFirestore()
  const snap = await db
    .collection('leads')
    .where('email', '==', TARGET_EMAIL)
    .where('source', '==', TARGET_SOURCE)
    .get()

  if (snap.empty) {
    console.log(
      `[delete-test-newsletter-lead] No matching docs for ${TARGET_EMAIL} / ${TARGET_SOURCE}`
    )
    return
  }

  console.log(
    `[delete-test-newsletter-lead] Found ${snap.size} matching doc(s). Deleting...`
  )
  const batch = db.batch()
  snap.docs.forEach((d) => batch.delete(d.ref))
  await batch.commit()
  console.log(`[delete-test-newsletter-lead] Deleted ${snap.size} doc(s).`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[delete-test-newsletter-lead] Error:', err)
    process.exit(1)
  })
