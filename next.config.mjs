/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'
import os from 'os'

const nextConfig = {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true
  }),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/**'
      }
    ]
  },
  env: {
    SITE_NAME: 'Nesas Smart School',
    APP_URL: process.env.APP_URL,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: [
        {
          loader: 'nextjs-node-loader',
          options: {
            flags: os.constants.dlopen.RTLD_NOW,
            outputPath: config.output.path
          }
        }
      ]
    })

    return config
  }
}

export default nextConfig
