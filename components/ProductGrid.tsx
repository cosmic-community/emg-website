import { Product } from '@/types'
import Link from 'next/link'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">No products available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link 
          key={product.id}
          href={`/products/${product.slug}`}
          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
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
            
            {/* Category Badge */}
            {product.metadata?.product_category && (
              <div className="mb-2">
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {product.metadata.product_category.title}
                </span>
              </div>
            )}

            {/* Price */}
            {product.metadata?.price && product.metadata.price > 0 && (
              <div className="mb-2">
                <span className="text-xl font-bold text-primary">
                  ${product.metadata.price}
                </span>
                {product.metadata?.recurring?.is_recurring && (
                  <span className="text-sm text-gray-600 ml-1">
                    /{product.metadata.recurring.interval?.value}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            {product.metadata?.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {product.metadata.description.replace(/<[^>]*>/g, '')}
              </p>
            )}

            {/* Inventory Status - Fix for null inventory_quantity */}
            {product.metadata?.inventory_quantity !== undefined && product.metadata.inventory_quantity !== null && (
              <div className="mb-2">
                {product.metadata.inventory_quantity === 0 ? (
                  <span className="text-red-600 text-xs font-medium">Out of Stock</span>
                ) : product.metadata.inventory_quantity < 10 ? (
                  <span className="text-orange-600 text-xs font-medium">
                    Only {product.metadata.inventory_quantity} left
                  </span>
                ) : (
                  <span className="text-green-600 text-xs font-medium">In Stock</span>
                )}
              </div>
            )}

            <div className="flex items-center text-primary font-medium text-sm">
              <span>View Details</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}