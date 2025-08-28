import { HomePage } from '@/types'

interface AboutEmgSectionProps {
  homepage: HomePage
}

export default function AboutEmgSection({ homepage }: AboutEmgSectionProps) {
  const { metadata } = homepage

  if (!metadata.about_emg_title && !metadata.about_emg_content) {
    return null
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="prose-custom">
              {metadata.about_emg_title && (
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  {metadata.about_emg_title}
                </h2>
              )}
              {metadata.about_emg_content && (
                <div dangerouslySetInnerHTML={{ __html: metadata.about_emg_content }} />
              )}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            {metadata.about_emg_image && (
              <div className="aspect-ratio-4-3 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={`${metadata.about_emg_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={metadata.about_emg_title || 'About Emory Market Gardens'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}