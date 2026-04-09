import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostContent from './BlogPostContent';

// Only these slugs are valid blog posts (even though they're "en desarrollo")
const VALID_SLUGS = [
  'ia-transformacion-pymes-2025',
  'automatizacion-procesos-restaurantes',
  'dashboard-financiero-excel-gratis',
  'marketing-digital-presupuesto-limitado',
  'caso-exito-bodega-queens',
  'transformacion-digital-paso-a-paso',
];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    return {};
  }

  const titulo = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${titulo} - Blog`,
    description: `Lee sobre ${titulo} en el blog de Impulsa Lab. Guias, consejos y tendencias de IA y transformacion digital para PYMEs.`,
    alternates: { canonical: `https://www.tuimpulsalab.com/blog/${slug}` },
    // Placeholder "Artículo en desarrollo" — excluded from indexing until real content exists.
    // Google was marking these as "Crawled — currently not indexed" due to thin/duplicate content.
    // Remove this line when the post is published with real content.
    robots: { index: false, follow: true },
    openGraph: {
      title: `${titulo} - Blog | Impulsa Lab`,
      description: `Lee sobre ${titulo}. Guias, consejos y tendencias de IA y transformacion digital para PYMEs.`,
      url: `https://www.tuimpulsalab.com/blog/${slug}`,
      type: 'article',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: `Impulsa Lab - ${titulo}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titulo} - Blog | Impulsa Lab`,
      description: `Lee sobre ${titulo}. Guias, consejos y tendencias de IA y transformacion digital para PYMEs.`,
      images: ['/images/og-image.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  return <BlogPostContent slug={slug} />;
}
