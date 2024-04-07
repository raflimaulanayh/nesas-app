/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { IoIosInformationCircle } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { TCompanyInternship } from 'types/data/company'

import { Button } from '@/components/atoms/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/atoms/ui/carousel'
import { Input } from '@/components/atoms/ui/input'
import { Label } from '@/components/atoms/ui/label'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/atoms/ui/sheet'
import { Skeleton } from '@/components/atoms/ui/skeleton'

import { FormChoiceInternsip } from './internship-form'
import { FormSubmissionCompany } from './submission-company-form'

interface ListCompanyProps {
  data: TCompanyInternship
  mutate?: any
  isLoading?: boolean
}

export const ListCompany = ({ data, isLoading }: ListCompanyProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value)
  }

  const filteredCompanies = data?.data?.filter((company: any) => {
    const isActiveOrFilled = company.status === 'active' || company.status === 'filled'

    const companyNameMatches = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    const majorMatches = company.majors.some((major: any) => major.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return isActiveOrFilled && (companyNameMatches || majorMatches)
  })

  return (
    <div className="space-y-2">
      <Input
        placeholder="Cari nama perusahaan atau jurusan..."
        value={searchQuery}
        onChange={handleInputChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
      />
      <Carousel
        opts={{
          align: 'start'
        }}
        orientation="horizontal"
        className="w-full"
      >
        {isLoading ? (
          <Skeleton className="w-full h-48 rounded" />
        ) : (
          <CarouselContent className="h-full mx-auto">
            {filteredCompanies?.length == 0 ? (
              <div className="w-full text-center">
                <ListCompanyCard title="Data kosong..." />
              </div>
            ) : (
              filteredCompanies?.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="relative flex flex-col p-4 bg-white border rounded shadow lg:p-8 gap-y-2"
                >
                  <h2 className="font-semibold lg:text-xl line-clamp-1">{item.name}</h2>
                  <span className="text-sm lg:text-base line-clamp-3">{item.address}</span>
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10/12 text-sm lg:text-base">
                      <span className="font-semibold">Jurusan :</span>{' '}
                      {item.majors && item.majors.length > 0 ? item.majors.map((major: any) => major.name).join(', ') : '-'}
                      <p>
                        <span className="font-semibold">Kuota :</span> {item.quota} Orang
                      </p>
                    </div>
                    <Sheet>
                      <SheetTrigger className="absolute right-4 bottom-4">
                        <Button className="self-end inline text-sm font-semibold rounded lg:text-base bg-primary">
                          Pilih
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom">
                        <SheetHeader className="space-y-4 text-start">
                          <SheetTitle>
                            <h2 className="font-semibold">{item.name}</h2>
                          </SheetTitle>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="flex flex-col text-sm gap-y-1">
                              <Label>Jurusan :</Label>
                              {item.majors && item.majors.length > 0
                                ? item.majors.map((major: any) => major.name).join(', ')
                                : '-'}
                            </span>
                            <span className="flex flex-col text-sm gap-y-1">
                              <Label>Kuota :</Label>
                              {item.quota} Orang
                            </span>
                          </div>
                          <div>
                            <Label>Alamat</Label>
                            <SheetDescription className="flex items-start gap-2 p-3 bg-slate-100">
                              <MdLocationOn size={22} />
                              <p className="w-11/12 text-start">{item.address}</p>
                            </SheetDescription>
                          </div>
                          <div>
                            <Label>Persyaratan</Label>
                            <SheetDescription className="flex items-start gap-2 p-3 rounded bg-slate-100">
                              <IoIosInformationCircle size={20} />
                              <p
                                className="text-start [&>ul]:list-disc [&>ul]:pl-3"
                                dangerouslySetInnerHTML={{ __html: item.requirements || '' }}
                              />
                            </SheetDescription>
                          </div>
                        </SheetHeader>
                        <FormChoiceInternsip companyId={item.id} />
                      </SheetContent>
                    </Sheet>
                  </div>
                </CarouselItem>
              ))
            )}
            {filteredCompanies?.length !== 0 && <ListCompanyCard title="Halo teman-teman👋" />}
          </CarouselContent>
        )}
        <div className="relative z-40 flex items-center justify-center gap-4 mx-auto my-10 max-w-20">
          <CarouselPrevious className="relative !-left-0" />
          <CarouselNext className="relative !-right-0" />
        </div>
      </Carousel>
    </div>
  )
}

const ListCompanyCard = ({ title }: { title: string }) => {
  return (
    <CarouselItem className="flex flex-col p-4 bg-white border rounded shadow lg:p-8 gap-y-3">
      <h2 className="font-semibold lg:text-xl">{title}</h2>
      <span className="text-sm lg:text-base">Ingin berbagi rekomendasi perusahaan atau tempat PKL lainnya?</span>
      <Sheet>
        <SheetTrigger>
          <Button className="w-full text-sm font-semibold rounded lg:text-base bg-primary">Ajukan</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
          <SheetHeader className="pb-4 text-start">
            <SheetTitle>
              <h2 className="font-semibold">Pengajuan</h2>
            </SheetTitle>
            <SheetDescription>Ayo ajukan perusahaan atau tempat PKL Lainnya</SheetDescription>
          </SheetHeader>
          <div className="p-3 rounded bg-slate-100">
            <span className="flex flex-col text-sm gap-y-1">
              <Label>Catatan :</Label>
              Input yang ada tanda * berarti harus diisi
            </span>
          </div>
          <FormSubmissionCompany />
        </SheetContent>
      </Sheet>
    </CarouselItem>
  )
}
