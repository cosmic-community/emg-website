import { getProducts, getProductCategories } from '@/lib/cosmic'
import type { Product, ProductCategory } from '@/types'
import { Metadata } from 'next'
import ProductGrid from '@/components/ProductGrid'
import ProductFilter from '@/components/ProductFilter'

export const metadata: Metadata = {
  title: 'All Products | Emory Market Gardens',
  description: 'Browse our complete collection of fresh mushrooms, grow kits, cultivation supplies, and wellness products from Emory Market Gardens.',
  openGraph: {
    title: 'All Products | Emory Market Gardens',
    description: 'Browse our complete collection of fresh mushrooms, grow kits, cultivation supplies, and wellness products from Emory Market Gardens.',
  },
}

export default async function AllProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(100), // Get more products for the full listing
    getProductCategories()
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              All Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Browse our complete collection of {products.total} products including fresh mushrooms, 
              grow kits, cultivation supplies, and educational resources.
            </p>
          </div>
        </div>
      </section>

      {/* Products with Filter */}
      <section className="section-padding">
        <div className="container-custom">
          <ProductFilter categories={categories} products={products.objects} />
        </div>
      </section>
    </div>
  )
}