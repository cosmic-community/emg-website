import { getFooter } from '@/lib/cosmic'
import { Footer as FooterType } from '@/types'
import Link from 'next/link'

export default async function Footer() {
  const footer = await getFooter() as FooterType | null

  return (
    <footer className="section-gradient">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4 shadow-glow">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Emory Market Gardens</h3>
            </div>
            {footer?.metadata?.description ? (
              <p className="text-gray-200 mb-6 max-w-md text-lg leading-relaxed">
                {footer.metadata.description}
              </p>
            ) : (
              <p className="text-gray-200 mb-6 max-w-md text-lg leading-relaxed">
                Experience the power of nature
              </p>
            )}
            <div className="text-gray-300 text-base">
              <p>Discover how mushrooms offer exceptional nutritional benefits, immune support, and antioxidant properties while providing sustainable, versatile ingredients for delicious cooking.</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {footer?.metadata?.page_links?.metadata?.items ? (
                footer.metadata.page_links.metadata.items.map((link, index) => (
                  <Link
                    key={index}
                    href={link.link || '/'}
                    className="text-gray-200 hover:text-white transition-colors block text-lg"
                    {...(link.open_in_new_tab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.title}
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/" className="text-gray-200 hover:text-white transition-colors block text-lg">
                    HOME
                  </Link>
                  <Link href="/about" className="text-gray-200 hover:text-white transition-colors block text-lg">
                    ABOUT
                  </Link>
                  <Link href="/products" className="text-gray-200 hover:text-white transition-colors block text-lg">
                    SHOP
                  </Link>
                  <Link href="/blog" className="text-gray-200 hover:text-white transition-colors block text-lg">
                    BLOG
                  </Link>
                  <Link href="/contact" className="text-gray-200 hover:text-white transition-colors block text-lg">
                    MORE...
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Our Address</h4>
            <div className="text-gray-200 space-y-4">
              {footer?.metadata?.our_address ? (
                <div dangerouslySetInnerHTML={{ __html: footer.metadata.our_address }} />
              ) : (
                <div>
                  <p className="font-medium text-white">Emory Market Gardens, LLC.</p>
                  <p>4020 FM 515</p>
                  <p>Emory, TX 75440</p>
                </div>
              )}
              {footer?.metadata?.opening_times && (
                <div className="pt-4 border-t border-primary-light">
                  <div dangerouslySetInnerHTML={{ __html: footer.metadata.opening_times }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-light mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              <div className="flex items-center space-x-4">
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
                <span>|</span>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Copyright © {new Date().getFullYear()} Emory Market Gardens. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}