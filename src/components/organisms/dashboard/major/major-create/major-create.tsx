import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { MajorCreateForm } from '@/components/molecules/form/major-form/create-major-form'

export const MajorCreate = () => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/major', label: 'Kelola Jurusan' },
    { label: 'Tambah Jurusan' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/teacher" text="Tambah Jurusan" />
          </div>
          <MajorCreateForm />
        </div>
      )}
    </Fragment>
  )
}
