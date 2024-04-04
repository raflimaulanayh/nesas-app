'use client'

import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'

import { Heading } from '@/components/atoms/heading'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'

import { columns } from './data-table/columns'
import { DataTable } from './data-table/table'

export const UserOverview = () => {
  const isHydrated = useHydration()
  const { data: users, mutate: mutateUser, isLoading: userLoading } = useSWR('/users')
  const dataUser = users?.data === undefined ? [{}] : users.data

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="space-y-7">
          <Heading text="Kelola Siswa" url="/dashboard" />
          <DataTable data={dataUser} columns={columns} mutate={mutateUser} isLoading={userLoading} />
        </div>
      )}
    </Fragment>
  )
}
