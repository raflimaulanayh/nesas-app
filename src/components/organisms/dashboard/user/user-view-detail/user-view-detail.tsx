/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHydration } from '@/hooks/use-hydration'
import { InfoIcon, ScanLine, UserCheck, UserMinus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
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
import { updateStatusUser } from '@/lib/utils/actions/update-status-user'
import { formatDate } from '@/lib/utils/format-date'
import { formatTime } from '@/lib/utils/format-time'

export const UserViewDetail = ({ params }: Params) => {
  const [openModal, setOpenModal] = useState(false)
  const [approved, setApproved] = useState(false)
  const [loading, setLoading] = useState(false)
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/user', label: 'Kelola User' },
    { label: 'Detail User' }
  ]

  const { data: users, isLoading: loadUsers, mutate: mutateUser } = useSWR(`/users/${params.id}`)
  const { data: classes } = useSWR('/classes')
  const data = users?.data

  const student = data?.students[0]
  const dataClass = classes?.data?.find((item: any) => item.id == student?.class_id)

  const teacher = data?.teachers[0]

  async function onSubmitStatus() {
    setLoading(true)

    const body = {
      id: data?.id,
      email: data?.email,
      role: data?.role,
      data_id: teacher ? teacher?.id : student?.id
    }
    try {
      const response = await updateStatusUser(body, approved)
      if (response?.success) {
        toast({
          title: response?.success
        })

        if (response?.redirectUrl) {
          window.location.href = response?.redirectUrl
        }
        mutateUser()
        console.log(response.success)
      } else {
        toast({
          title: response?.error,
          variant: 'destructive'
        })
        console.error(response.error)
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  const handleSubmit = () => {
    onSubmitStatus()
    setOpenModal(false)
  }

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <header className="flex flex-col space-y-4">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/user" text="Detail User" />
          </header>

          {loadUsers && (
            <div className="flex justify-center items-center w-full h-[50vh]">
              <Loading className="w-10 h-10 text-primary" />
            </div>
          )}

          {!loadUsers && (
            <div className="flex flex-col min-h-screen mx-auto mt-40 mb-24 space-y-6">
              <div className="flex flex-col space-y-4 border border-gray-300 rounded p-7">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">
                      Tanggal dibuat: {data?.createdAt ? formatTime(data.createdAt) : '-'}{' '}
                    </span>
                    <div className="flex items-center gap-x-1">
                      <span
                        className={cn(
                          'capitalize rounded-md px-3 py-1.5 text-sm font-medium border',
                          data?.active == false
                            ? 'bg-red-50 text-red-600 border-red-600'
                            : 'bg-green-100 text-green-600 border-green-600'
                        )}
                      >
                        {data?.active == false ? 'Meminta perizinan' : 'Aktif' ?? '-'}
                      </span>
                    </div>
                  </div>

                  {data?.active == false && (
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => {
                          setOpenModal(true)
                          setApproved(true)
                        }}
                        disabled={loading}
                        className="space-x-1 text-white bg-primary"
                      >
                        <UserCheck size={20} />
                        <span>Setujui</span>
                      </Button>

                      <Button
                        onClick={() => {
                          setOpenModal(true)
                          setApproved(false)
                        }}
                        disabled={loading}
                        className="space-x-1 text-white bg-red-600"
                      >
                        <UserMinus size={20} />
                        <span>Tolak</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full p-8 space-y-3 bg-white border border-gray-200 rounded">
                <h2 className="text-lg font-medium">Informasi Akun</h2>
                <div className="grid grid-cols-2 gap-3">
                  <UserDetailCardSubmissionDetailCard label="Username" value={data?.username ?? '-'} />
                  <UserDetailCardSubmissionDetailCard label="Email" value={data?.email ?? '-'} />
                  <UserDetailCardSubmissionDetailCard label="Role" value={data?.role} className="capitalize" />
                  {student?.proof && (
                    <UserDetailCardSubmissionDetailCard
                      label="Bukti"
                      value={
                        <Link href={student.proof} target="_blank">
                          <Image
                            src={student.proof}
                            alt="Foto Bukti"
                            width={150}
                            height={150}
                            className="object-contain mt-1 rounded-md"
                          />
                        </Link>
                      }
                    />
                  )}

                  {teacher?.proof && (
                    <UserDetailCardSubmissionDetailCard
                      label="Bukti"
                      value={
                        <Link href={teacher.proof} target="_blank">
                          <div className="relative h-auto mt-2 hover:opacity-80 w-52">
                            <ScanLine className="absolute z-20 p-1 text-white rounded-md h-7 w-7 bg-primary top-2 left-2" />
                            <Image
                              src={teacher.proof}
                              alt="Foto Bukti"
                              width={150}
                              height={150}
                              className="object-contain rounded-md"
                            />
                          </div>
                        </Link>
                      }
                    />
                  )}
                </div>
              </div>

              {student && (
                <div className="flex flex-col w-full p-8 space-y-3 bg-white border border-gray-200 rounded">
                  <h2 className="text-lg font-medium">Informasi Siswa</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <UserDetailCardSubmissionDetailCard label="NIS" value={student?.nis ?? '-'} />
                    <UserDetailCardSubmissionDetailCard label="NISN" value={student?.nisn ?? '-'} />
                    <UserDetailCardSubmissionDetailCard label="Nama Lengkap" value={student?.name ?? '-'} />
                    <UserDetailCardSubmissionDetailCard
                      label="Jenis Kelamin"
                      value={student?.gender == 'male' ? 'Laki-laki' : 'Perempuan' ?? '-'}
                    />
                    <UserDetailCardSubmissionDetailCard label="Kelas" value={dataClass?.name ?? '-'} />
                    <UserDetailCardSubmissionDetailCard
                      label="Tanggal Lahir"
                      value={student?.birth_date ? formatDate(student?.birth_date) : '-'}
                    />
                    <UserDetailCardSubmissionDetailCard label="No. HP" value={student?.phone_number ?? '-'} />
                    <UserDetailCardSubmissionDetailCard
                      label="No. HP (Orang tua / wali)"
                      value={student?.phone_number_parent ?? '-'}
                    />
                    <UserDetailCardSubmissionDetailCard
                      label="Status sekolah"
                      value={student?.graduate_status ?? '-'}
                      className="capitalize"
                    />
                    <UserDetailCardSubmissionDetailCard label="Alamat" value={student?.address ?? '-'} />
                    <UserDetailCardSubmissionDetailCard
                      label="Tanggal bergabung"
                      value={student?.join_date ? formatDate(student?.join_date) : '-'}
                    />
                    <UserDetailCardSubmissionDetailCard
                      label="Tanggal keluar"
                      value={student?.end_date ? formatDate(student?.end_date) : '-'}
                    />
                  </div>
                </div>
              )}

              {teacher && (
                <div className="flex flex-col w-full p-8 space-y-3 bg-white border border-gray-200 rounded">
                  <h2 className="text-lg font-medium">Informasi Guru</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <UserDetailCardSubmissionDetailCard label="NIP" value={teacher?.nip ?? '-'} />
                    <UserDetailCardSubmissionDetailCard label="Nama Lengkap" value={teacher?.name ?? '-'} />
                    <UserDetailCardSubmissionDetailCard
                      label="Jenis Kelamin"
                      value={teacher?.gender == 'male' ? 'Laki-laki' : 'Perempuan' ?? '-'}
                    />
                    <UserDetailCardSubmissionDetailCard label="Tanggal Lahir" value={teacher?.birth_date ?? '-'} />
                    <UserDetailCardSubmissionDetailCard label="No. HP" value={teacher?.phone_number ?? '-'} />
                    <UserDetailCardSubmissionDetailCard label="Alamat" value={teacher?.address ?? '-'} />
                    <UserDetailCardSubmissionDetailCard
                      label="Tanggal bergabung"
                      value={teacher?.join_date ? formatDate(teacher?.join_date) : '-'}
                    />
                    <UserDetailCardSubmissionDetailCard
                      label="Tanggal keluar"
                      value={teacher?.end_date ? formatDate(teacher?.end_date) : '-'}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <Modal open={openModal} setOpen={setOpenModal} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-semibold">Konfirmasi</p>
        <p>Kamu yakin ingin {approved ? 'menyetujui' : 'menolak'}?</p>
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
