/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa'

const nextConfig = {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true
  }),
  reactStrictMode: true,
  images: {
    domains: ['utfs.io']
  },
  env: {
    SITE_NAME: 'Nesas Smart School',
    APP_URL: process.env.APP_URL,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET
  }
}

export default nextConfig
