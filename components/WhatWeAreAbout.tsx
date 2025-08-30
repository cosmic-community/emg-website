interface WhatWeAreAboutItem {
  title?: string;
  icon?: {
    url: string;
    imgix_url: string;
  };
  description?: string;
}

interface WhatWeAreAboutProps {
  items: WhatWeAreAboutItem[];
}

export default function WhatWeAreAbout({ items }: WhatWeAreAboutProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="section-dark section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What We're All About
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <div key={index} className="card text-center p-8 hover:shadow-2xl">
              {/* Icon Circle */}
              <div className="flex justify-center mb-6">
                <div className="icon-circle">
                  {item.icon?.imgix_url ? (
                    <img 
                      src={`${item.icon.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                      alt={item.title || 'Icon'}
                      className="w-8 h-8 text-white"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-white rounded-full opacity-80"></div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div>
                {item.title && (
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}