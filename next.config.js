/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['spacre.com', 'res.cloudinary.com', 'images.generated.photos', 'blog.hubspot.com', 'upload.wikimedia.org', 'www.doorwaysva.org', 'www.channelfutures.com'],
  },
  rules: {
    '@next/next/no-img-element': 'off',
  }
}

module.exports = nextConfig
