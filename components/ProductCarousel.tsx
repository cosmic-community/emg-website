import { ProductCategory } from '@/types'

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
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
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
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {product.title}
                </h3>
                {product.metadata?.seo?.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.metadata.seo.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {products.length > 6 && (
          <div className="text-center mt-8">
            <button className="btn btn-primary">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  )
}