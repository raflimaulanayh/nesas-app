import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { ArticleCreateForm } from '@/components/molecules/form/article/create-article-form'

export const ArticleCreate = () => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/article', label: 'Kelola Artikel' },
    { label: 'Tambah Artikel' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/article" text="Tambah Artikel" />
          </div>
          <ArticleCreateForm />
        </div>
      )}
    </Fragment>
  )
}
