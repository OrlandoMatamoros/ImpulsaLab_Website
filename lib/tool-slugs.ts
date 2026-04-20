/**
 * Map from tool.name (in lib/tools-data.tsx) to local SVG slug in
 * /public/logos/platforms/{slug}.svg. Downloaded via Simple Icons CDN.
 *
 * Tools not in this map fall back to Clearbit in PlatformLogo, then to the
 * per-tool SVG ComponentType defined in lib/tools-data.tsx.
 */
export const TOOL_SLUGS: Record<string, string> = {
  // Chat IA & LLMs
  'ChatGPT': 'openai',
  'Claude': 'anthropic',
  'Gemini': 'googlegemini',
  'Perplexity': 'perplexity',
  'Copilot': 'copilot',
  'Hugging Face': 'huggingface',
  'Replicate': 'replicate',
  // Imágenes IA
  'DALL-E 3': 'dalle3',
  'Adobe Firefly': 'adobefirefly',
  // Video IA — Simple Icons no tiene ninguno (RunwayML, Pika, HeyGen, Synthesia, Descript)
  // Audio IA
  'ElevenLabs': 'elevenlabs',
  'Suno AI': 'sunoai',
  // Escritura IA
  'Grammarly': 'grammarly',
  // Diseño
  'Figma': 'figma',
  'Canva': 'canva',
  'Framer': 'framer',
  'Sketch': 'sketch',
  // Desarrollo & Cloud
  'GitHub': 'github',
  'GitHub Copilot': 'githubcopilot',
  'Cursor': 'cursor',
  'Replit': 'replit',
  'Vercel': 'vercel',
  'Netlify': 'netlify',
  'Supabase': 'supabase',
  'AWS': 'aws',
  'Google Cloud': 'googlecloud',
  'Cloudflare': 'cloudflare',
  // Productividad
  'Notion': 'notion',
  'Obsidian': 'obsidian',
  'ClickUp': 'clickup',
  'Asana': 'asana',
  'Linear': 'linear',
  'Airtable': 'airtable',
  'Todoist': 'todoist',
  // Automatización
  'Zapier': 'zapier',
  'Make': 'make',
  'n8n': 'n8n',
  // Marketing & CRM
  'HubSpot': 'hubspot',
  'Mailchimp': 'mailchimp',
  'Buffer': 'buffer',
  'Hootsuite': 'hootsuite',
  // SEO & Analytics
  'Semrush': 'semrush',
  'Google Analytics': 'googleanalytics',
  'Mixpanel': 'mixpanel',
  'Hotjar': 'hotjar',
  'Tableau': 'tableau',
  // E-commerce & Pagos
  'Shopify': 'shopify',
  'WooCommerce': 'woocommerce',
  'Stripe': 'stripe',
  'PayPal': 'paypal',
  'Square': 'square',
  'Etsy': 'etsy',
  // Comunicación
  'Slack': 'slack',
  'Zoom': 'zoom',
  'Discord': 'discord',
  'Google Meet': 'googlemeet',
  'WhatsApp': 'whatsapp',
  // Social Media
  'Instagram': 'instagram',
  'LinkedIn': 'linkedin',
  'TikTok': 'tiktok',
  'YouTube': 'youtube',
  'Twitter/X': 'twitterx',
  'Facebook': 'facebook',
  'Pinterest': 'pinterest',
  'Reddit': 'reddit',
  // Educación
  'Duolingo': 'duolingo',
  'Coursera': 'coursera',
  'Udemy': 'udemy',
  'Khan Academy': 'khanacademy',
}
