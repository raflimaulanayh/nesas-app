import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { InternshipCreateForm } from '@/components/molecules/form/internship-form/create-internship-form'

export const InternshipCreate = () => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/internship', label: 'Kelola PKL' },
    { label: 'Tambah PKL' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-7">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/internship" text="Tambah PKL" />
          </div>
          <InternshipCreateForm />
        </div>
      )}
    </Fragment>
  )
}
