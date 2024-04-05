'use client'

import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { columns } from './data-table-view/columns'
import { DataTableView } from './data-table-view/table'

export const TeacherView = () => {
  const isHydrated = useHydration()
  const { data: users, mutate: mutateTeachers, isLoading: teachersLoading } = useSWR('/teachers')
  const dataTeachers = users?.data === undefined ? [{}] : users.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola Guru' }]

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view">Kelola Guru</TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <DataTableView data={dataTeachers} columns={columns} mutate={mutateTeachers} isLoading={teachersLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  )
}
