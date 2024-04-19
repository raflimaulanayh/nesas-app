'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import useSWR from 'swr'

import { Skeleton } from '@/components/atoms/ui/skeleton'
import { ForumCard } from '@/components/molecules/card/forum-card'
import Container from '@/components/templates/container/container'

export const LandingForum = () => {
  const { data: forums, isLoading: loadForums } = useSWR('/forums')

  const filtered = forums?.data?.filter((item: any) => item.status == 'public')
  const sortedForums = filtered?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  if (sortedForums?.length !== 0) {
    return (
      <section className="py-10">
        <Container className="space-y-4">
          <header className="flex items-center justify-between">
            <h2 className="text-2xl font-medium sm:text-3xl text-slate-900">Forum</h2>
            <Link href="/forum" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
              <span>Lihat forum lainnya</span>
              <ChevronRight size={20} />
            </Link>
          </header>

          {!loadForums && (
            <article className="grid gap-5 sm:grid-cols-2">
              {sortedForums
                ?.slice(0, 4)
                .map((item: any) => (
                  <ForumCard
                    key={item.id}
                    url={`/forum/${item.slug}`}
                    title={item.title}
                    content={item.content}
                    user={{ username: item.users.username, picture: item.users.photo }}
                    updatedAt={item.updatedAt}
                    commentCount={item.ForumComments.length || 0}
                  />
                ))}
            </article>
          )}
          {loadForums && (
            <div className="grid gap-4 hover:bg-slate-100 lg:grid-cols-2">
              <Skeleton className="w-full h-36" />
              <Skeleton className="w-full h-36" />
              <Skeleton className="w-full h-36" />
            </div>
          )}
        </Container>
      </section>
    )
  }

  return null
}
