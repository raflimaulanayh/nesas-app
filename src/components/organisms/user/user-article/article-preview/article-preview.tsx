/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { CalendarRange } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { PiArrowLeftBold } from 'react-icons/pi'
import useSWR from 'swr'
import { Params } from 'types/data/params'

import { Skeleton } from '@/components/atoms/ui/skeleton'
import Container from '@/components/templates/container/container'

import { formatTime } from '@/lib/utils/format-time'

export const ArticlePreview = ({ params }: Params) => {
  const { data: article, isLoading: loadArticle } = useSWR(`/articles/${params.id}`)
  const data = article?.data

  return (
    <div className="rounded-3xl pt-7 lg:py-10 relative -mt-32 bg-white overflow-y-auto pb-32 min-h-[70vh]">
      <Container className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Link href="/student/article" className="flex items-center gap-2">
            <PiArrowLeftBold size={25} />
            <h2 className="text-lg font-semibold text-slate-900">Preview Artikel</h2>
          </Link>
        </div>
        <div>
          {!loadArticle && (
            <Fragment>
              <header className="mb-4 space-y-4 lg:w-9/12">
                <h2 className="text-xl font-semibold lg:text-2xl">{data?.title}</h2>
                <span className="flex items-center gap-2 text-sm text-slate-800">
                  <CalendarRange size={20} />
                  {formatTime(data?.publishAt)}
                </span>
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
      </Container>
    </div>
  )
}
