import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { TeacherCreateForm } from '@/components/molecules/form/teacher-form/create-teacher-form'

export const TeacherCreate = () => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/teacher', label: 'Kelola Guru' },
    { label: 'Tambah Guru' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/teacher" text="Tambah Guru" />
          </div>
          <TeacherCreateForm />
        </div>
      )}
    </Fragment>
  )
}
