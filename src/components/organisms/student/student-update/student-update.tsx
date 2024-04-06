import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import { Params } from 'types/data/params'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { StudentUpdateForm } from '@/components/molecules/form/student-form/update-student-form'

export const StudentUpdate = ({ params }: Params) => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/student', label: 'Kelola Siswa' },
    { label: 'Update Siswa' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/student" text="Update Siswa" />
          </div>
          <StudentUpdateForm params={params} />
        </div>
      )}
    </Fragment>
  )
}
