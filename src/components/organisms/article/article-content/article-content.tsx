'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

import { Skeleton } from '@/components/atoms/ui/skeleton'
import Container from '@/components/templates/container/container'

import { formatDate } from '@/lib/utils/format-date'

export const ArticleContent = () => {
  const { data: articles, isLoading: loadArticles } = useSWR('/articles')
  const filtered = articles?.data?.filter((item: any) => item.status == 'public')

  return (
    <Container className="py-14">
      {!loadArticles && (
        <section className="space-y-4">
          <h1 className="text-2xl font-medium sm:text-3xl">Artikel</h1>
          <article className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered?.map((item: any) => (
              <Link key={item.id} href={`article/${item.slug}`}>
                <figure className="relative w-full rounded-md shadow-md hover:shadow-lg group">
                  <span className="absolute top-0 left-0 z-10 p-1.5 text-xs text-white rounded-md bg-primary">
                    {formatDate(item.updatedAt)}
                  </span>
                  <div className="relative w-full h-40 overflow-hidden rounded-t-md">
                    <Image
                      src={item.picture ?? '/static/images/article-dummy.jpg'}
                      alt={item.title + ' Picture'}
                      fill
                      objectFit="cover"
                      className="transition-all rounded-t-md group-hover:scale-105 group-hover:opacity-80"
                    />
                  </div>
                  <figcaption className="w-full h-40 p-4 text-lg font-medium text-slate-800 rounded-b-md">
                    <h2 className="line-clamp-3">{item.title}</h2>
                  </figcaption>

                  <button className="absolute p-3 text-white rounded-full bg-primary right-3 bottom-3">
                    <ArrowRight size={20} />
                  </button>
                </figure>
              </Link>
            ))}
          </article>
        </section>
      )}

      {loadArticles && (
        <div className="space-y-4">
          <Skeleton className="h-10 w-52" />
          <article className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="w-full h-72" />
            <Skeleton className="w-full h-72" />
            <Skeleton className="w-full h-72" />
            <Skeleton className="w-full h-72" />
            <Skeleton className="w-full h-72" />
            <Skeleton className="w-full h-72" />
            <Skeleton className="w-full h-72" />
            <Skeleton className="w-full h-72" />
          </article>
        </div>
      )}
    </Container>
  )
}
