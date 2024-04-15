import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import { Params } from 'types/data/params'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { UserUpdateForm } from '@/components/molecules/form/user-form/update-user-from'

export const UserUpdate = ({ params }: Params) => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/user', label: 'Kelola User' },
    { label: 'Update User' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/user" text="Update User" />
          </div>
          <UserUpdateForm params={params} />
        </div>
      )}
    </Fragment>
  )
}
