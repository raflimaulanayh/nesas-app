import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import { Params } from 'types/data/params'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { ArticleUpdateForm } from '@/components/molecules/form/article/update-article-form'

export const ArticleUpdate = ({ params }: Params) => {
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/article', label: 'Kelola Artikel' },
    { label: 'Update Artikel' }
  ]

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-7">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/article" text="Update Artikel" />
          </div>
          <ArticleUpdateForm params={params} />
        </div>
      )}
    </Fragment>
  )
}
