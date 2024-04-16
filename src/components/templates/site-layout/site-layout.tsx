import { Fragment } from 'react'

import { Footer } from '@/components/organisms/footer'
import { Navbar } from '@/components/organisms/navbar/navbar-main'

import { cn } from '@/lib/utils'

interface SiteLayoutProps {
  children: React.ReactNode
  className?: string
  title?: string
}

export const SiteLayout = ({ children, className, title = 'SMKN 1 Sumedang' }: SiteLayoutProps) => (
  <Fragment>
    <Navbar />
    <div className={cn('mt-[5.2rem] mb-10 lg:my-[5rem]', className)}>
      <h1 className="sr-only">{title} | Nesas Smart School</h1>
      {children}
    </div>
    <Footer />
  </Fragment>
)
