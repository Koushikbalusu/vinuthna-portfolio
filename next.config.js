/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Output configuration for static export (if needed)
  // output: 'standalone', // Uncomment for standalone deployment
}

module.exports = nextConfig

