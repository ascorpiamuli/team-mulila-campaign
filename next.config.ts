/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'lh3.googleusercontent.com', // Google Images
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub avatars
      },
      // ImgBB domains
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // Main ImgBB image hosting domain
      },
      {
        protocol: 'https',
        hostname: '*.ibb.co', // For subdomains like image.ibb.co
      },
      {
        protocol: 'https',
        hostname: 'ibb.co', // For direct ImgBB URLs
      },
    ],
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
