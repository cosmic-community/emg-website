// app/products/category/[slug]/page.tsx
import { getProductCategory, getProductsByCategory, getProductSubcategories } from '@/lib/cosmic'
import type { ProductCategory, Product, ProductSubcategory } from '@/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import SubcategoryGrid from '@/components/SubcategoryGrid'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getProductCategory(slug) as ProductCategory | null

  if (!category) {
    return {
      title: 'Category Not Found | Emory Market Gardens',
      description: 'The requested product category could not be found.',
    }
  }

  const seo = category.metadata?.seo

  return {
    title: seo?.title || `${category.title} | Emory Market Gardens`,
    description: seo?.description || category.metadata?.description || `Browse our ${category.title} collection at Emory Market Gardens`,
    openGraph: {
      title: seo?.og_title || seo?.title || `${category.title} | Emory Market Gardens`,
      description: seo?.og_description || seo?.description || category.metadata?.description || `Browse our ${category.title} collection at Emory Market Gardens`,
      images: category.metadata?.image ? [
        {
          url: `${category.metadata.image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: category.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.og_title || seo?.title || `${category.title} | Emory Market Gardens`,
      description: seo?.og_description || seo?.description || category.metadata?.description || `Browse our ${category.title} collection at Emory Market Gardens`,
      images: category.metadata?.image ? [`${category.metadata.image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [category, products, subcategories] = await Promise.all([
    getProductCategory(slug) as Promise<ProductCategory | null>,
    getProductsByCategory(slug, 50),
    getProductSubcategories()
  ])

  if (!category) {
    notFound()
  }

  // Filter subcategories that belong to this category
  const categorySubcategories = subcategories.filter((sub: ProductSubcategory) => 
    category.metadata?.subcategories?.includes(sub.id) || 
    sub.metadata?.parent_category?.id === category.id
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-primary">Products</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{category.title}</span>
          </div>
        </div>
      </nav>

      {/* Category Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category.title}
            </h1>
            {category.metadata?.description && (
              <div 
                className="text-xl md:text-2xl mb-8 text-white/90 prose prose-lg prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: category.metadata.description }}
              />
            )}
            {category.metadata?.image && (
              <img 
                src={`${category.metadata.image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                alt={category.title}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* Subcategories */}
      {categorySubcategories.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Browse by Type
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our different types of {category.title.toLowerCase()} to find exactly what you're looking for.
              </p>
            </div>
            
            <SubcategoryGrid subcategories={categorySubcategories} />
          </div>
        </section>
      )}

      {/* Products */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              All {category.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {products.length > 0 
                ? `Browse all ${products.length} products in our ${category.title.toLowerCase()} collection.`
                : `We're currently updating our ${category.title.toLowerCase()} collection. Check back soon!`
              }
            </p>
          </div>
          
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Products Coming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  We're working hard to add more products to this category. Check back soon or explore our other categories.
                </p>
                <a href="/products" className="btn btn-primary">
                  Browse All Products
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}