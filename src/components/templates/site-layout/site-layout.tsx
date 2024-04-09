import { Fragment } from 'react'

import { Footer } from '@/components/organisms/footer'
import { Navbar } from '@/components/organisms/navbar/navbar-main'

import { cn } from '@/lib/utils'

interface SiteLayoutProps {
  children: React.ReactNode
  className?: string
}

export const SiteLayout = ({ children, className }: SiteLayoutProps) => (
  <Fragment>
    <Navbar />
    <div className={cn('my-[5rem]', className)}>{children}</div>
    <Footer />
  </Fragment>
)
