// app/products/[slug]/page.tsx
import { getProduct, getProductCategories, getProductsByCategory } from '@/lib/cosmic'
import type { Product, ProductCategory } from '@/types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import ProductInfo from '@/components/ProductInfo'
import RelatedProducts from '@/components/RelatedProducts'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug) as Product | null

  if (!product) {
    return {
      title: 'Product Not Found | Emory Market Gardens',
      description: 'The requested product could not be found.',
    }
  }

  const seo = product.metadata?.seo

  return {
    title: seo?.title || `${product.title} | Emory Market Gardens`,
    description: seo?.description || product.metadata?.description || `${product.title} - Available at Emory Market Gardens`,
    openGraph: {
      title: seo?.og_title || seo?.title || `${product.title} | Emory Market Gardens`,
      description: seo?.og_description || seo?.description || product.metadata?.description || `${product.title} - Available at Emory Market Gardens`,
      images: product.metadata?.image ? [
        {
          url: `${product.metadata.image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: product.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.og_title || seo?.title || `${product.title} | Emory Market Gardens`,
      description: seo?.og_description || seo?.description || product.metadata?.description || `${product.title} - Available at Emory Market Gardens`,
      images: product.metadata?.image ? [`${product.metadata.image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug) as Product | null

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  let relatedProducts: Product[] = []
  if (product.metadata?.product_category?.id) {
    const categoryProducts = await getProductsByCategory(product.metadata.product_category.id, 8)
    relatedProducts = categoryProducts.filter((p: Product) => p.id !== product.id)
  }

  const productImages = [
    ...(product.metadata?.image ? [product.metadata.image] : []),
    ...(product.metadata?.gallery || [])
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-primary">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-primary">Products</a>
            {product.metadata?.product_category && (
              <>
                <span>/</span>
                <a 
                  href={`/products/category/${product.metadata.product_category.slug}`}
                  className="hover:text-primary"
                >
                  {product.metadata.product_category.title}
                </a>
              </>
            )}
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
        </div>
      </nav>

      {/* Product Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <ProductGallery images={productImages} productTitle={product.title} />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Product Description */}
          {product.metadata?.description && (
            <div className="mt-16 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6">About This Product</h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: product.metadata.description }}
              />
            </div>
          )}

          {/* Related Resources */}
          {product.metadata?.related_resources && product.metadata.related_resources.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">Related Resources</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.metadata.related_resources.map((resource: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                    {resource.image && (
                      <img 
                        src={`${resource.image.imgix_url}?w=400&h=200&fit=crop&auto=format,compress`}
                        alt={resource.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <RelatedProducts products={relatedProducts} />
          </div>
        </section>
      )}
    </div>
  )
}