'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { InfoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import useSWR from 'swr'
import { Params } from 'types/data/params'

import { Heading } from '@/components/atoms/heading'
import { Modal } from '@/components/atoms/modal'
import { Button } from '@/components/atoms/ui/button'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import { toast } from '@/components/atoms/ui/use-toast'
import { CommentCard } from '@/components/molecules/card/comment-card'
import { CommentForm } from '@/components/molecules/form/forum/comment-form'
import { SocialShare } from '@/components/molecules/social-share'
import Container from '@/components/templates/container/container'

import { formatTime } from '@/lib/utils/format-time'

export const ForumContentDetail = ({ params }: Params) => {
  const user = useCurrentUser()
  console.log(user)
  const { data: forum, isLoading: loadForum, mutate: mutateForum } = useSWR(`/forums/slug/${params.slug}`)
  const { data: comments, isLoading: loadComments, mutate: mutateComment } = useSWR(`/forums/forum-comments`)
  const data = forum?.data

  const getCommentById = (id: string) => {
    const comment = comments?.data?.find((item: { id: string }) => item.id === id)

    return comment
  }

  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [commentId, setCommentId] = useState<string>()

  async function onSubmit() {
    setLoading(true)
    try {
      await api.delete(`/forums/forum-comments/${commentId}`)
      mutateForum()
      toast({ title: 'Atikel berhasil dihapus!' })
    } catch (error) {
      console.error('Error deleting news:', error)
      toast({ title: 'Artikel gagal dihapus!', variant: 'destructive' })
    } finally {
      setLoading(false)
      setOpenModal(false)
    }
  }

  return (
    <Container className="py-10">
      {!loadForum && (
        <Fragment>
          <section className="relative flex flex-col">
            <Heading url="/forum" text="Kembali" />
            <article>
              <figure className="flex flex-col justify-between gap-3 py-5 border-b rounded border-b-slate-300">
                <figcaption>
                  <h2 className="text-lg font-medium text-slate-800 line-clamp-2">{data?.title}</h2>
                </figcaption>
                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-1">
                    <Image
                      src={data?.users.photo || '/static/icons/user.svg'}
                      alt={'User Picture'}
                      height={50}
                      width={50}
                      className="object-cover rounded-full"
                    />
                    <div className="flex flex-col text-sm">
                      <span>{data?.users.username}</span>
                      <span className="text-xs text-slate-700">
                        {formatTime(data?.updatedAt || '2024-04-09T05:30:48.192Z')}
                      </span>
                    </div>
                  </div>
                </div>
              </figure>
              <div className="container-markdown">
                <article
                  className="relative text-justify py-5 !max-w-full"
                  dangerouslySetInnerHTML={{ __html: data?.content }}
                />
              </div>

              <div className="p-4 space-y-4 rounded-md bg-slate-100">
                <h4 className="font-medium text-slate-800"> {data.ForumComments.length || 0} Jawaban :</h4>
                {!loadComments ? (
                  <Fragment>
                    {data.ForumComments.length > 0 ? (
                      <Fragment>
                        {data?.ForumComments?.map((item: any) => (
                          <CommentCard
                            key={item.id}
                            className={loading ? 'opacity-70' : ''}
                            content={item.content}
                            users={{
                              id: getCommentById(item?.id)?.users?.id,
                              username: getCommentById(item?.id)?.users?.username,
                              photo: getCommentById(item?.id)?.users?.photo
                            }}
                            updatedAt={item.updatedAt}
                            deleteAble={user?.id === getCommentById(item?.id)?.users?.id}
                            handleDelete={() => {
                              setOpenModal(true)
                              setCommentId(item.id)
                            }}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <p className="text-primary">Belum ada jawaban atau komentar...</p>
                    )}
                  </Fragment>
                ) : (
                  <Skeleton className="w-full h-20" />
                )}

                {user ? (
                  <CommentForm
                    forum_id={data?.id}
                    user_id={user?.id || ''}
                    mutate={{ forum: mutateForum, comment: mutateComment }}
                  />
                ) : (
                  <div className="flex items-center justify-between gap-5 p-4 text-sm text-white rounded-md lg:text-base bg-primary">
                    <p>Untuk mengirim jawaban silahkan login terlebih dahulu...</p>
                    <Link href="/auth/login" className="px-4 py-1.5 font-semibold rounded-md text-primary bg-white">
                      Login
                    </Link>
                  </div>
                )}
              </div>

              {data?.keyword && (
                <div className="my-5 space-y-3">
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
          </section>
        </Fragment>
      )}
      {loadForum && (
        <Fragment>
          <div className="space-y-3">
            <Skeleton className="h-10 w-52" />
          </div>
          <Skeleton className="w-full my-3 h-[50vh]" />
        </Fragment>
      )}

      <Modal open={openModal} setOpen={setOpenModal} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-semibold">Konfirmasi</p>
        <p>Kamu yakin ingin menghapus?</p>
        <Button className="w-full h-auto py-3 rounded-full bg-primary hover:bg-secondary-blue" onClick={onSubmit}>
          Ya, Hapus
        </Button>
        <Button
          className="w-full h-auto py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
          onClick={() => setOpenModal(false)}
        >
          Tidak, Cancel
        </Button>
      </Modal>
    </Container>
  )
}
