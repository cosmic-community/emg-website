import { ProductCategory } from '@/types'
import Link from 'next/link'

interface ProductCarouselProps {
  products: ProductCategory[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <section className="section-padding bg-secondary-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Product Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our complete range of fresh mushrooms, grow kits, supplies, 
            and wellness products - all grown and prepared with care in East Texas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {products.slice(0, 6).map((product) => (
            <Link 
              key={product.id}
              href={`/products/category/${product.slug}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group block"
            >
              {product.metadata?.image && (
                <div className="aspect-ratio-square overflow-hidden">
                  <img 
                    src={`${product.metadata.image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-primary-dark transition-colors">
                  {product.title}
                </h3>
                {product.metadata?.seo?.description && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {product.metadata.seo.description}
                  </p>
                )}
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>Explore Category</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length > 6 && (
          <div className="text-center mt-8">
            <Link href="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}