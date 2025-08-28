import { HomePage } from '@/types'

interface HeroSectionProps {
  homepage: HomePage
}

export default function HeroSection({ homepage }: HeroSectionProps) {
  const { metadata } = homepage

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {metadata.gallery && metadata.gallery.length > 0 && (
          <>
            {/* Desktop Images */}
            <div className="hidden md:block w-full h-full">
              <img 
                src={`${metadata.gallery[0].imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
                alt="Emory Market Gardens"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mobile Images */}
            <div className="md:hidden w-full h-full">
              {metadata.gallery_mobile && metadata.gallery_mobile.length > 0 ? (
                <img 
                  src={`${metadata.gallery_mobile[0].imgix_url}?w=768&h=1024&fit=crop&auto=format,compress`}
                  alt="Emory Market Gardens Mobile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={`${metadata.gallery[0].imgix_url}?w=768&h=1024&fit=crop&auto=format,compress`}
                  alt="Emory Market Gardens"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow">
          Welcome to Emory Market Gardens
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow">
          Your source for fresh, locally grown gourmet mushrooms in East Texas. 
          From our farm to your table, we're passionate about sustainable growing 
          and exceptional quality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/about" 
            className="btn btn-primary bg-white text-primary hover:bg-gray-100"
          >
            Learn Our Story
          </a>
          <a 
            href="/blog" 
            className="btn btn-outline border-white text-white hover:bg-white hover:text-primary"
          >
            Read Our Blog
          </a>
        </div>
      </div>
    </section>
  )
}