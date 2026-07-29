# CLAUDE.md — ImpulsaLab

## Workflow Rules
- **Always commit and push** after completing changes. Do not ask for confirmation — just do it.

## Firebase App Check — variable crítica

`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (Vercel, proyecto `impulsa-lab-v-claude`) es **crítica en producción**.

`lib/firebase.ts:68-80` inicializa App Check **solo si esa variable existe**. Si falta, el código NO falla:
emite un `console.warn` y sigue de largo sin App Check. Con enforcement activo en Firestore, eso deja
al cliente sin token → todas las lecturas/escrituras del navegador contra Firestore devuelven
`PERMISSION_DENIED` **sin error de build ni de deploy**. Falla silenciosa.

Reglas:
- No borrar, renombrar ni vaciar esa variable sin desactivar antes el enforcement de App Check.
- Si se toca el proveedor de reCAPTCHA, la site key del cliente debe seguir correspondiendo al
  `recaptchaV3Config` registrado en el proyecto `impulsa-lab` (778240447733).
- Estado y métricas: consola Firebase → App Check, o Cloud Monitoring
  (`firebaseappcheck.googleapis.com/services/verification_count`, label `security`).
  El label `security` es el que importa: `VALID` pasa; `MISSING_*` / `INVALID` es tráfico que el
  enforcement rechazaría.
