import { getHomePage } from '@/lib/cosmic'
import type { HomePage } from '@/types'
import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import ProductCarousel from '@/components/ProductCarousel'
import AboutEmgSection from '@/components/AboutEmgSection'
import FarmersMarkets from '@/components/FarmersMarkets'
import WhatWeAreAbout from '@/components/WhatWeAreAbout'
import AboutJasonSection from '@/components/AboutJasonSection'

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomePage() as HomePage | null

  if (!homepage?.metadata?.seo) {
    return {
      title: 'Emory Market Gardens | Fresh Mushrooms & Sustainable Farming',
      description: 'Discover exceptional gourmet mushrooms and sustainable farming practices from Emory Market Gardens in East Texas.',
    }
  }

  const seo = homepage.metadata.seo

  return {
    title: seo.title || 'Emory Market Gardens',
    description: seo.description || 'Discover exceptional gourmet mushrooms and sustainable farming practices from Emory Market Gardens in East Texas.',
    openGraph: {
      title: seo.og_title || seo.title || 'Emory Market Gardens',
      description: seo.og_description || seo.description || 'Discover exceptional gourmet mushrooms and sustainable farming practices from Emory Market Gardens in East Texas.',
      images: seo.og_image ? [
        {
          url: `${seo.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: seo.og_title || seo.title || 'Emory Market Gardens',
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.og_title || seo.title || 'Emory Market Gardens',
      description: seo.og_description || seo.description || 'Discover exceptional gourmet mushrooms and sustainable farming practices from Emory Market Gardens in East Texas.',
      images: seo.og_image ? [`${seo.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function HomePageComponent() {
  const homepage = await getHomePage() as HomePage | null

  if (!homepage) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Emory Market Gardens</h1>
        <p className="text-xl text-gray-600">Your source for fresh, sustainable mushrooms and produce.</p>
      </div>
    )
  }

  return (
    <>
      <HeroSection homepage={homepage} />
      {homepage.metadata.products_carousel && homepage.metadata.products_carousel.length > 0 && (
        <ProductCarousel products={homepage.metadata.products_carousel} />
      )}
      <AboutEmgSection homepage={homepage} />
      {homepage.metadata.farmers_markets && homepage.metadata.farmers_markets.length > 0 && (
        <FarmersMarkets markets={homepage.metadata.farmers_markets} />
      )}
      {homepage.metadata.what_we_are_all_about && homepage.metadata.what_we_are_all_about.length > 0 && (
        <WhatWeAreAbout items={homepage.metadata.what_we_are_all_about} />
      )}
      {homepage.metadata.about_jason && (
        <AboutJasonSection aboutJason={homepage.metadata.about_jason} />
      )}
    </>
  )
}