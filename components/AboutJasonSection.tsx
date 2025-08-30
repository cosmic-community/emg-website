import Link from 'next/link'
import { AboutJason } from '@/types'

interface AboutJasonSectionProps {
  aboutJason: AboutJason
}

export default function AboutJasonSection({ aboutJason }: AboutJasonSectionProps) {
  if (!aboutJason) {
    return null
  }

  const { metadata } = aboutJason

  return (
    <section className="section-gradient section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            {metadata.image?.imgix_url ? (
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img
                  src={`${metadata.image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt="Jason from Emory Market Gardens"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-primary-light rounded-2xl aspect-ratio-4-3 flex items-center justify-center">
                <span className="text-gray-400 text-lg">No Image Available</span>
              </div>
            )}

            {/* Metric Badge */}
            {metadata.metric && (
              <div className="absolute bottom-6 left-6 bg-accent rounded-2xl p-6 shadow-strong">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {metadata.metric}
                  </div>
                  {metadata.metric_type && (
                    <div className="text-white text-sm opacity-90 font-medium">
                      {metadata.metric_type}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Growing with Passion and Dedication
            </h2>
            
            {metadata.section && (
              <div className="prose-custom mb-8">
                <div dangerouslySetInnerHTML={{ __html: metadata.section }} />
              </div>
            )}

            {metadata.quote && (
              <blockquote className="border-l-4 border-accent pl-6 mb-8">
                <p className="text-xl md:text-2xl font-medium text-white italic leading-relaxed">
                  "{metadata.quote}"
                </p>
              </blockquote>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/about" 
                className="btn btn-primary"
              >
                Learn More About Us
              </Link>
              <Link 
                href="/contact" 
                className="btn btn-outline"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}