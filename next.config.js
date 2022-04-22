/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['spacre.com', 'sfsfiles.spacre.com'],
  },
  rules: {
    '@next/next/no-img-element': 'off',
  }
}

module.exports = nextConfig
