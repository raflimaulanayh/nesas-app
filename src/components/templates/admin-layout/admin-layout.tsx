import { SiteLayout } from '@/components/templates/site-layout'

import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  children: React.ReactNode
  className?: string
}

export const AdminLayout = ({ children, className }: AdminLayoutProps) => (
  <SiteLayout className={cn('bg-blue-50', className)}>
    <div className="flex">
      <div className="w-full bg-white pl-[73px] pr-[97px] py-16 flex flex-col space-y-6 flex-1">{children}</div>
    </div>
  </SiteLayout>
)
