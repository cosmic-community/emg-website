import { Product } from '@/types'
import ProductGrid from './ProductGrid'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Related Products
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover other products you might be interested in from the same category.
        </p>
      </div>
      
      <ProductGrid products={products.slice(0, 8)} />
    </div>
  )
}