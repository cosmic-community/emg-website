import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Emory Market Gardens | Fresh Mushrooms & Sustainable Farming',
  description: 'Discover exceptional gourmet mushrooms, sustainable farming practices, and educational resources from Emory Market Gardens in East Texas.',
  keywords: 'mushrooms, sustainable farming, gourmet mushrooms, East Texas, organic produce, mushroom cultivation',
  authors: [{ name: 'Emory Market Gardens' }],
  openGraph: {
    title: 'Emory Market Gardens | Fresh Mushrooms & Sustainable Farming',
    description: 'Discover exceptional gourmet mushrooms, sustainable farming practices, and educational resources from Emory Market Gardens in East Texas.',
    url: 'https://emorymarketgardens.com',
    siteName: 'Emory Market Gardens',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/e5775ff0-a2b9-11ef-8deb-db65bd2584e1-Image-2.png?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Emory Market Gardens - Fresh Mushrooms',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emory Market Gardens | Fresh Mushrooms & Sustainable Farming',
    description: 'Discover exceptional gourmet mushrooms, sustainable farming practices, and educational resources from Emory Market Gardens in East Texas.',
    images: ['https://imgix.cosmicjs.com/e5775ff0-a2b9-11ef-8deb-db65bd2584e1-Image-2.png?w=1200&h=630&fit=crop&auto=format,compress'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}