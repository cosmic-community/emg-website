import { FarmersMarket } from '@/types'

interface FarmersMarketsProps {
  markets: FarmersMarket[]
}

export default function FarmersMarkets({ markets }: FarmersMarketsProps) {
  if (!markets || markets.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Markets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find us at these local farmers markets where we bring fresh, 
            sustainably grown mushrooms directly to your community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {markets.map((market, index) => (
            <div key={market.id} className="relative group">
              <div className="relative aspect-ratio-16-9 rounded-2xl overflow-hidden shadow-medium">
                {market.metadata.background_image?.imgix_url ? (
                  <img
                    src={`${market.metadata.background_image.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                    alt={market.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-primary flex items-center justify-center">
                    <span className="text-white text-lg">Market Image</span>
                  </div>
                )}
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-overlay-dark"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {market.title}
                    </h3>
                    {market.metadata.location && (
                      <p className="text-lg text-gray-200 mb-2">
                        {market.metadata.location}
                      </p>
                    )}
                    {market.metadata.address && (
                      <p className="text-gray-300">
                        {market.metadata.address}
                      </p>
                    )}
                    
                    {/* View on Maps Link */}
                    <div className="mt-4">
                      <button className="inline-flex items-center text-accent hover:text-accent-light transition-colors font-medium">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        View on Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}