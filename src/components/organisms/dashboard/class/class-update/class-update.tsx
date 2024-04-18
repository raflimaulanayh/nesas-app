import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import { Params } from 'types/data/params'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { ClassUpdateForm } from '@/components/molecules/form/class/update-class-from'

export const ClassUpdate = ({ params }: Params) => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/class', label: 'Kelola Kelas' },
    { label: 'Update Kelas' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/class" text="Update Kelas" />
          </div>
          <ClassUpdateForm params={params} />
        </div>
      )}
    </Fragment>
  )
}
