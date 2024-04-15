import { useCurrentUser } from '@/hooks/use-current-user'
import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { ForumCreateForm } from '@/components/molecules/form/forum/create-forum-form'

export const ForumCreate = () => {
  const isHydrated = useHydration()
  const user = useCurrentUser()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/forum', label: 'Kelola Forum' },
    { label: 'Tambah Forum' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/article" text="Tambah Forum" />
          </div>
          <ForumCreateForm isAdmin user_id={user?.id || '123'} />
        </div>
      )}
    </Fragment>
  )
}
