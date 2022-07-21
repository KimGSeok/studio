/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return[{
      source: '/server/:path',
      destination: 'http://localhost:3001/server'
    }]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;
