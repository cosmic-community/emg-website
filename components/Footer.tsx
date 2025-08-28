import { getFooter } from '@/lib/cosmic'
import { Footer as FooterType } from '@/types'
import Link from 'next/link'

export default async function Footer() {
  const footer = await getFooter() as FooterType | null

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Emory Market Gardens</h3>
            {footer?.metadata?.description && (
              <p className="text-gray-200 mb-4 max-w-md">
                {footer.metadata.description}
              </p>
            )}
            <div className="text-gray-200 text-sm">
              <p>Professional & modern, a theme designed to help your business stand out from the rest.</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {footer?.metadata?.page_links?.metadata?.items ? (
                footer.metadata.page_links.metadata.items.map((link, index) => (
                  <Link
                    key={index}
                    href={link.link || '/'}
                    className="text-gray-200 hover:text-white transition-colors block"
                    {...(link.open_in_new_tab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.title}
                  </Link>
                ))
              ) : (
                <>
                  <Link href="/" className="text-gray-200 hover:text-white transition-colors block">
                    Home
                  </Link>
                  <Link href="/about" className="text-gray-200 hover:text-white transition-colors block">
                    About
                  </Link>
                  <Link href="/blog" className="text-gray-200 hover:text-white transition-colors block">
                    Blog
                  </Link>
                  <Link href="/contact" className="text-gray-200 hover:text-white transition-colors block">
                    Contact
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Visit Our Farm</h4>
            <div className="text-gray-200 space-y-3">
              {footer?.metadata?.our_address && (
                <div>
                  <h5 className="font-medium text-white mb-1">Address</h5>
                  <div dangerouslySetInnerHTML={{ __html: footer.metadata.our_address }} />
                </div>
              )}
              {footer?.metadata?.opening_times && (
                <div>
                  <h5 className="font-medium text-white mb-1">Hours</h5>
                  <div dangerouslySetInnerHTML={{ __html: footer.metadata.opening_times }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200 text-sm">
              © {new Date().getFullYear()} Emory Market Gardens. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-200 text-sm">Follow us:</span>
              <a 
                href="https://facebook.com/emorymarketgardens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a 
                href="https://instagram.com/emorymarketgardens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}