'use client'

import { useState } from 'react'
import { ProductCategory } from '@/types'
import Link from 'next/link'

interface ProductCarouselProps {
  products: ProductCategory[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!products || products.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="section-dark section-padding">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Explore Our Products
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-accent hover:bg-accent-dark transition-colors flex items-center justify-center shadow-glow"
              aria-label="Previous products"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-accent hover:bg-accent-dark transition-colors flex items-center justify-center shadow-glow"
              aria-label="Next products"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(currentIndex, currentIndex + 3).map((product, index) => (
            <Link
              key={product.id}
              href={`/products/category/${product.slug}`}
              className="card-light card-hover group"
            >
              <div className="relative aspect-ratio-4-3 overflow-hidden">
                {product.metadata.image?.imgix_url ? (
                  <img
                    src={`${product.metadata.image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-overlay-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {product.title}
                </h3>
                {product.metadata.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {product.metadata.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * 3)}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentIndex / 3) === index
                  ? 'bg-accent shadow-glow'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}