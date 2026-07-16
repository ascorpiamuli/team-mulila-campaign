/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Enable standalone output for smaller Docker images
  output: 'standalone',

  // Disable telemetry
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pasbestventures.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: '*.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
      },
    ],
    domains: ['images.unsplash.com'],
    // Optimize images
    unoptimized: false,
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
