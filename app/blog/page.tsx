import Link from 'next/link'
import { FaArrowRight, FaClock, FaUser } from 'react-icons/fa'
import { getAllPosts } from '@/lib/blog'

// Server Component — reads MDX from content/blog at build time.
export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getAllPosts()
  const featured = posts.find((p) => p.featured) || posts[0]
  const rest = posts.filter((p) => p.slug !== featured?.slug)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              Inicio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Blog Impulsa Lab
          </h1>
          <p className="text-xl md:text-2xl mb-2 max-w-3xl mx-auto opacity-95">
            Agentes AI, automatizacion y arquitectura para PYMEs que van en serio.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Articulo destacado</h2>
            <Link
              href={`/blog/${featured.slug}`}
              className="block bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full min-h-[300px]">
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                  )}
                </div>
                <div className="p-8 md:p-12">
                  <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                    {featured.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    {featured.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-xs" />
                        {featured.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {featured.readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                      Leer mas
                      <FaArrowRight className="text-sm" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group block"
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white text-xs font-semibold text-gray-700 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-xs" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aun no hay articulos publicados.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Necesitas ayuda para automatizar tu negocio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Agenda un diagnostico gratuito de 20 minutos y sal con un plan claro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Diagnostico gratuito
              <FaArrowRight />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Hablar con un experto
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
