import { ProductSubcategory } from '@/types'
import Link from 'next/link'

interface SubcategoryGridProps {
  subcategories: ProductSubcategory[]
}

export default function SubcategoryGrid({ subcategories }: SubcategoryGridProps) {
  if (!subcategories || subcategories.length === 0) {
    return null
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subcategories.map((subcategory) => (
        <Link 
          key={subcategory.id}
          href={`/products/subcategory/${subcategory.slug}`}
          className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          {subcategory.metadata?.image && (
            <div className="aspect-ratio-4-3 overflow-hidden">
              <img 
                src={`${subcategory.metadata.image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={subcategory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-primary-dark transition-colors">
              {subcategory.title}
            </h3>
            {subcategory.metadata?.description && (
              <div 
                className="text-gray-600 text-sm prose prose-sm max-w-none mb-3"
                dangerouslySetInnerHTML={{ __html: subcategory.metadata.description }}
              />
            )}
            <div className="flex items-center text-primary font-medium text-sm">
              <span>Browse Products</span>
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