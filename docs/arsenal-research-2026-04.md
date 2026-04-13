# Arsenal Tecnológico — Research 2026-04

Autor: Claude (en Impulsa Lab) · Fecha: 2026-04-13
Página objetivo: `app/herramientas/arsenal/page.tsx`
Data source: `lib/tools-data.tsx`

## Resumen ejecutivo

El Arsenal venía con **139 herramientas en 18 categorías**, acumuladas sin criterio editorial, con duplicados, tools descontinuadas (Adobe XD, InVision, Skype), tools secundarias sin tracción (Poe, Phind, You.com, NightCafe, Artbreeder, Fliki, Pictory, Lumen5, Wordtune, Rytr) y solapamiento fuerte entre categorías (`Chat IA` vs `IA Tools`, `Código` vs `Cloud`, `SEO` vs `Analytics`).

La curación 2026-04 baja el inventario a **89 herramientas en 15 categorías**, conservando únicamente tools con señal real de adopción en 2025/2026 según Product Hunt, G2, Stack Overflow Developer Survey 2024, análisis de cuota de mercado y reviews independientes.

| Métrica | Antes | Después | Δ |
|---|---:|---:|---:|
| Herramientas | 139 | 89 | −50 (−36%) |
| Categorías | 18 | 15 | −3 |
| Categorías redundantes | 4 | 0 | — |
| Tools descontinuadas / zombie | 8+ | 0 | — |

**Por qué:** menos ruido, mayor utilidad percibida (cada tool que queda es referencia estándar 2025/2026), menor costo de mantenimiento (≈1000 líneas de SVG innecesario fuera), y base sana para futuras inserciones selectivas (FLUX, Sora, Veo, Kling, Udio, Windsurf, Claude Code, SurferSEO, Klaviyo) en un segundo pase que agregue iconos.

## Consolidación de categorías

| De (antes) | A (después) | Razón |
|---|---|---|
| `Chat IA` + `IA Tools` | `Chat IA & LLMs` | `IA Tools` tenía OpenAI/Anthropic que eran duplicados de ChatGPT/Claude. Hugging Face + Replicate quedan como plataformas de desarrollo de IA dentro de la misma vertical. |
| `Código` + `Cloud` | `Desarrollo & Cloud` | Stack Overflow 2024 muestra que los developers consumen editor+hosting+cloud como un solo stack. Vercel/Netlify ya eran ambiguos entre ambas categorías. |
| `SEO` + `Analytics` | `SEO & Analytics` | Mismo buyer persona (marketers/growth). Semrush ya cubre ambas disciplinas. |
| `Marketing` → | `Marketing & CRM` | HubSpot es CRM, no solo marketing. Rename aclara scope. |
| `E-commerce` → | `E-commerce & Pagos` | Stripe/PayPal/Square son rails de pago, no e-commerce per se. Rename aclara. |
| `Audio` → | `Audio IA` | Todas las tools sobrevivientes son generativas IA. |
| `Escritura` → | `Escritura IA` | Idem. |

## Análisis por categoría

### 1. Chat IA & LLMs — 8 → 7

**Mantener:** ChatGPT, Claude, Gemini, Perplexity, Copilot, Hugging Face, Replicate.
**Remover:** Poe, You.com, Phind.

- ChatGPT mantiene liderazgo: ~1B USD/mes revenue, 2.5B prompts/día, referente de mercado (Visual Capitalist, First Page Sage, abril 2026).
- Claude es la segunda opción para escritura estructurada y código.
- Perplexity domina búsqueda/verificación; Gemini lidera integración Google Workspace; Copilot es el default enterprise Microsoft 365.
- Poe, You.com, Phind: cuota de mercado marginal, no aparecen en los rankings de 2025/2026.
- Hugging Face + Replicate trasladados desde `IA Tools` porque son plataformas donde ya se despliegan los LLMs actuales.
- OpenAI y Anthropic eliminados (duplicados funcionales de ChatGPT y Claude — la página debe mostrar el producto consumible, no la empresa).

**Candidatos para fase 3 (nuevos iconos):** Grok (xAI), Mistral, Meta AI.

### 2. Imágenes IA — 8 → 6

**Mantener:** Midjourney, DALL-E 3, Stable Diffusion, Leonardo AI, Ideogram, Adobe Firefly (movido desde `Diseño`).
**Remover:** Bing Image Creator, NightCafe, Artbreeder.

- Midjourney v7 (febrero 2025) sigue siendo la referencia artística (Krea AI review, anthemcreation 2025).
- Ideogram 3.0 (marzo 2025) estándar para texto en imágenes.
- Leonardo: favorito de diseñadores de juegos y assets.
- Bing Image Creator es básicamente DALL-E 3 (redundante). NightCafe/Artbreeder quedaron lejos del pelotón delantero.

**Candidatos para fase 3:** FLUX.1 (Black Forest Labs), Nano Banana / Gemini 2.5 Flash Image, Krea.

### 3. Video IA — 9 → 5

**Mantener:** RunwayML, Pika Labs, HeyGen, Synthesia, Descript.
**Remover:** D-ID, Fliki, Pictory, Lumen5.

- Runway Gen-4 es el estándar profesional con controles de personaje/escena.
- Pika es el mejor para velocidad social-media.
- HeyGen domina presenter/translate/video-translate con lip-sync.
- Synthesia es el líder corporativo de video con avatar.
- Descript se mantiene por el flujo podcasts/tutoriales + transcripción.
- Fliki/Pictory/Lumen5/D-ID no aparecen en los rankings 2025; desplazados por Runway/Pika.

**Candidatos para fase 3:** Sora 2 (OpenAI), Veo 3.1 (Google), Kling, Luma Dream Machine.

### 4. Audio IA — 8 → 4

**Mantener:** ElevenLabs, Suno AI, Murf AI, AIVA.
**Remover:** Soundraw, Boomy, Splash Pro, Voicemod.

- Suno v4.5 es el default para generación de música (felloai julio 2025, aimagicx 2026).
- ElevenLabs entró a música en agosto 2025 con licencia comercial legítima (Merlin/Kobalt).
- Murf y AIVA quedan como alternativas enterprise de narración/scoring.

**Candidatos para fase 3:** Udio, Mureka.

### 5. Escritura IA — 8 → 4

**Mantener:** Grammarly, Jasper, Copy.ai, Writesonic.
**Remover:** Hemingway, ProWritingAid, Rytr, Wordtune.

- Jasper mantiene 20–30% del mercado dedicado a AI writing enterprise (datbot.ai 2025).
- Grammarly sigue siendo referente en edición/gramática con GrammarlyGO.
- Hemingway es un static editor web sin IA (1 tool legacy). ProWritingAid, Rytr, Wordtune no aparecen en los rankings top.

### 6. Diseño — 9 → 4

**Mantener:** Figma, Canva, Framer, Sketch.
**Remover:** Adobe Firefly (→ Imágenes IA), Adobe XD, InVision, Penpot, Lunacy.

- Figma domina 70–80% del segmento UI/UX profesional (Design Tools Survey 2025).
- Canva mantiene el segmento speed/accessibility.
- Framer pivotó a website builder, sigue vigente.
- Sketch conserva base leal macOS.
- **Descontinuadas confirmadas:** Adobe XD (Adobe congeló desarrollo tras fallar compra de Figma), InVision (shutdown operativo finales 2024).
- Penpot/Lunacy: cuota marginal.

### 7. Desarrollo & Cloud — 11 + 7 → 11

**Mantener:** GitHub, GitHub Copilot, Cursor, Replit, Vercel, Netlify, Supabase, AWS, Google Cloud, Microsoft Azure, Cloudflare.
**Remover:** Tabnine, CodePen, CodeSandbox, Railway, DigitalOcean, Linode, Heroku.

- Stack Overflow Developer Survey 2024: VS Code + Copilot dominan, Docker es usado por 59% de pros, PostgreSQL lidera DBs, AWS/Azure/GCP son los tres cloud principales.
- Cursor pasó 1M+ daily active users en marzo 2026 (NxCode, Daily.dev), referente para el editor IA.
- GitHub Copilot alcanzó 2.4B USD ARR Q1 2026.
- Tabnine perdió tracción frente a Cursor/Copilot.
- Netlify y Vercel siguen siendo los PaaS de frontend por default; Railway se mantiene más como alternativa nicho — se remueve para priorizar señal fuerte.
- DigitalOcean/Linode/Heroku: declive post free-tier (Heroku) y adquisición de Linode por Akamai.

**Candidatos para fase 3:** Claude Code, Windsurf, Zed, Bolt.new, Lovable, v0, Hetzner (Stack Overflow: most-admired cloud 75% — señal interesante).

### 8. Productividad — 10 → 8

**Mantener:** Notion, Obsidian, Monday, ClickUp, Asana, Todoist, Linear, Airtable.
**Remover:** Trello, Coda.

- Notion es el referente all-in-one.
- ClickUp y Monday lideran project management (Motion 2025, eesel 2025).
- Linear es el estándar para engineering teams modernos.
- Airtable domina data-heavy workflows.
- Obsidian mantiene PKM individual.
- Trello quedó eclipsado por ClickUp/Monday en features. Coda nunca logró tracción.

### 9. Automatización — 8 → 3

**Mantener:** Zapier, Make, n8n.
**Remover:** IFTTT, Integromat, Automate.io, Pabbly, Workato.

- El panorama se consolidó en exactamente estas 3 (digidop 2026, scalevise 2025).
- Integromat = Make (rebrand 2022, duplicado).
- Automate.io: adquirida por Notion y descontinuada.
- IFTTT: nicho de consumer IoT, irrelevante para automation de negocio.
- Workato/Pabbly: enterprise/niche.

### 10. Marketing & CRM — 4 → 4

**Mantener:** HubSpot, Mailchimp, Buffer, Hootsuite.

No se remueve nada — set compacto y todos con cuota de mercado vigente.

**Candidatos para fase 3:** Klaviyo (ecomm email líder), ConvertKit/Kit, ActiveCampaign.

### 11. SEO & Analytics — 4 + 8 → 8

**Mantener:** Semrush, Ahrefs, Moz, Google Analytics, Mixpanel, Hotjar, Power BI, Tableau.
**Remover:** Screaming Frog, Amplitude, Looker, Segment.

- Semrush/Ahrefs son los "big two" SEO con ~130 USD/mes cada uno (backlinko 2026, technologyadvice 2025).
- Moz se mantiene por el tier inicial (Moz starter, generoso free trial).
- Google Analytics es obligatorio por default.
- Mixpanel + Hotjar cubren product analytics y heatmaps.
- Power BI + Tableau son los dos estándares BI para SMB/enterprise.
- Amplitude solapa con Mixpanel; Looker/Segment son enterprise stack; Screaming Frog es nicho desktop.

**Candidatos para fase 3:** SurferSEO, Google Search Console, Google Looker Studio (free).

### 12. E-commerce & Pagos — 8 → 6

**Mantener:** Shopify, WooCommerce, Square, PayPal, Stripe, Etsy.
**Remover:** BigCommerce, Gumroad.

- Shopify: 28.8% del top 1M ecomm sites, 73% del top 800 DTC, GMV 292B USD 2024 (chargeflow 2025, shopify stats 2025).
- WooCommerce: 18–24% (plugin WordPress, base larga tail).
- BigCommerce: solo ~3% US market, justifica remover para no diluir.
- Gumroad: creator economy nicho.

### 13. Comunicación — 8 → 6

**Mantener:** Slack, Zoom, Discord, Microsoft Teams, Google Meet, WhatsApp.
**Remover:** Skype, Telegram.

- Skype: Microsoft anunció shutdown oficial mayo 2025 (discontinuado de facto).
- Telegram: fuerte para comunidades pero no es tool de negocio primaria; se remueve por foco.

### 14. Social Media — 8 → 8

**Mantener:** Instagram, LinkedIn, TikTok, YouTube, Twitter/X, Facebook, Pinterest, Reddit.

Set completo intacto — las 8 son plataformas obligatorias para cualquier estrategia de presencia social.

### 15. Educación — 8 → 5

**Mantener:** Duolingo, Coursera, Udemy, Khan Academy, MasterClass.
**Remover:** edX, Skillshare, Pluralsight.

- Top 5 por brand recall para audiencia SMB.
- edX: fusionado con 2U, señal confusa.
- Skillshare: cuota declinando.
- Pluralsight: enterprise developer training, nicho.

## Categorías removidas / fusionadas

| Categoría antigua | Destino |
|---|---|
| `IA Tools` (5 tools) | Fusión en `Chat IA & LLMs` (mantiene Hugging Face + Replicate; los demás eran duplicados de ChatGPT/Claude) |
| `Cloud` (7 tools) | Fusión en `Desarrollo & Cloud` (mantiene AWS, GCP, Azure, Cloudflare) |
| `Analytics` (8 tools) | Fusión en `SEO & Analytics` |

## Pendientes / próximos pasos (fase 3)

- Agregar 1-2 iconos nuevos por vertical para tools 2025/2026 que no estaban en el set original (FLUX, Sora, Veo, Kling, Udio, Windsurf, Claude Code, Klaviyo, SurferSEO).
- Revisar cada 6 meses contra Product Hunt top, Stack Overflow Survey y First Page Sage rankings.
- Considerar añadir metadato `tier` (core / emerging / legacy) para permitir filtrado avanzado en el futuro.

## Fuentes (consultadas 2026-04-13)

**AI chatbots / LLMs**
- [The AI 'Big Bang' Study 2025 — onelittleweb.com](https://onelittleweb.com/data-studies/best-ai-chatbots/)
- [Ranked: AI Chatbot Market Share in 2025 — Visual Capitalist](https://www.visualcapitalist.com/ai-chatbot-market-share-in-2025/)
- [Top Generative AI Chatbots by Market Share — First Page Sage (abril 2026)](https://firstpagesage.com/reports/top-generative-ai-chatbots/)
- [The best AI chatbots for 2025 — TechTarget](https://www.techtarget.com/searchenterpriseai/tip/The-best-AI-chatbots-Compare-features-and-costs)

**AI code editors**
- [Best AI Code Editor 2026 — NxCode](https://www.nxcode.io/resources/news/best-ai-code-editor-2026-cursor-windsurf-copilot-zed-compared)
- [Cursor vs VS Code vs Windsurf 2026 — Daily.dev](https://daily.dev/blog/cursor-vs-vs-code-vs-windsurf-ai-code-editor-comparison)
- [Coding Agents Comparison — Artificial Analysis](https://artificialanalysis.ai/agents/coding)
- [AI Coding Tools Compared (2026) — TLDL](https://www.tldl.io/resources/ai-coding-tools-2026)

**AI video**
- [Best AI Video Generator — Massive.io](https://massive.io/gear-guides/the-best-ai-video-generator-comparison/)
- [Veo 3.1 vs Top AI Video Generators 2026 — pxz.ai](https://pxz.ai/blog/veo-31-vs-top-ai-video-generators-2026)
- [Ultimate AI Video Generation Models Guide 2025 — ulazai](https://ulazai.com/ai-video-models-guide-2025/)

**AI image generation**
- [Best AI Image Generators 2025 — pxz.ai](https://pxz.ai/blog/best-ai-image-generators-2025-tested-ranked)
- [Top 8 AI Image Generators — Krea](https://www.krea.ai/articles/ai-image-generators-2025)
- [Best AI Image Generators 2025/2026 — Overchat AI](https://overchat.ai/ai-hub/best-ai-image-generators)

**Developer platforms**
- [2024 Stack Overflow Developer Survey — Technology](https://survey.stackoverflow.co/2024/technology)
- [Highlights from the 2024 Stack Overflow Developer Survey — daily.dev](https://daily.dev/blog/highlights-from-the-2024-stack-overflow-developer-survey)
- [Developers want more, more, more — Stack Overflow Blog](https://stackoverflow.blog/2025/01/01/developers-want-more-more-more-the-2024-results-from-stack-overflow-s-annual-developer-survey/)

**No-code automation**
- [n8n vs Make vs Zapier 2026 — digidop](https://www.digidop.com/blog/n8n-vs-make-vs-zapier)
- [Make vs Zapier vs n8n 2025 — scalevise](https://scalevise.com/resources/make-vs-n8n-vs-zapier-which-no-code-automation-tool-should-you-use/)
- [No-Code / Low-Code Automation 2025 landscape — Medium](https://medium.com/@jewelhuq/the-2025-landscape-of-no-code-low-code-automation-best-n8n-make-alternatives-when-to-use-them-19647be1f0e2)

**AI audio / music**
- [Suno vs Udio vs ElevenLabs July 2025 — Fello AI](https://felloai.com/suno-ai-vs-elevenlabs-vs-udio-which-ai-music-generator-is-the-best-in-july-2025/)
- [Suno vs Udio vs ElevenLabs 2026 — AI Magicx](https://www.aimagicx.com/blog/suno-vs-udio-vs-elevenlabs-music-comparison-2026)

**AI writing**
- [Best AI Writing Tools 2025 — theairankings](https://theairankings.com/best-ai-for-writing/)
- [AI Writing Tools Compared — datbot.ai](https://datbot.ai/blog/ai-writing-tools-compared/)

**Productivity**
- [Notion vs ClickUp 2025 — eesel](https://www.eesel.ai/blog/notion-vs-clickup)
- [Best Notion alternatives 2025 — Motion](https://www.usemotion.com/blog/notion-vs-clickup)
- [10 Best Notion Alternatives 2026 — Airtable](https://www.airtable.com/articles/notion-alternatives)

**SEO**
- [SEMrush vs Ahrefs vs Moz 2025 — Passionfruit](https://www.getpassionfruit.com/blog/semrush-vs-ahrefs-vs-moz-which-seo-tool-is-best-for-2025)
- [Ahrefs vs Semrush 2026 — Backlinko](https://backlinko.com/ahrefs-vs-semrush)
- [The 6 Best SEO Tools — TechnologyAdvice](https://technologyadvice.com/blog/marketing/best-seo-tools/)

**Design tools**
- [Figma vs Canva 2025 — Temlis](https://www.temlis.com/blogs/figma-vs-canva-in-2025-the-ultimate-comparison)
- [Figma Statistics 2026 — Cropink](https://cropink.com/figma-statistics)
- [Figma and Creative Cloud Market — AlphaSense](https://www.alpha-sense.com/resources/research-articles/figma-creative-cloud-market/)

**E-commerce**
- [Shopify vs BigCommerce 2025 — Chargeflow](https://www.chargeflow.io/blog/shopify-vs-bigcommerce)
- [WooCommerce vs Shopify market share 2026 — Mobiloud](https://www.mobiloud.com/blog/woocommerce-vs-shopify-market-share-statistics)
- [Best Ecommerce Platforms 2025 market share — Brainspate](https://brainspate.com/blog/ecommerce-platforms-market-share/)
