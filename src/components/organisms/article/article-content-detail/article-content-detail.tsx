'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarRange } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import useSWR from 'swr'
import { Params } from 'types/data/params'

import { Heading } from '@/components/atoms/heading'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import { SocialShare } from '@/components/molecules/social-share'
import Container from '@/components/templates/container/container'

import { formatDate } from '@/lib/utils/format-date'
import { formatTime } from '@/lib/utils/format-time'

export const ArticleContentDetail = ({ params }: Params) => {
  const { data: article, isLoading: loadArticle } = useSWR(`/articles/slug/${params.slug}`)
  const { data: articles } = useSWR(`/articles`)
  const data = article?.data

  const recommendArticle = articles?.data?.filter((item: any) => item.slug !== params.slug && item.status === 'public')

  return (
    <Container className="py-10">
      {!loadArticle && (
        <Fragment>
          <header className="mb-4 space-y-4 lg:w-9/12">
            <Heading text="Kembali" url="/article" />

            <h2 className="text-xl font-semibold lg:text-2xl">{data?.title}</h2>
            <span className="flex items-center gap-2 text-sm text-slate-800">
              <CalendarRange size={20} />
              {formatTime(data?.publishAt)}
            </span>
          </header>
          <section className="relative flex flex-col items-start gap-10 lg:flex-row">
            <article className="lg:w-9/12">
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

              <SocialShare title={data?.title} />
            </article>

            <article className="w-full space-y-3 lg:w-3/12">
              <h2 className="pb-3 font-medium text-slate-900">Artikel lainnya</h2>
              {recommendArticle?.map((item: any) => (
                <Link key={item.id} href={`/article/${item.slug}`} className="hover:bg-slate-100 group">
                  <figure className="flex items-center gap-3 p-5 border rounded-md shadow-sm hover:shadow-lg border-b-slate-300">
                    <Image
                      src={item.picture || '/static/images/article-dummy.jpg'}
                      alt={item.title + ' Picture'}
                      height={100}
                      width={100}
                      className="object-cover object-center h-24 overflow-hidden transition-all duration-300 rounded-lg group-hover:scale-105"
                    />
                    <figcaption className="w-8/12 space-y-1 ">
                      <h3 className="font-semibold text-slate-900 group-hover:text-primary line-clamp-2">{item.title}</h3>
                      <span className="text-sm text-gray-700">{formatDate(item.updatedAt)}</span>
                    </figcaption>
                  </figure>
                </Link>
              ))}
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
    </Container>
  )
}
