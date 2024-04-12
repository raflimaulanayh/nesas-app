/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
// import useSWR from 'swr'

import { ForumCard } from '@/components/molecules/card/forum-card'
import Container from '@/components/templates/container/container'

export const LandingForum = () => {
  //   const { data: articles, isLoading: loadArticles } = useSWR('/articles')

  //   const filtered = articles?.data?.filter((item: any) => item.status == 'public')
  //   const sortedArticles = filtered?.sort((a: any, b: any) => {
  //     return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  //   })

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

        <article className="grid gap-x-5 sm:grid-cols-2">
          <ForumCard
            url="/forum/bagaimana-mehadirkan-forum"
            title="Bagaimana Menghadirkan Forum Format yang Efektif dalam Konteks Pendidikan?"
            content="Forum format telah menjadi sarana yang tak tergantikan dalam memperkaya pengalaman belajar di lingkungan pendidikan. Dalam upaya meningkatkan keterlibatan siswa dan membangun komunitas pembelajaran yang kuat, menyelenggarakan forum yang efektif sangatlah penting. Bagaimana kita bisa menciptakan forum yang produktif, interaktif, dan memotivasi? Bagikan ide, pengalaman, dan praktik terbaik Anda di sini!"
            user={{ username: 'raflimaulana', picture: '/static/icons/user.svg' }}
            updatedAt="2024-04-09T05:30:48.192Z"
            commentCount={0}
          />
          <ForumCard
            url="/forum/bagaimana-mehadirkan-forum"
            title="Bagaimana Menghadirkan Forum Format yang Efektif dalam Konteks Pendidikan?"
            content="Forum format telah menjadi sarana yang tak tergantikan dalam memperkaya pengalaman belajar di lingkungan pendidikan. Dalam upaya meningkatkan keterlibatan siswa dan membangun komunitas pembelajaran yang kuat, menyelenggarakan forum yang efektif sangatlah penting. Bagaimana kita bisa menciptakan forum yang produktif, interaktif, dan memotivasi? Bagikan ide, pengalaman, dan praktik terbaik Anda di sini!"
            user={{ username: 'raflimaulana', picture: '/static/icons/user.svg' }}
            updatedAt="2024-04-09T05:30:48.192Z"
            commentCount={0}
          />
          <ForumCard
            url="/forum/bagaimana-mehadirkan-forum"
            title="Bagaimana Menghadirkan Forum Format yang Efektif dalam Konteks Pendidikan?"
            content="Forum format telah menjadi sarana yang tak tergantikan dalam memperkaya pengalaman belajar di lingkungan pendidikan. Dalam upaya meningkatkan keterlibatan siswa dan membangun komunitas pembelajaran yang kuat, menyelenggarakan forum yang efektif sangatlah penting. Bagaimana kita bisa menciptakan forum yang produktif, interaktif, dan memotivasi? Bagikan ide, pengalaman, dan praktik terbaik Anda di sini!"
            user={{ username: 'raflimaulana', picture: '/static/icons/user.svg' }}
            updatedAt="2024-04-09T05:30:48.192Z"
            commentCount={0}
          />
          <ForumCard
            url="/forum/bagaimana-mehadirkan-forum"
            title="Bagaimana Menghadirkan Forum Format yang Efektif dalam Konteks Pendidikan?"
            content="Forum format telah menjadi sarana yang tak tergantikan dalam memperkaya pengalaman belajar di lingkungan pendidikan. Dalam upaya meningkatkan keterlibatan siswa dan membangun komunitas pembelajaran yang kuat, menyelenggarakan forum yang efektif sangatlah penting. Bagaimana kita bisa menciptakan forum yang produktif, interaktif, dan memotivasi? Bagikan ide, pengalaman, dan praktik terbaik Anda di sini!"
            user={{ username: 'raflimaulana', picture: '/static/icons/user.svg' }}
            updatedAt="2024-04-09T05:30:48.192Z"
            commentCount={0}
          />
        </article>
        {/* {loadForums && (
          <div className="grid gap-4 hover:bg-slate-100 lg:grid-cols-2">
            <Skeleton className="w-full h-36" />
            <Skeleton className="w-full h-36" />
            <Skeleton className="w-full h-36" />
          </div>
        )} */}
      </Container>
    </section>
  )
}
