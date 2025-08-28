'use client'

import { useState, useMemo } from 'react'
import { Product, ProductCategory } from '@/types'
import ProductGrid from './ProductGrid'

interface ProductFilterProps {
  categories: ProductCategory[]
  products: Product[]
}

export default function ProductFilter({ categories, products }: ProductFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name')

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.metadata?.product_category?.id === selectedCategory
      )
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.metadata?.description?.toLowerCase().includes(query)
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'price-low':
          return (a.metadata?.price || 0) - (b.metadata?.price || 0)
        case 'price-high':
          return (b.metadata?.price || 0) - (a.metadata?.price || 0)
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [products, selectedCategory, searchQuery, sortBy])

  return (
    <div>
      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory && (
              <span>
                {' '}in{' '}
                <span className="font-medium text-primary">
                  {categories.find(cat => cat.id === selectedCategory)?.title}
                </span>
              </span>
            )}
            {searchQuery && (
              <span>
                {' '}matching{' '}
                <span className="font-medium text-primary">"{searchQuery}"</span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all products.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('')
                setSearchQuery('')
                setSortBy('name')
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}