'use client'

import { useState } from 'react'

interface ProductImage {
  url: string
  imgix_url: string
}

interface ProductGalleryProps {
  images: ProductImage[]
  productTitle: string
}

export default function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500">No image available</p>
        </div>
      </div>
    )
  }

  const currentImage = images[currentImageIndex]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img 
          src={`${currentImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
          alt={`${productTitle} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-border ${
                index === currentImageIndex 
                  ? 'border-primary' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img 
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${productTitle} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-gray-500">
          {currentImageIndex + 1} of {images.length}
        </div>
      )}
    </div>
  )
}