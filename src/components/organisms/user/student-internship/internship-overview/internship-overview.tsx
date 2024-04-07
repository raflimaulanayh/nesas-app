'use client'

import Link from 'next/link'
import { PiArrowLeftBold } from 'react-icons/pi'
import useSWR from 'swr'
import { TCompanyInternship } from 'types/data/company'
import { TInternship } from 'types/data/internship'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import Container from '@/components/templates/container/container'

import { InternshipHistory } from '../internship-history'
import { ListCompany } from '../internship-list-company'
import { InternshipStatus } from '../status'

export const InternshipOverView = () => {
  const {
    data: listCompany,
    mutate: mutateListCompany,
    isLoading: loadListCompany
  } = useSWR<TCompanyInternship>('/internships/companies')
  const {
    data: listInternship
    // mutate: mutateListInternship,
    // isLoading: loadListInternship
  } = useSWR<TInternship>('/internships')

  return (
    <div className="rounded-3xl pt-7 lg:py-10 relative -mt-32 bg-white overflow-y-auto pb-32 min-h-[70vh]">
      <Container>
        <div className="flex items-center justify-between gap-2">
          <Link href="/student" className="flex items-center gap-2">
            <PiArrowLeftBold size={25} />
            <h2 className="text-lg font-semibold text-slate-900">Menu PKL</h2>
          </Link>
        </div>

        <Tabs defaultValue="status">
          <TabsList className="w-full mt-4 mb-2">
            <TabsTrigger className="w-1/2" value="status">
              Status
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="history">
              Riwayat
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="choice">
              Perusahaan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="status">
            <InternshipStatus />
          </TabsContent>
          <TabsContent value="history">
            {listCompany && listInternship && (
              <InternshipHistory
                listInternship={listInternship}
                listCompany={listCompany}
                mutateListCompany={mutateListCompany}
                loadListCompany={loadListCompany}
              />
            )}
          </TabsContent>
          <TabsContent value="choice">
            {listCompany && listCompany.data && (
              <ListCompany data={listCompany} mutate={mutateListCompany} isLoading={loadListCompany} />
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  )
}
