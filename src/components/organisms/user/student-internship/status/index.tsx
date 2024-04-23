'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import moment from 'moment'
import React from 'react'
import { IoMdDocument } from 'react-icons/io'
import { RxCheck } from 'react-icons/rx'
import useSWR from 'swr'

import { Button } from '@/components/atoms/ui/button'

import { cn } from '@/lib/utils'

export const InternshipStatus = () => {
  const user = useCurrentUser()
  const { data: students } = useSWR('/students')
  const data = students?.data?.find((item: { user_id: string }) => item?.user_id == user?.id)

  const statusPKL = data?.internship?.status ?? 'not_started'
  const startDate = moment(data?.internship?.start_date)
  const endDate = moment(data?.internship?.end_date)

  const formattedStartDate = startDate.format('D MMMM YYYY')
  const formattedEndDate = endDate.format('D MMMM YYYY')
  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`

  const guideBook: string | null = 'https://utfs.io/f/c7e724b4-f172-473b-9029-8cf692327d18-1el5u7.pdf'
  const certificatePKL =
    'https://d20ohkaloyme4g.cloudfront.net/img/document_thumbnails/5d259d9da5b269822245e334f949c649/thumb_1200_848.png'
  const suratPengajuan = 'https://imgv2-1-f.scribdassets.com/img/document/536150722/original/310b7bc5a4/1713194174?v=1'

  return (
    <div className="space-y-7">
      <Button
        disabled={!guideBook || guideBook === ''}
        onClick={() => window.open(guideBook, '_blank')}
        size="sm"
        className="text-xs"
      >
        Buku panduan PKL
      </Button>
      <ul role="list">
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn(
                    statusPKL === 'pending' ||
                      statusPKL === 'approved' ||
                      statusPKL === 'interviewing' ||
                      statusPKL === 'getted_kuota' ||
                      statusPKL === 'ongoing' ||
                      statusPKL === 'completed' ||
                      statusPKL === 'sidang_completed'
                      ? 'bg-green-500'
                      : 'bg-gray-400',
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                  )}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p
                    className={cn(
                      statusPKL === 'pending' ||
                        statusPKL === 'approved' ||
                        statusPKL === 'interviewing' ||
                        statusPKL === 'getted_kuota' ||
                        statusPKL === 'ongoing' ||
                        statusPKL === 'completed' ||
                        statusPKL === 'sidang_completed'
                        ? 'text-slate-900'
                        : 'text-slate-400',
                      'text-sm'
                    )}
                  >
                    Memilih tempat PKL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn(
                    statusPKL === 'approved' ||
                      statusPKL === 'interviewing' ||
                      statusPKL === 'getted_kuota' ||
                      statusPKL === 'ongoing' ||
                      statusPKL === 'completed' ||
                      statusPKL === 'sidang_completed'
                      ? 'bg-green-500'
                      : 'bg-gray-400',
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                  )}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p
                    className={cn(
                      statusPKL === 'approved' ||
                        statusPKL === 'interviewing' ||
                        statusPKL === 'getted_kuota' ||
                        statusPKL === 'ongoing' ||
                        statusPKL === 'completed' ||
                        statusPKL === 'sidang_completed'
                        ? 'text-slate-900'
                        : 'text-slate-400',
                      'text-sm'
                    )}
                  >
                    Sesi Interview (Sekolah)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn(
                    statusPKL === 'approved' ||
                      statusPKL === 'getted_kuota' ||
                      statusPKL === 'ongoing' ||
                      statusPKL === 'completed' ||
                      statusPKL === 'sidang_completed'
                      ? 'bg-green-500'
                      : 'bg-gray-400',
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                  )}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p
                    className={cn(
                      statusPKL === 'approved' ||
                        statusPKL === 'getted_kuota' ||
                        statusPKL === 'ongoing' ||
                        statusPKL === 'completed' ||
                        statusPKL === 'sidang_completed'
                        ? 'text-slate-900'
                        : 'text-slate-400',
                      'text-sm flex items-center flex-wrap gap-2'
                    )}
                  >
                    <span>Pengajuan ke tempat PKL</span>
                    <Button onClick={() => window.open(suratPengajuan, '_blank')} size="sm" className="space-x-1 text-xs">
                      <IoMdDocument size={16} />
                      <span>Lihat</span>
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn(
                    statusPKL === 'getted_kuota' ||
                      statusPKL === 'ongoing' ||
                      statusPKL === 'completed' ||
                      statusPKL === 'sidang_completed'
                      ? 'bg-green-500'
                      : 'bg-gray-400',
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                  )}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p
                    className={cn(
                      statusPKL === 'getted_kuota' ||
                        statusPKL === 'ongoing' ||
                        statusPKL === 'completed' ||
                        statusPKL === 'sidang_completed'
                        ? 'text-slate-900'
                        : 'text-slate-400',
                      'text-sm'
                    )}
                  >
                    Mendapatkan Kuota di tempat PKL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn(
                    statusPKL === 'ongoing' || statusPKL === 'completed' || statusPKL === 'sidang_completed'
                      ? 'bg-green-500'
                      : 'bg-gray-400',
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                  )}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p
                    className={cn(
                      statusPKL === 'ongoing' || statusPKL === 'completed' || statusPKL === 'sidang_completed'
                        ? 'text-slate-900'
                        : 'text-slate-400',
                      'text-sm'
                    )}
                  >
                    Sedang dalam proses PKL (estimasi: {formattedDateRange}){' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-400" aria-hidden="true" />
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn(
                    statusPKL === 'sidang_completed' ? 'bg-green-500' : 'bg-gray-400',
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                  )}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className={cn(statusPKL === 'sidang_completed' ? 'text-slate-900' : 'text-slate-400', 'text-sm')}>
                    Sidang PKL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="relative pb-8">
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={cn(
                    statusPKL === 'sidang_completed' ? 'bg-green-500' : 'bg-gray-400',
                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                  )}
                >
                  <RxCheck className="w-5 h-5 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className={cn(statusPKL === 'sidang_completed' ? 'text-slate-900' : 'text-slate-400', 'text-sm')}>
                    PKL Selesai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {statusPKL == 'sidang_completed' && (
        <Button onClick={() => window.open(certificatePKL, '_blank')} size="sm" className="text-xs">
          Unduh Sertifikat PKL
        </Button>
      )}
    </div>
  )
}
