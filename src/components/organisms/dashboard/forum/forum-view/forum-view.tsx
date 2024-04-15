/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { ForumViewList } from './forum-view-list'

export const ForumView = () => {
  const isHydrated = useHydration()
  const { data: forums, mutate: mutateForums, isLoading: forumsLoading } = useSWR('/forums')
  const dataForums = forums?.data === undefined ? [{}] : forums.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola Forum' }]

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
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view">Kelola Forum</TabsTrigger>
              </TabsList>

              <TabsContent value="view">
                {forumsLoading && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-full h-40" />
                  </div>
                )}
                {!forumsLoading && <ForumViewList dataForums={dataForums} mutateForums={mutateForums} />}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  )
}
