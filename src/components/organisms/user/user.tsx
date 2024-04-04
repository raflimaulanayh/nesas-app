'use client'

import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'

import { columns } from './data-table/columns'
import { DataTable } from './data-table/table'

export const UserOverview = () => {
  const isHydrated = useHydration()
  const { data: users, mutate: mutateUser, isLoading: userLoading } = useSWR('/users')
  const dataUser = users?.data === undefined ? [{}] : users.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola Siswa' }]

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="space-y-7">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading text="Kelola Siswa" />
          </div>
          <DataTable data={dataUser} columns={columns} mutate={mutateUser} isLoading={userLoading} />
        </div>
      )}
    </Fragment>
  )
}
