/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jdpower.com',
        pathname: '**',
      },
    ],
    domains: ['cdn.jdpower.com'],
    unoptimized: true
  }
};

module.exports = nextConfig; 