import '@/shared/styles/app.css'

import { siteConfig } from '@/constants/config'
import { Analytics } from '@vercel/analytics/react'
import { auth } from 'auth'
import { Rubik as FontSans } from 'next/font/google'
import React from 'react'

import { ClientProvider } from '@/components/providers/client-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

import { cn } from '@/lib/utils/cn'

import { HeadMetaData } from './seo'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/android-chrome-512x512.png',
    apple: '/favicon/apple-touch-icon.png'
  },
  manifest: '/favicon/manifest.json'
}
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <html lang="en">
      <head>
        <HeadMetaData />
      </head>

      <body className={cn('antialiased min-h-screen', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <React.Fragment>
            <ClientProvider session={session}>{children}</ClientProvider>
            <Analytics />
          </React.Fragment>
        </ThemeProvider>
      </body>
    </html>
  )
}
