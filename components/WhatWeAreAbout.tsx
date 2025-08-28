interface WhatWeAreAboutItem {
  title?: string
  icon?: {
    url: string
    imgix_url: string
  }
  description?: string
}

interface WhatWeAreAboutProps {
  items: WhatWeAreAboutItem[]
}

export default function WhatWeAreAbout({ items }: WhatWeAreAboutProps) {
  return (
    <section className="section-padding bg-secondary-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What We're All About
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our values and commitments drive everything we do at Emory Market Gardens.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              {item.icon && (
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src={`${item.icon.imgix_url}?w=64&h=64&fit=contain&auto=format,compress`}
                    alt={item.title || ''}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              {item.title && (
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}