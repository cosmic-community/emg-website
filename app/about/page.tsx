import { getAboutPage } from '@/lib/cosmic'
import type { AboutPage } from '@/types'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage() as AboutPage | null

  if (!aboutPage?.metadata?.seo) {
    return {
      title: 'About Us | Emory Market Gardens',
      description: 'Learn about Emory Market Gardens, our sustainable farming practices, and our commitment to growing the finest gourmet mushrooms in East Texas.',
    }
  }

  const seo = aboutPage.metadata.seo

  return {
    title: seo.title || 'About Us | Emory Market Gardens',
    description: seo.description || 'Learn about Emory Market Gardens, our sustainable farming practices, and our commitment to growing the finest gourmet mushrooms in East Texas.',
    openGraph: {
      title: seo.og_title || seo.title || 'About Us | Emory Market Gardens',
      description: seo.og_description || seo.description || 'Learn about Emory Market Gardens, our sustainable farming practices, and our commitment to growing the finest gourmet mushrooms in East Texas.',
      images: seo.og_image ? [
        {
          url: `${seo.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: seo.og_title || seo.title || 'About Us | Emory Market Gardens',
        }
      ] : [],
    },
  }
}

export default async function AboutPageComponent() {
  const aboutPage = await getAboutPage() as AboutPage | null

  if (!aboutPage) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
        <p className="text-xl text-gray-600">Learn more about our sustainable farming practices and commitment to quality.</p>
      </div>
    )
  }

  const { metadata } = aboutPage

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Hero Images */}
        {(metadata.image_1 || metadata.image_2) && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {metadata.image_1 && (
              <div className="aspect-ratio-16-9 rounded-lg overflow-hidden">
                <img 
                  src={`${metadata.image_1.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                  alt="Emory Market Gardens"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {metadata.image_2 && (
              <div className="aspect-ratio-16-9 rounded-lg overflow-hidden">
                <img 
                  src={`${metadata.image_2.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                  alt="Emory Market Gardens Facility"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        )}

        {/* Intro Section */}
        {metadata.intro && (
          <div className="prose-custom max-w-4xl mx-auto text-center mb-16">
            <div dangerouslySetInnerHTML={{ __html: metadata.intro }} />
          </div>
        )}

        {/* Facilities Section */}
        {metadata.facilities_text && (
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="prose-custom">
                  <div dangerouslySetInnerHTML={{ __html: metadata.facilities_text }} />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                {(metadata.facilities_image_1 || metadata.facilities_image_2) && (
                  <div className="grid gap-4">
                    {metadata.facilities_image_1 && (
                      <div className="aspect-ratio-4-3 rounded-lg overflow-hidden">
                        <img 
                          src={`${metadata.facilities_image_1.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
                          alt="Our Facilities"
                          width={600}
                          height={450}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {metadata.facilities_image_2 && (
                      <div className="aspect-ratio-4-3 rounded-lg overflow-hidden">
                        <img 
                          src={`${metadata.facilities_image_2.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
                          alt="Growing Environment"
                          width={600}
                          height={450}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Our Products Section */}
        {metadata.our_products && metadata.our_products.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {metadata.our_products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {product.metadata?.image && (
                    <div className="aspect-ratio-4-3">
                      <img 
                        src={`${product.metadata.image.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
                        alt={product.title}
                        width={600}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">{product.title}</h3>
                    {product.metadata?.description && (
                      <div 
                        className="text-gray-600 prose-custom prose-sm"
                        dangerouslySetInnerHTML={{ __html: product.metadata.description }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support for Growers Section */}
        {metadata.support_for_growers_text && (
          <div className="mb-16">
            <div className="prose-custom max-w-4xl mx-auto text-center mb-12">
              <div dangerouslySetInnerHTML={{ __html: metadata.support_for_growers_text }} />
            </div>
            
            {metadata.support_message_1 && metadata.support_message_1.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {metadata.support_message_1.map((item, index) => (
                  <div key={index} className="text-center">
                    {item.icon && (
                      <div className="w-16 h-16 mx-auto mb-4">
                        <img 
                          src={`${item.icon.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                          alt={item.title || ''}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    {item.title && (
                      <h3 className="text-lg font-semibold text-primary mb-3">{item.title}</h3>
                    )}
                    {item.description && (
                      <p className="text-gray-600">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Outro Section */}
        {metadata.outro && (
          <div className="prose-custom max-w-4xl mx-auto text-center mb-12">
            <div dangerouslySetInnerHTML={{ __html: metadata.outro }} />
          </div>
        )}

        {/* Quote Section */}
        {metadata.quote && (
          <div className="bg-secondary-light rounded-lg p-8 text-center">
            <div className="prose-custom max-w-3xl mx-auto">
              <div dangerouslySetInnerHTML={{ __html: metadata.quote }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}