import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { ClassCreateForm } from '@/components/molecules/form/class/create-class-form'

export const ClassCreate = () => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/class', label: 'Kelola Kelas' },
    { label: 'Tambah Kelas' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/class" text="Tambah Kelas" />
          </div>
          <ClassCreateForm />
        </div>
      )}
    </Fragment>
  )
}
