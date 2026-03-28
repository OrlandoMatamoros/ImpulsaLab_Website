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
    description: `Articulo en desarrollo: ${titulo}. Proximamente en el blog de Impulsa Lab.`,
    robots: { index: false, follow: true },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  return <BlogPostContent slug={slug} />;
}
