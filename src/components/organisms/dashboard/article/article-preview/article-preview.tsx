/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useHydration } from '@/hooks/use-hydration'
import api from '@/services/api'
import { CalendarRange, CheckSquare, InfoIcon } from 'lucide-react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import useSWR from 'swr'
import { Params } from 'types/data/params'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Heading } from '@/components/atoms/heading'
import { Modal } from '@/components/atoms/modal'
import { SkeletonAction } from '@/components/atoms/skeleton-action'
import { Button } from '@/components/atoms/ui/button'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import { toast } from '@/components/atoms/ui/use-toast'

import { formatTime } from '@/lib/utils/format-time'

export const ArticlePreview = ({ params }: Params) => {
  const [openModalStatus, setOpenModalStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data: article, isLoading: loadArticle, mutate: mutateArticles } = useSWR(`/articles/${params.id}`)
  const data = article?.data
  const isHydrated = useHydration()
  const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/article', label: 'Kelola Artikel' },
    { label: 'Preview Artikel' }
  ]

  async function onSubmitStatus() {
    setLoading(true)

    const body = {
      status: 'public'
    }

    try {
      await api.put(`/articles/${params.id}`, body)
      mutateArticles()
      toast({ title: 'Artikel berhasil disetujui!' })
    } catch (error) {
      console.error('Error deleting news:', error)
      toast({ title: 'Artikel gagal disetujui!', variant: 'destructive' })
    } finally {
      setLoading(false)
      setOpenModalStatus(false)
    }
  }

  return (
    <Fragment>
      {!isHydrated && <SkeletonAction />}
      {isHydrated && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Heading url="/dashboard/article" text="Tambah Artikel" />
          </div>
          {!loadArticle && (
            <Fragment>
              <header className="flex flex-wrap justify-between mb-4 space-y-4 gap-x-5 lg:items-center">
                <div>
                  <h2 className="text-xl font-semibold lg:text-2xl">{data?.title}</h2>
                  <span className="flex items-center gap-2 text-sm text-slate-800">
                    <CalendarRange size={20} />
                    {formatTime(data?.publishAt)}
                  </span>
                </div>

                {data?.status == 'pending' && (
                  <Button
                    onClick={() => setOpenModalStatus(true)}
                    disabled={loading}
                    className="space-x-1 text-white bg-primary"
                  >
                    <CheckSquare size={20} />
                    <span>Setujui</span>
                  </Button>
                )}
              </header>
              <section className="relative flex flex-col items-start gap-10 lg:flex-row">
                <article className="w-full">
                  <Image
                    alt="Photo Article"
                    src={data?.picture ?? '/static/images/article-dummy.jpg'}
                    className="object-cover object-center w-full rounded-md h-52 sm:h-64 lg:h-96"
                    width={1000}
                    height={500}
                  />

                  <div className="container-markdown">
                    <article
                      className="relative text-justify py-5 !max-w-full"
                      dangerouslySetInnerHTML={{ __html: data?.content }}
                    />
                  </div>

                  {data?.keyword && (
                    <div className="mb-5 space-y-3">
                      <h2 className="font-medium text-slate-900">Keywords :</h2>
                      <ul className="flex items-center gap-2">
                        {data?.keyword.split(',').map((key: any) => (
                          <li
                            className="p-2 text-sm font-medium border rounded-md hover:bg-opacity-80 bg-slate-200"
                            key={Math.random() + 1}
                          >
                            {key}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </section>
            </Fragment>
          )}
          {loadArticle && (
            <Fragment>
              <div className="space-y-3">
                <Skeleton className="h-10 w-52" />
                <Skeleton className="w-7/12 h-14" />
                <Skeleton className="w-64 h-8" />
              </div>
              <Skeleton className="w-full my-3 h-[50vh]" />
            </Fragment>
          )}
        </div>
      )}

      <Modal open={openModalStatus} setOpen={setOpenModalStatus} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-semibold">Konfirmasi</p>
        <p>Kamu yakin ingin menyetujui?</p>
        <Button className="w-full h-auto py-3 rounded-full bg-primary hover:bg-secondary-blue" onClick={onSubmitStatus}>
          Ya, Setujui
        </Button>
        <Button
          className="w-full h-auto py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
          onClick={() => setOpenModalStatus(false)}
        >
          Tidak, Cancel
        </Button>
      </Modal>
    </Fragment>
  )
}
