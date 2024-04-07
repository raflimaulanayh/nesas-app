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

export const InternshipCompanyViewDetail = ({ params }: Params) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/internship', label: 'Kelola Perusahaan' },
    { label: 'Detail Perusahaan' }
  ]

  const { data: company, isLoading: loadCompany, mutate: mutateInternship } = useSWR(`/internships/companies/${params.id}`)
  const data = company?.data

  async function onSubmitStatus() {
    setLoading(true)

    const body = {
      status: 'active'
    }
    await api
      .put(`/internships/companies/${params.id}`, body)
      .then(({ status }) => {
        if (status == 200) {
          mutateInternship()
          toast({
            title: 'Perusahaan berhasil disetujui!'
          })
        }
      })
      .catch(() => {
        toast({
          title: 'Perusahaan gagal disetujui!',
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

  const formatStatusCompany = formatCompanyStatus(data?.status)

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <header className="flex flex-col space-y-4">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/internship" text="Detail Perusahaan" />
          </header>

          {loadCompany && (
            <div className="flex justify-center items-center w-full h-[50vh]">
              <Loading className="w-10 h-10 text-primary" />
            </div>
          )}

          {!loadCompany && (
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
                          formatStatusCompany?.customCSS
                        )}
                      >
                        {formatStatusCompany?.statusShow}
                      </span>
                    </div>
                  </div>

                  {data?.status === 'pending' ? (
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
                <h2 className="text-lg font-medium font-gotham">Informasi Perusahaan</h2>
                <div className="grid grid-cols-2 gap-3">
                  <UserDetailCardSubmissionDetailCard label="Nama perusahaan" value={data?.name ?? '-'} />
                  <UserDetailCardSubmissionDetailCard label="Kuota" value={data?.quota ?? '-'} />
                  <UserDetailCardSubmissionDetailCard
                    label="Kontak"
                    value={
                      <ul className="pl-4 list-disc">
                        {data?.contact?.split(',').map((item: any) => <li key={Math.random() + 1}>{item}</li>)}
                      </ul>
                    }
                  />

                  <UserDetailCardSubmissionDetailCard label="Pimpinan" value={data?.leader_name ?? '-'} />

                  <UserDetailCardSubmissionDetailCard
                    label="Persyaratan"
                    value={
                      <ol className="pl-5 list-decimal">
                        {data?.requirements?.split(',').map((item: any) => <li key={Math.random() + 1}>{item}</li>)}
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

                  <UserDetailCardSubmissionDetailCard label="Alamat" value={data?.address ?? '-'} className="col-span-2" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Modal open={openModal} setOpen={setOpenModal} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-bold">Konfirmasi</p>
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
