'use client'

import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { columns } from './data-table-view/columns'
import { DataTableView } from './data-table-view/table'

export const ClassView = () => {
  const isHydrated = useHydration()
  const { data: classes, mutate: mutateClasses, isLoading: classesLoading } = useSWR('/classes')
  const dataClasses = classes?.data === undefined ? [{}] : classes.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola Kelas' }]

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view">Kelola Kelas</TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <DataTableView data={dataClasses} columns={columns} mutate={mutateClasses} isLoading={classesLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  )
}
