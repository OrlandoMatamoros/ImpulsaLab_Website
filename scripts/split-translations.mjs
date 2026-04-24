// Script to split translation files into ES-only and EN-only modules.
// Run: node scripts/split-translations.mjs
//
// For each file in utils/translations/ that exports both *ES and *EN constants,
// this script creates:
//   - {file}-es.ts  (ES only, default export for webpack tree-shaking)
//   - {file}-en.ts  (EN only, default export for webpack tree-shaking)
//
// The original files are kept intact (barrel imports remain compatible).

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const translationsDir = path.join(__dirname, '..', 'utils', 'translations')

const files = fs.readdirSync(translationsDir).filter(
  (f) => f.endsWith('.ts') && !f.startsWith('index') && !f.startsWith('translations-') && !f.endsWith('-es.ts') && !f.endsWith('-en.ts')
)

for (const file of files) {
  const filePath = path.join(translationsDir, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  const baseName = file.replace('.ts', '')

  // Find all top-level export const declarations
  // Pattern: export const <name>ES = { ... } and export const <name>EN = { ... }
  // We split the file at the boundary between ES and EN exports

  // Find the position of the first EN export
  const enMatch = content.match(/\nexport const \w+EN\s*[=:]/)
  if (!enMatch) {
    console.log(`Skipping ${file} — no EN export found`)
    continue
  }

  const enStart = content.indexOf(enMatch[0])
  const esPart = content.slice(0, enStart).trim()
  const enPart = content.slice(enStart).trim()

  // Extract ES export name(s)
  const esNames = [...esPart.matchAll(/export const (\w+ES)\s*[=:]/g)].map(m => m[1])
  const enNames = [...enPart.matchAll(/export const (\w+EN)\s*[=:]/g)].map(m => m[1])

  if (esNames.length === 0 || enNames.length === 0) {
    console.log(`Skipping ${file} — could not extract export names`)
    continue
  }

  // Create ES file
  const esFile = path.join(translationsDir, `${baseName}-es.ts`)
  const esContent = `// Auto-generated — ES-only slice of ${file}
// DO NOT edit directly; update ${file} and re-run scripts/split-translations.mjs
${esPart}

export default ${esNames[0]}
`
  fs.writeFileSync(esFile, esContent)

  // Create EN file
  const enFile = path.join(translationsDir, `${baseName}-en.ts`)
  const enContent = `// Auto-generated — EN-only slice of ${file}
// DO NOT edit directly; update ${file} and re-run scripts/split-translations.mjs
${enPart}

export default ${enNames[0]}
`
  fs.writeFileSync(enFile, enContent)

  console.log(`✓ ${file} → ${baseName}-es.ts (${esNames[0]}) + ${baseName}-en.ts (${enNames[0]})`)
}

console.log('\nDone. Now update translations-es.ts and translations-en.ts to import from the split files.')
