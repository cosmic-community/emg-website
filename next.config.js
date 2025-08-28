/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.cosmicjs.com', 'imgix.cosmicjs.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    typedRoutes: false
  }
}

module.exports = nextConfig