/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { ArticleViewList } from './article-view-list'
import { ArticleViewPermission } from './article-view-permission'

export const ArticleView = () => {
  const isHydrated = useHydration()
  const { data: articles, mutate: mutateArticles, isLoading: articlesLoading } = useSWR('/articles')
  const dataArticles = articles?.data === undefined ? [{}] : articles.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola Artikel' }]

  const getDataByStatus = (statuses: ('public' | 'private' | 'draft' | 'pending')[]) => {
    const filterDataByStatus = dataArticles?.filter((item: any) => statuses.includes(item.status))

    return filterDataByStatus || []
  }

  return (
    <Fragment>
      {!isHydrated && (
        <div className="space-y-3">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-10 w-52" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
          </div>
        </div>
      )}
      {isHydrated && (
        <div className="space-y-7">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view">Kelola Artikel</TabsTrigger>
                <TabsTrigger value="permission">Pengajuan Artikel</TabsTrigger>
              </TabsList>

              <TabsContent value="view">
                {articlesLoading && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-full h-40" />
                  </div>
                )}
                {!articlesLoading && (
                  <ArticleViewList
                    dataArticles={getDataByStatus(['public', 'private', 'draft'])}
                    mutateArticles={mutateArticles}
                  />
                )}
              </TabsContent>
              <TabsContent value="permission">
                {articlesLoading && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-full h-40" />
                  </div>
                )}
                {!articlesLoading && (
                  <ArticleViewPermission dataArticles={getDataByStatus(['pending'])} mutateArticles={mutateArticles} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  )
}
