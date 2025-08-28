import { Product } from '@/types'

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          {product.title}
        </h1>
        {product.metadata?.product_category && (
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Category:</span>
            <a 
              href={`/products/category/${product.metadata.product_category.slug}`}
              className="text-primary hover:text-primary-dark font-medium"
            >
              {product.metadata.product_category.title}
            </a>
          </div>
        )}
      </div>

      {/* Price */}
      {product.metadata?.price && product.metadata.price > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">
                ${product.metadata.price}
                {product.metadata?.recurring?.is_recurring && (
                  <span className="text-lg text-gray-600 font-normal ml-2">
                    /{product.metadata.recurring.interval?.value}
                  </span>
                )}
              </div>
              {product.metadata?.is_taxable && (
                <div className="text-sm text-gray-600">
                  Tax may apply
                </div>
              )}
            </div>
            
            {/* Inventory Status */}
            {product.metadata?.inventory_quantity !== undefined && (
              <div className="text-right">
                {product.metadata.inventory_quantity === 0 ? (
                  <div className="text-red-600 font-medium">Out of Stock</div>
                ) : product.metadata.inventory_quantity < 10 ? (
                  <div className="text-orange-600 font-medium">
                    Only {product.metadata.inventory_quantity} left
                  </div>
                ) : (
                  <div className="text-green-600 font-medium">In Stock</div>
                )}
              </div>
            )}
          </div>

          {/* Price Variants */}
          {product.metadata?.price_variants && product.metadata.price_variants.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Available Options:</h4>
              <div className="space-y-2">
                {product.metadata.price_variants.map((variant: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{variant.name}</span>
                    <span className="font-medium">${variant.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {product.metadata?.description && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: product.metadata.description }}
          />
        </div>
      )}

      {/* Shipping Information */}
      {product.metadata?.shipping_info && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Shipping Information</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {product.metadata.shipping_info.weight > 0 && (
              <div>Weight: {product.metadata.shipping_info.weight} lbs</div>
            )}
            {product.metadata.shipping_info.length > 0 && (
              <div>
                Dimensions: {product.metadata.shipping_info.length}" × {product.metadata.shipping_info.width}" × {product.metadata.shipping_info.height}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subcategory */}
      {product.metadata?.subcategory && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Product Type</h4>
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            {product.metadata.subcategory.title}
          </span>
        </div>
      )}

      {/* Contact for More Info */}
      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Questions about this product?</h4>
        <p className="text-sm text-green-800 mb-3">
          Our team is here to help! Contact us for more information, custom orders, or bulk pricing.
        </p>
        <a 
          href="/contact"
          className="inline-flex items-center text-green-700 font-medium hover:text-green-800"
        >
          Contact Us
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}