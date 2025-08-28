import { ProductCategory } from '@/types'
import Link from 'next/link'

interface ProductCategoryGridProps {
  categories: ProductCategory[]
}

export default function ProductCategoryGrid({ categories }: ProductCategoryGridProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">No product categories available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <Link 
          key={category.id}
          href={`/products/category/${category.slug}`}
          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          {category.metadata?.image && (
            <div className="aspect-ratio-16-9 overflow-hidden">
              <img 
                src={`${category.metadata.image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-dark transition-colors">
              {category.title}
            </h3>
            {category.metadata?.seo?.description && (
              <p className="text-gray-600 mb-4">
                {category.metadata.seo.description}
              </p>
            )}
            {category.metadata?.description && (
              <div 
                className="text-gray-600 text-sm prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: category.metadata.description }}
              />
            )}
            <div className="mt-4 flex items-center text-primary font-medium">
              <span>Explore Category</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}