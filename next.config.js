/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: []
  },
  env: {
    SITE_NAME: 'Nesas Smart School',
    APP_URL: process.env.APP_URL,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
  }
}

module.exports = nextConfig
