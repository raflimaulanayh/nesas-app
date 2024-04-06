'use client'

import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { columns } from './data-table-view/columns'
import { DataTableView } from './data-table-view/table'

export const StudentView = () => {
  const isHydrated = useHydration()
  const { data: students, mutate: mutateStudents, isLoading: studentsLoading } = useSWR('/students')
  const dataStudents = students?.data === undefined ? [{}] : students.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola Siswa' }]

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view">Kelola Siswa</TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <DataTableView data={dataStudents} columns={columns} mutate={mutateStudents} isLoading={studentsLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  )
}
