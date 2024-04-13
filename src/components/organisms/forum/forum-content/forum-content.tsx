'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentUser } from '@/hooks/use-current-user'
import { useState } from 'react'
import useSWR from 'swr'

import { Button } from '@/components/atoms/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/atoms/ui/dialog'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import { ForumCard } from '@/components/molecules/card/forum-card'
import { ForumForm } from '@/components/molecules/form/forum/forum-form'
import Container from '@/components/templates/container/container'

export const ForumContent = () => {
  const user = useCurrentUser()
  const [openForm, setOpenForm] = useState(false)
  const { data: forums, isLoading: loadAForums, mutate: mutateForums } = useSWR('/forums')
  const filtered = forums?.data?.filter((item: any) => item.status == 'public')
  const sortedForums = filtered?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  return (
    <Container className="py-14">
      {!loadAForums && (
        <section className="space-y-7">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-medium sm:text-3xl">Forum</h1>
            {user && (
              <Button onClick={() => setOpenForm(true)} className="bg-primary">
                Buat Forum
              </Button>
            )}
          </header>
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
          <div className="flex items-center justify-between">
            <Skeleton className="w-48 h-10" />
            <Skeleton className="w-32 h-10" />
          </div>
          <article className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-52" />
          </article>
        </div>
      )}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent
          handleClose={() => setOpenForm(false)}
          className="w-11/12 pb-20 h-[90vh] overflow-y-auto mx-auto rounded-md"
        >
          <DialogHeader className="text-left">
            <DialogTitle className="mb-3 text-2xl font-medium tracking-wider text-primary">Buat Forum</DialogTitle>
          </DialogHeader>
          <ForumForm
            user_id={user?.id || '123'}
            mutate={{
              forum: mutateForums
            }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  )
}
