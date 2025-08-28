import { FarmersMarket } from '@/types'

interface FarmersMarketsProps {
  markets: FarmersMarket[]
}

export default function FarmersMarkets({ markets }: FarmersMarketsProps) {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Find Us at Local Markets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit us at these local farmers markets throughout East Texas. 
            Fresh mushrooms, friendly service, and expert growing advice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {markets.map((market) => (
            <div 
              key={market.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {market.metadata?.background_image && (
                <div className="aspect-ratio-16-9 overflow-hidden">
                  <img 
                    src={`${market.metadata.background_image.imgix_url}?w=600&h=338&fit=crop&auto=format,compress`}
                    alt={market.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {market.title}
                </h3>
                {market.metadata?.location && (
                  <div 
                    className="text-gray-600 prose-sm"
                    dangerouslySetInnerHTML={{ __html: market.metadata.location }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}