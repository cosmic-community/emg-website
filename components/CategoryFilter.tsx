'use client'

import { Category } from '@/types'
import { useState } from 'react'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === ''
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
      
      {selectedCategory && (
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Showing posts in: <span className="font-semibold text-primary">
              {categories.find(cat => cat.id === selectedCategory)?.title}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}