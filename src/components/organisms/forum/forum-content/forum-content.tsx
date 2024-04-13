'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr'

import { Skeleton } from '@/components/atoms/ui/skeleton'
import { ForumCard } from '@/components/molecules/card/forum-card'
import Container from '@/components/templates/container/container'

export const ForumContent = () => {
  const { data: forums, isLoading: loadAForums } = useSWR('/forums')
  const filtered = forums?.data?.filter((item: any) => item.status == 'public')
  const sortedForums = filtered?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return (
    <Container className="py-14">
      {!loadAForums && (
        <section className="space-y-7">
          <h1 className="text-2xl font-medium sm:text-3xl">Forum</h1>
          <article className="grid gap-4 sm:grid-cols-2">
            {sortedForums?.map((item: any) => (
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
        </section>
      )}

      {loadAForums && (
        <div className="space-y-7">
          <Skeleton className="h-10 w-52" />
          <article className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-52" />
          </article>
        </div>
      )}
    </Container>
  )
}
