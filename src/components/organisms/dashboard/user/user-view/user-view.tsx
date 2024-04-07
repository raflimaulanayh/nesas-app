'use client'

import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'
import { User } from 'types/data/user'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { columns as ColumnPermission } from './data-table-permission/columns'
import { DataTablePermission } from './data-table-permission/table'
import { columns as ColumnView } from './data-table-view/columns'
import { DataTableView } from './data-table-view/table'

export const UserView = () => {
  const isHydrated = useHydration()
  const { data: users, mutate: mutateUser, isLoading: userLoading } = useSWR('/users')
  const dataUser = users?.data === undefined ? [{}] : users.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola User' }]

  const getDataByStatus = (status: boolean) => {
    const filterDataByStatus = dataUser?.filter((item: User) => item.active == status)

    return filterDataByStatus
  }

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="space-y-7">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view">Kelola User</TabsTrigger>
                <TabsTrigger value="permission">Perizinan User</TabsTrigger>
              </TabsList>

              <TabsContent value="view">
                <DataTableView
                  data={getDataByStatus(true)}
                  columns={ColumnView}
                  mutate={mutateUser}
                  isLoading={userLoading}
                />
              </TabsContent>
              <TabsContent value="permission">
                <DataTablePermission
                  data={getDataByStatus(false)}
                  columns={ColumnPermission}
                  mutate={mutateUser}
                  isLoading={userLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  )
}
