/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

import { Skeleton } from '@/components/atoms/ui/skeleton'
import Container from '@/components/templates/container/container'

import { formatDate } from '@/lib/utils/format-date'

export const LandingArticle = () => {
  const { data: articles, isLoading: loadArticles } = useSWR('/articles')

  const filtered = articles?.data?.filter((item: any) => item.status == 'public')
  const sortedArticles = filtered?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return (
    <section className="py-10">
      <Container className="space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-medium sm:text-3xl text-slate-900">Artikel Utama</h2>
          <Link href="/article" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            <span>Lihat artikel lainnya</span>
            <ChevronRight size={20} />
          </Link>
        </header>

        {!loadArticles && (
          <article className="grid gap-x-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedArticles?.slice(0, 6).map((item: any) => (
              <Link key={item.id} href={`/article/${item.slug}`} className="hover:bg-slate-100 group">
                <figure className="flex items-center gap-3 py-5 border-b rounded lg:px-5 border-b-slate-300">
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
        )}
        {loadArticles && (
          <div className="grid gap-4 hover:bg-slate-100 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="w-full h-36" />
            <Skeleton className="w-full h-36" />
            <Skeleton className="w-full h-36" />
          </div>
        )}
      </Container>
    </section>
  )
}
