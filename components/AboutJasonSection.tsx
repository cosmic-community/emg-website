import { AboutJason } from '@/types'

interface AboutJasonSectionProps {
  aboutJason: AboutJason
}

export default function AboutJasonSection({ aboutJason }: AboutJasonSectionProps) {
  const { metadata } = aboutJason

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {metadata.image && (
              <div className="aspect-ratio-square rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
                <img 
                  src={`${metadata.image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                  alt="Jason - Emory Market Gardens"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <div className="prose-custom">
              {metadata.section && (
                <div dangerouslySetInnerHTML={{ __html: metadata.section }} />
              )}
              
              {(metadata.metric || metadata.metric_type) && (
                <div className="bg-primary text-white rounded-lg p-6 my-8">
                  <div className="text-center">
                    {metadata.metric && (
                      <div className="text-4xl font-bold mb-2">
                        {metadata.metric}
                      </div>
                    )}
                    {metadata.metric_type && (
                      <div className="text-lg opacity-90">
                        {metadata.metric_type}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {metadata.quote && (
                <div className="bg-secondary-light rounded-lg p-6">
                  <div dangerouslySetInnerHTML={{ __html: metadata.quote }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}