'use client'

import { useHydration } from '@/hooks/use-hydration'
import { Fragment } from 'react'
import useSWR from 'swr'
import { CompanyInternship } from 'types/data/company'
import { Internship } from 'types/data/internship'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

import { columns as ColumnViewCompany } from './data-table-company/columns'
import { DataTableViewCompany } from './data-table-company/table'
import { columns as ColumnView } from './data-table-internship/columns'
import { DataTableViewInternship } from './data-table-internship/table'
import { columns as ColumnInterview } from './data-table-internview-internship/columns'
import { DataTableInternviewInternship } from './data-table-internview-internship/table'
import { columns as ColumnPermissionCompany } from './data-table-permission-company/columns'
import { DataTablePermissionCompany } from './data-table-permission-company/table'
import { columns as ColumnPermission } from './data-table-permission-internship/columns'
import { DataTablePermissionInternship } from './data-table-permission-internship/table'

export const InternshipView = () => {
  const isHydrated = useHydration()
  const { data: internships, mutate: mutateInternship, isLoading: userLoading } = useSWR('/internships')
  const dataInternships = internships?.data === undefined ? [{}] : internships.data

  const { data: companies, mutate: mutateCompany, isLoading: companiesLoading } = useSWR('/internships/companies')
  const dataCompanies = companies?.data === undefined ? [{}] : companies.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola PKL' }]

  const getDataByStatusCompany = (statuses: ('active' | 'not_active' | 'pending' | 'filled')[]) => {
    const filterDataByStatus = dataCompanies?.filter((item: CompanyInternship) => statuses.includes(item.status))

    return filterDataByStatus || []
  }

  const getDataByStatusInternship = (
    statuses: (
      | 'not_started'
      | 'pending'
      | 'approved'
      | 'interviewing'
      | 'getted_kuota'
      | 'rejected'
      | 'canceled'
      | 'dropoff_completed'
      | 'pickup_completed'
      | 'ongoing'
      | 'ongoing'
      | 'completed'
      | 'sidang_completed'
    )[]
  ) => {
    const filterDataByStatus = dataInternships?.filter((item: Internship) => statuses.includes(item.status))

    return filterDataByStatus || []
  }

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view-internship" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view-internship">Kelola PKL</TabsTrigger>
                <TabsTrigger value="view-interview">Sesi Interview</TabsTrigger>
                <TabsTrigger value="permission-internship">Pengajuan PKL</TabsTrigger>
                <TabsTrigger value="view-company">Daftar Perusahaan</TabsTrigger>
                <TabsTrigger value="permission-company">Pengajuan Perusahaan</TabsTrigger>
              </TabsList>

              <TabsContent value="view-internship">
                <DataTableViewInternship
                  data={getDataByStatusInternship([
                    'interviewing',
                    'dropoff_completed',
                    'pickup_completed',
                    'getted_kuota',
                    'rejected',
                    'canceled',
                    'ongoing',
                    'completed',
                    'sidang_completed'
                  ])}
                  columns={ColumnView}
                  mutate={mutateInternship}
                  isLoading={userLoading}
                />
              </TabsContent>
              <TabsContent value="view-interview">
                <DataTableInternviewInternship
                  data={getDataByStatusInternship(['approved'])}
                  columns={ColumnInterview}
                  mutate={mutateInternship}
                  isLoading={userLoading}
                />
              </TabsContent>
              <TabsContent value="permission-internship">
                <DataTablePermissionInternship
                  data={getDataByStatusInternship(['pending'])}
                  columns={ColumnPermission}
                  mutate={mutateInternship}
                  isLoading={userLoading}
                />
              </TabsContent>
              <TabsContent value="view-company">
                <DataTableViewCompany
                  data={getDataByStatusCompany(['active', 'filled', 'not_active'])}
                  columns={ColumnViewCompany}
                  mutate={mutateCompany}
                  isLoading={companiesLoading}
                />
              </TabsContent>
              <TabsContent value="permission-company">
                <DataTablePermissionCompany
                  data={getDataByStatusCompany(['pending'])}
                  columns={ColumnPermissionCompany}
                  mutate={mutateInternship}
                  isLoading={companiesLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </Fragment>
  )
}
