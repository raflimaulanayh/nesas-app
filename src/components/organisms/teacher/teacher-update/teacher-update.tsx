import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import { Params } from 'types/data/params'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { TeacherUpdateForm } from '@/components/molecules/form/teacher-form/update-teacher-form'

export const TeacherUpdate = ({ params }: Params) => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/teacher', label: 'Kelola Guru' },
    { label: 'Update Guru' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/teacher" text="Update Guru" />
          </div>
          <TeacherUpdateForm params={params} />
        </div>
      )}
    </Fragment>
  )
}
