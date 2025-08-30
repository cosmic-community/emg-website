import { HomePage } from '@/types'

interface HeroSectionProps {
  homepage: HomePage
}

export default function HeroSection({ homepage }: HeroSectionProps) {
  const { metadata } = homepage

  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {metadata.gallery && metadata.gallery.length > 0 && (
          <>
            {/* Desktop Images */}
            <div className="hidden md:block w-full h-full">
              {metadata.gallery[0] && metadata.gallery[0].imgix_url && (
                <img 
                  src={`${metadata.gallery[0].imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
                  alt="Emory Market Gardens"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* Mobile Images */}
            <div className="md:hidden w-full h-full">
              {metadata.gallery_mobile && metadata.gallery_mobile.length > 0 ? (
                metadata.gallery_mobile[0] && metadata.gallery_mobile[0].imgix_url && (
                  <img 
                    src={`${metadata.gallery_mobile[0].imgix_url}?w=768&h=1024&fit=crop&auto=format,compress`}
                    alt="Emory Market Gardens Mobile"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                metadata.gallery[0] && metadata.gallery[0].imgix_url && (
                  <img 
                    src={`${metadata.gallery[0].imgix_url}?w=768&h=1024&fit=crop&auto=format,compress`}
                    alt="Emory Market Gardens"
                    className="w-full h-full object-cover"
                  />
                )
              )}
            </div>
          </>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-shadow-strong leading-tight">
          Welcome to <span className="text-secondary-light">Emory Market Gardens</span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto text-shadow leading-relaxed font-light">
          Your source for fresh, locally grown gourmet mushrooms in East Texas. 
          From our farm to your table, we're passionate about sustainable growing 
          and exceptional quality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a 
            href="/about" 
            className="btn btn-primary bg-white text-primary hover:bg-secondary-light hover:text-primary-dark text-lg px-8 py-4"
          >
            Learn Our Story
          </a>
          <a 
            href="/blog" 
            className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
          >
            Read Our Blog
          </a>
        </div>
      </div>
    </section>
  )
}