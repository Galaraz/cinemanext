/** @type {import('next').NextConfig} */
const nextConfig = {
  appDir: true,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    runtime: 'edge',
    
  }
}

module.exports = nextConfig
