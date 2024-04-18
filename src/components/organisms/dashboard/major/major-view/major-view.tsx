'use client'

import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { columns } from './data-table-view/columns'
import { DataTableView } from './data-table-view/table'

export const MajorView = () => {
  const isHydrated = useHydration()
  const { data: majors, mutate: mutateMajors, isLoading: majorsLoading } = useSWR('/majors')
  const dataMajors = majors?.data === undefined ? [{}] : majors.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola Jurusan' }]

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view">Kelola Jurusan</TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <DataTableView data={dataMajors} columns={columns} mutate={mutateMajors} isLoading={majorsLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  )
}
