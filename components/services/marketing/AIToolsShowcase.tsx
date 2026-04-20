'use client'

import React, { useState } from 'react';
import Link from 'next/link'
import { ChevronDown, ChevronUp, Code2, ArrowRight, Copy } from 'lucide-react';
import PlatformLogo from '@/components/PlatformLogo';

const AIToolsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedPrompts, setExpandedPrompts] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const tools = [
    {
      id: 1,
      name: 'Freepik AI',
      slug: 'freepik',
      domain: 'freepik.com',
      category: 'imagen',
      description: 'Generación de imágenes profesionales con IA',
      features: ['Mockups instantáneos', 'Fondos removibles', 'Estilo consistente'],
      pricing: 'Gratis / Pro $9/mes',
      useCase: 'Perfecto para posts de Instagram y material de marketing',
    },
    {
      id: 2,
      name: 'HeyGen',
      slug: 'heygen',
      domain: 'heygen.com',
      category: 'video',
      description: 'Avatares digitales que hablan por tu marca',
      features: ['Avatares realistas', 'Multi-idioma', 'Sincronización labial perfecta'],
      pricing: 'Gratis limitado / $24/mes',
      useCase: 'Ideal para videos explicativos y presentaciones',
    },
    {
      id: 3,
      name: 'ElevenLabs',
      slug: 'elevenlabs',
      domain: 'elevenlabs.io',
      category: 'audio',
      description: 'Voces ultra-realistas para tus contenidos',
      features: ['Clonación de voz', 'Emociones ajustables', '29 idiomas'],
      pricing: 'Gratis 10k chars / $5/mes',
      useCase: 'Podcasts, audiolibros y narraciones profesionales',
    },
    {
      id: 4,
      name: 'Midjourney',
      slug: 'midjourney',
      domain: 'midjourney.com',
      category: 'imagen',
      description: 'Arte y diseño creativo de siguiente nivel',
      features: ['Estilos artísticos únicos', 'Alta resolución', 'Personalización extrema'],
      pricing: '$10/mes básico',
      useCase: 'Branding visual, ilustraciones y conceptos creativos',
    },
    {
      id: 5,
      name: 'Gumloop',
      slug: 'gumloop',
      domain: 'gumloop.com',
      category: 'automatizacion',
      description: 'Automatización sin código para marketing',
      features: ['Workflows visuales', 'Integraciones múltiples', 'Triggers automáticos'],
      pricing: 'Gratis / $97/mes',
      useCase: 'Automatizar campañas de email y redes sociales',
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', icon: '🎯' },
    { id: 'imagen', name: 'Imagen', icon: '🎨' },
    { id: 'video', name: 'Video', icon: '��' },
    { id: 'audio', name: 'Audio', icon: '🎙️' },
    { id: 'automatizacion', name: 'Automatización', icon: '⚡' }
  ];

  const filteredTools = activeFilter === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeFilter);

  const samplePrompts = [
    {
      title: "Professional Photography (JSON)",
      content: `{
  "style": "professional_photography",
  "subject": "corporate_headshot",
  "lighting": {
    "type": "rembrandt_lighting",
    "temperature": "5600K",
    "direction": "45_degrees_left"
  },
  "camera": {
    "lens": "85mm_f1.4",
    "aperture": "f/2.8",
    "iso": 200
  },
  "background": "blurred_office_environment",
  "mood": "confident_approachable"
}`
    },
    {
      title: "Cinematic Video Scene (HTML/English)",
      content: `<scene>
  <setting>Modern office at golden hour</setting>
  <camera>
    <movement>Slow dolly in</movement>
    <lens>24mm anamorphic</lens>
    <frame>Wide establishing shot</frame>
  </camera>
  <lighting>
    <key>Window light, 45 degrees</key>
    <fill>LED panel, 1/4 intensity</fill>
    <back>Practical lamps, warm tone</back>
  </lighting>
  <color-grade>Teal and orange, cinematic LUT</color-grade>
</scene>`
    },
    {
      title: "Product Enhancement Prompt",
      content: `{
  "product": "luxury_watch",
  "improvements": {
    "reflections": "enhance_metallic_surfaces",
    "shadows": "add_depth_and_dimension",
    "background": "gradient_dark_to_light",
    "lighting": "studio_three_point_setup"
  },
  "post_processing": {
    "sharpness": 85,
    "contrast": 120,
    "saturation": 110,
    "highlights": -20,
    "shadows": +15
  },
  "export": "4K_resolution_sRGB"
}`
    },
    {
      title: "Social Media Campaign Visual",
      content: `{
  "platform": "instagram_feed",
  "style": "modern_minimalist",
  "color_palette": ["#667eea", "#764ba2", "#ffffff"],
  "elements": {
    "text": {
      "headline": "bold_sans_serif",
      "size": "large_readable",
      "position": "rule_of_thirds"
    },
    "graphics": "geometric_shapes",
    "spacing": "generous_white_space"
  },
  "dimensions": "1080x1080px",
  "format": "carousel_ready"
}`
    },
    {
      title: "AI Avatar Video Script",
      content: `<avatar-video>
  <speaker>
    <appearance>professional_female_30s</appearance>
    <outfit>business_casual_blue</outfit>
    <background>virtual_office</background>
  </speaker>
  <delivery>
    <tone>friendly_professional</tone>
    <pace>moderate_clear</pace>
    <gestures>natural_hand_movements</gestures>
  </delivery>
  <camera>
    <angle>eye_level</angle>
    <framing>medium_close_up</framing>
  </camera>
  <duration>60_seconds</duration>
</avatar-video>`
    },
    {
      title: "Brand Identity Generation",
      content: `{
  "brand_name": "TechStart",
  "industry": "fintech_startup",
  "values": ["innovation", "trust", "simplicity"],
  "visual_style": {
    "logo": {
      "type": "wordmark_with_icon",
      "style": "modern_geometric"
    },
    "colors": {
      "primary": "#0A2540",
      "secondary": "#00D4FF",
      "accent": "#FFB800"
    },
    "typography": {
      "heading": "Inter_Bold",
      "body": "Inter_Regular"
    }
  },
  "applications": ["web", "mobile", "print"]
}`
    }
  ];

  const handleCopyPrompt = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedPrompt(index);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tu Arsenal de IA para Marketing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No somos una agencia tradicional. Somos consultores que te enseñan a dominar 
            las herramientas de IA más poderosas del mercado.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                activeFilter === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 flex items-center justify-center p-1.5">
                    <PlatformLogo
                      slug={tool.slug}
                      domain={tool.domain}
                      name={tool.name}
                      className="max-h-full max-w-full w-auto object-contain"
                    />
                  </div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                
                <div className="space-y-2 mb-4">
                  {tool.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-700">
                      <span className="text-purple-600 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-purple-700">
                    <strong>Precio:</strong> {tool.pricing}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    <strong>Ideal para:</strong> {tool.useCase}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <Link 
            href="/herramientas/arsenal"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            Ver Todas las Herramientas con Enlaces Directos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              <Code2 className="inline-block w-7 h-7 mr-2 text-purple-600" />
              Prompts Profesionales Listos para Usar
            </h3>
            <button
              onClick={() => setExpandedPrompts(!expandedPrompts)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              {expandedPrompts ? 'Ocultar' : 'Mostrar'} Prompts
              {expandedPrompts ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedPrompts && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePrompts.map((prompt, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">{prompt.title}</h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs mb-3">
                    <code>{prompt.content}</code>
                  </pre>
                  <button 
                    onClick={() => handleCopyPrompt(prompt.content, index)}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2"
                  >
                    {copiedPrompt === index ? (
                      <>✓ Copiado</>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar Prompt
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIToolsShowcase;
