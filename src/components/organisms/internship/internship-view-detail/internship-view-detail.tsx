/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHydration } from '@/hooks/use-hydration'
import api from '@/services/api'
import { InfoIcon, UserCheck } from 'lucide-react'
import moment from 'moment'
import { Fragment, useState } from 'react'
import useSWR from 'swr'
import { Params } from 'types/data/params'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { Loading } from '@/components/atoms/icons'
import { Modal } from '@/components/atoms/modal'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { Button } from '@/components/atoms/ui/button'
import { toast } from '@/components/atoms/ui/use-toast'
import { UserDetailCardSubmissionDetailCard } from '@/components/molecules/card/user-detail-card'

import { cn } from '@/lib/utils'
import { formatCompanyStatus } from '@/lib/utils/format-company-status'
import { formatInternshipStatus } from '@/lib/utils/format-internship-status'

export const InternshipViewDetail = ({ params }: Params) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/internship', label: 'Kelola PKL' },
    { label: 'Detail Internship' }
  ]

  const { data: internship, isLoading: loadInternship, mutate: mutateInternship } = useSWR(`/internships/${params.id}`)
  const data = internship?.data

  const { data: classes } = useSWR(`/classes`)
  const getClassByStudent = (class_id: string) => {
    const classStudent = classes?.data?.find((item: { id: string }) => item.id == class_id)

    return classStudent ?? '-'
  }

  async function onSubmitStatus() {
    setLoading(true)

    const body = {
      status: 'approved'
    }
    await api
      .put(`/internships/${params.id}`, body)
      .then(({ status }) => {
        if (status == 200) {
          mutateInternship()
          toast({
            title: 'PKL berhasil disetujui!'
          })
        }
      })
      .catch(() => {
        toast({
          title: 'PKL gagal disetujui!',
          variant: 'destructive'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSubmit = () => {
    onSubmitStatus()
    setOpenModal(false)
  }

  const formatStatus = formatInternshipStatus(data?.status)
  const formatStatusCompany = formatCompanyStatus(data?.companyInternships?.status)

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <header className="flex flex-col space-y-4">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/internship" text="Detail PKL" />
          </header>

          {loadInternship && (
            <div className="flex justify-center items-center w-full h-[50vh]">
              <Loading className="w-10 h-10 text-primary" />
            </div>
          )}

          {!loadInternship && (
            <div className="flex flex-col min-h-screen mx-auto mt-40 mb-24 space-y-6">
              <div className="flex flex-col space-y-4 border border-gray-300 rounded p-7">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">
                      Tanggal dibuat:{' '}
                      {data?.createdAt ? moment(data.createdAt).locale('id').format('D MMMM YYYY, H:mm:ss') : '-'}{' '}
                    </span>
                    <div className="flex items-center gap-x-1">
                      <span
                        className={cn(
                          'capitalize rounded-md px-3 py-1.5 text-sm font-medium border',
                          formatStatus?.customCSS
                        )}
                      >
                        {formatStatus?.statusShow}
                      </span>
                    </div>
                  </div>

                  {data?.status === 'pending' || data?.status === 'rejected' ? (
                    <Button
                      onClick={() => setOpenModal(true)}
                      disabled={loading}
                      className="space-x-1 text-white bg-primary"
                    >
                      <UserCheck size={20} />
                      <span>Setujui</span>
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col w-full p-8 space-y-3 bg-white border border-gray-200 rounded">
                <h2 className="text-lg font-medium">Informasi PKL</h2>
                <div className="grid grid-cols-2 gap-3">
                  <UserDetailCardSubmissionDetailCard
                    label="Nama perusahaan"
                    value={data?.companyInternships?.name ?? '-'}
                  />
                  <UserDetailCardSubmissionDetailCard label="Kuota" value={data?.companyInternships?.quota ?? '-'} />
                  <UserDetailCardSubmissionDetailCard
                    label="Kontak"
                    value={
                      <ul className="pl-4 list-disc">
                        {data?.companyInternships?.contact
                          ?.split(',')
                          .map((item: any) => <li key={Math.random() + 1}>{item}</li>)}
                      </ul>
                    }
                  />

                  <UserDetailCardSubmissionDetailCard
                    label="Pimpinan"
                    value={data?.companyInternships?.leader_name ?? '-'}
                  />

                  <UserDetailCardSubmissionDetailCard
                    label="Persyaratan"
                    value={
                      <ol className="pl-5 list-decimal">
                        {data?.companyInternships?.requirements
                          ?.split(',')
                          .map((item: any) => <li key={Math.random() + 1}>{item}</li>)}
                      </ol>
                    }
                  />

                  <UserDetailCardSubmissionDetailCard
                    label="Status"
                    value={
                      <div className="py-1">
                        <span
                          className={cn(
                            'capitalize rounded-md px-3 py-1.5 text-sm font-medium border',
                            formatStatusCompany?.customCSS
                          )}
                        >
                          {formatStatusCompany?.statusShow}
                        </span>
                      </div>
                    }
                  />

                  <UserDetailCardSubmissionDetailCard
                    label="Alamat"
                    value={data?.companyInternships?.address ?? '-'}
                    className="col-span-2"
                  />

                  <UserDetailCardSubmissionDetailCard
                    className="col-span-2"
                    label="Daftar siswa"
                    value={
                      <ol className="pl-5 list-decimal">
                        {data?.students?.map((item: { name: string; class_id: string }) => (
                          <li key={Math.random() + 1}>
                            {item?.name} - {getClassByStudent(item?.class_id)?.name}
                          </li>
                        ))}
                      </ol>
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Modal open={openModal} setOpen={setOpenModal} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-semibold">Konfirmasi</p>
        <p>Kamu yakin ingin menyetujui?</p>
        <Button className="w-full h-auto py-3 rounded-full bg-primary hover:bg-secondary-blue" onClick={handleSubmit}>
          Ya, Konfirmasi
        </Button>
        <Button
          className="w-full h-auto py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
          onClick={() => setOpenModal(false)}
        >
          Tidak, Cancel
        </Button>
      </Modal>
    </Fragment>
  )
}
