/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { InfoIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { PiArrowLeftBold } from 'react-icons/pi'
import useSWR from 'swr'

import { Modal } from '@/components/atoms/modal'
import { Button } from '@/components/atoms/ui/button'
import { Input } from '@/components/atoms/ui/input'
import { toast } from '@/components/atoms/ui/use-toast'
import { ArticleManageCard } from '@/components/molecules/card/article-manage-card'
import Container from '@/components/templates/container/container'

export const ArticleList = () => {
  const user = useCurrentUser()
  const { data: articles, mutate: mutateArticles } = useSWR('/articles')
  const dataArticles = articles?.data ?? [{}]

  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [articleId, setArticleId] = useState<string>()
  const [searchQuery, setSearchQuery] = useState('')

  async function onSubmit() {
    setLoading(true)
    try {
      await api.delete(`/articles/${articleId}`)
      mutateArticles()
      toast({ title: 'Atikel berhasil dihapus!' })
    } catch (error) {
      console.error('Error deleting news:', error)
      toast({ title: 'Artikel gagal dihapus!', variant: 'destructive' })
    } finally {
      setLoading(false)
      setOpenModal(false)
    }
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  let filteredArticles = dataArticles

  if (dataArticles) {
    filteredArticles = dataArticles.filter(
      (item: any) => item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) && item.user_id === user?.id
    )
  }

  return (
    <div className="rounded-3xl pt-7 lg:py-10 relative -mt-32 bg-white overflow-y-auto pb-32 min-h-[70vh]">
      <Container className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Link href="/student" className="flex items-center gap-2">
            <PiArrowLeftBold size={25} />
            <h2 className="text-lg font-semibold text-slate-900">Menu Artikel</h2>
          </Link>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="w-auto">
            <Input
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="text-sm h-9 w-[150px] lg:w-[250px] rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <Link
              href="/student/article/create"
              className="flex items-center w-full px-3 text-sm font-semibold leading-6 text-center text-white bg-indigo-600 rounded-md shadow-sm h-9 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Tambah artikel
            </Link>
          </div>
        </div>

        <article>
          {filteredArticles == undefined && <p>Data kosong...</p>}
          {filteredArticles?.length == 0 && <p>Data kosong...</p>}

          {filteredArticles?.length !== 0 && (
            <article className="grid gap-4 py-5 sm:grid-cols-2">
              {filteredArticles?.map((item: any) => (
                <ArticleManageCard
                  key={item.id}
                  title={item.title}
                  picture={item.picture}
                  status={item.status}
                  updatedAt={item.updatedAt}
                  urlDetail={`/student/article/${item.id}`}
                  urlEdit={`/student/article/update/${item.id}`}
                  loading={loading}
                  handleDelete={() => {
                    setOpenModal(true)
                    setArticleId(item.id)
                  }}
                />
              ))}
            </article>
          )}
        </article>
        <Modal open={openModal} setOpen={setOpenModal} className="flex flex-col">
          <InfoIcon />
          <p className="text-xl font-bold">Konfirmasi</p>
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
    </div>
  )
}
