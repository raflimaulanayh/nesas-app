/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCompanyInternship } from 'types/data/company'
import { TInternship } from 'types/data/internship'
import { User } from 'types/data/user'

import { Skeleton } from '@/components/atoms/ui/skeleton'

import { cn } from '@/lib/utils'
import { formatInternshipStatus } from '@/lib/utils/format-internship-status'

interface ListCompanyProps {
  listCompany: TCompanyInternship
  listInternship: TInternship
  mutateListCompany?: any
  loadListCompany?: boolean
  user: User
}

export const InternshipHistory = ({ listCompany, listInternship, loadListCompany, user }: ListCompanyProps) => {
  const filteredInternships = listInternship?.data?.filter((internship) => {
    return internship?.students?.some((student: any) => student.id === user?.students?.[0]?.id)
  })

  const filteredSubmissionPending = listCompany?.data?.filter((company: { status: string }) => {
    const isActiveOrFilled = company.status === 'pending'

    return isActiveOrFilled
  })

  return (
    <div className="py-2 space-y-6">
      {loadListCompany ? (
        <div className="space-y-2">
          <Skeleton className="w-8/12 h-10 rounded" />
          <Skeleton className="w-full h-48 rounded" />
        </div>
      ) : (
        <div className="space-y-6">
          <section>
            <h2 className="font-semibold text-slate-900">Memilih Perusahaan</h2>
            <div className="grid gap-4 py-2 lg:grid-cols-2">
              {filteredInternships.length > 0 ? (
                filteredInternships.map((item, index) => {
                  const companyChoice = listCompany && listCompany.data.find((company) => company.id === item.company_id)

                  if (companyChoice) {
                    return (
                      <div key={index} className="relative flex flex-col p-4 bg-white border rounded shadow lg:p-8 gap-y-2">
                        <h2 className="font-semibold lg:text-xl line-clamp-1">{companyChoice.name}</h2>
                        <span className="text-sm lg:text-base line-clamp-3">{companyChoice.address}</span>
                        <div className="flex items-center justify-between gap-2">
                          <div className="w-10/12 text-sm lg:text-base">
                            <span className="font-semibold">Jurusan :</span>{' '}
                            {companyChoice.majors && companyChoice.majors.length > 0
                              ? companyChoice.majors.map((major: any) => major.short_name).join(', ')
                              : '-'}
                            <p>
                              <span className="font-semibold">Kuota :</span> {companyChoice.quota} Orang
                            </p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            formatInternshipStatus(item.status).customCSS,
                            'absolute rounded text-xs capitalize right-4 bottom-4 p-1.5'
                          )}
                        >
                          {formatInternshipStatus(item.status).statusShow}
                        </span>
                      </div>
                    )
                  }

                  return null
                })
              ) : (
                <div>Tidak ada perusahaan yang dipilih...</div>
              )}
            </div>
          </section>
          <section>
            <h2 className="font-semibold text-slate-900">Pengajuan Perusahaan</h2>
            <div className="grid gap-4 py-2 lg:grid-cols-2">
              {filteredSubmissionPending.length > 0 ? (
                filteredSubmissionPending.map((item, index) => (
                  <div key={index} className="relative flex flex-col p-4 bg-white border rounded shadow lg:p-8 gap-y-2">
                    <h2 className="font-semibold lg:text-xl line-clamp-1">{item.name}</h2>
                    <span className="text-sm lg:text-base line-clamp-3">{item.address}</span>
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10/12 text-sm lg:text-base">
                        <span className="font-semibold">Jurusan :</span>{' '}
                        {item.majors && item.majors.length > 0
                          ? item.majors.map((major: any) => major.short_name).join(', ')
                          : '-'}
                        <p>
                          <span className="font-semibold">Kuota :</span> {item.quota} Orang
                        </p>
                      </div>
                    </div>

                    <span className="absolute rounded text-xs capitalize right-4 bottom-4 text-white bg-blue-500 p-1.5">
                      {item.status}
                    </span>
                  </div>
                ))
              ) : (
                <div>Tidak ada pengajuan perusahaan...</div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
