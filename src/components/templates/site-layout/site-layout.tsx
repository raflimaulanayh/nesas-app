import { Fragment } from 'react'

import { Footer } from '@/components/organisms/footer'
import { Navbar } from '@/components/organisms/navbar'

import { cn } from '@/lib/utils'

interface SiteLayoutProps {
  children: React.ReactNode
  className?: string
}

export const SiteLayout = ({ children, className }: SiteLayoutProps) => (
  <Fragment>
    <Navbar />
    <div className={cn('my-20', className)}>{children}</div>
    <Footer />
  </Fragment>
)
