import '@/shared/styles/app.css'

import { siteConfig } from '@/constants/config'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { auth } from 'auth'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'

import { Toaster } from '@/components/atoms/ui/toaster'
import { ClientProvider } from '@/components/providers/client-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

import { HeadMetaData } from './seo'

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/Icon-512.png',
    apple: '/favicon/apple-touch-icon.png'
  },
  manifest: '/favicon/manifest.json'
}
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <html lang="id" suppressHydrationWarning>
      <HeadMetaData />

      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <React.Fragment>
            <NextTopLoader color="#4338CA" showSpinner={true} />
            <ClientProvider session={session}>{children}</ClientProvider>
            <SpeedInsights />
            <Analytics />
          </React.Fragment>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
