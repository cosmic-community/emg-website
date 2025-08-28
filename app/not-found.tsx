import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="container-custom text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sorry, we couldn't find the page you're looking for. 
          Perhaps you'd like to go back to our homepage or check out our latest blog posts?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/blog" className="btn btn-outline">
            Read Our Blog
          </Link>
        </div>
      </div>
    </div>
  )
}