/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return[{
      source: "/server/:path*",
      destination: "http://localhost:3001/server/:path*"
    }]
  },
}

module.exports = nextConfig;