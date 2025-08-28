import { getShopPage, getProductCategories, getProducts } from '@/lib/cosmic'
import type { ShopPage, ProductCategory, Product } from '@/types'
import { Metadata } from 'next'
import ProductCategoryGrid from '@/components/ProductCategoryGrid'
import ProductGrid from '@/components/ProductGrid'

export async function generateMetadata(): Promise<Metadata> {
  const shopPage = await getShopPage() as ShopPage | null

  if (!shopPage?.metadata?.seo) {
    return {
      title: 'Shop | Emory Market Gardens - Fresh Mushrooms, Grow Kits & Supplies',
      description: 'Browse our complete selection of fresh gourmet mushrooms, mushroom grow kits, cultivation supplies, and wellness products from Emory Market Gardens.',
    }
  }

  const seo = shopPage.metadata.seo

  return {
    title: seo.title || 'Shop | Emory Market Gardens',
    description: seo.description || 'Browse our complete selection of fresh gourmet mushrooms, mushroom grow kits, cultivation supplies, and wellness products from Emory Market Gardens.',
    openGraph: {
      title: seo.og_title || seo.title || 'Shop | Emory Market Gardens',
      description: seo.og_description || seo.description || 'Browse our complete selection of fresh gourmet mushrooms, mushroom grow kits, cultivation supplies, and wellness products from Emory Market Gardens.',
      images: seo.og_image ? [
        {
          url: `${seo.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: seo.og_title || seo.title || 'Shop | Emory Market Gardens',
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.og_title || seo.title || 'Shop | Emory Market Gardens',
      description: seo.og_description || seo.description || 'Browse our complete selection of fresh gourmet mushrooms, mushroom grow kits, cultivation supplies, and wellness products from Emory Market Gardens.',
      images: seo.og_image ? [`${seo.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function ProductsPage() {
  const [shopPage, categories, products] = await Promise.all([
    getShopPage() as Promise<ShopPage | null>,
    getProductCategories(),
    getProducts(50) // Get first 50 products
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {shopPage?.title || 'Our Products'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {shopPage?.metadata?.seo?.description || 
               'Explore our full selection of fresh gourmet mushrooms, mushroom grow kits, teas, tinctures, and cultivation supplies. Grown with care in East Texas—delivered fresh or ready to grow.'}
            </p>
            {shopPage?.metadata?.image && (
              <img 
                src={`${shopPage.metadata.image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                alt={shopPage.title}
                className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* Why Section */}
      {shopPage?.metadata?.why && shopPage.metadata.why.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {shopPage.metadata.why.map((item: any, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Product Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated selection of fresh mushrooms, grow kits, 
              cultivation supplies, and educational workshops.
            </p>
          </div>
          
          <ProductCategoryGrid categories={categories} />
        </div>
      </section>

      {/* Featured Products */}
      {products.objects.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover some of our most popular products, perfect for both beginners and experienced growers.
              </p>
            </div>
            
            <ProductGrid products={products.objects.slice(0, 12)} />
            
            {products.total > 12 && (
              <div className="text-center mt-12">
                <a 
                  href="/products/all"
                  className="btn btn-primary"
                >
                  View All Products ({products.total})
                </a>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}