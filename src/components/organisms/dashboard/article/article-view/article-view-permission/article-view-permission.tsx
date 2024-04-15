/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api'
import { InfoIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Modal } from '@/components/atoms/modal'
import { Button } from '@/components/atoms/ui/button'
import { Input } from '@/components/atoms/ui/input'
import { toast } from '@/components/atoms/ui/use-toast'
import { ArticleManageCard } from '@/components/molecules/card/article-manage-card'

export const ArticleViewPermission = ({ dataArticles, mutateArticles }: any) => {
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalStatus, setOpenModalStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [articleId, setArticleId] = useState<string>()
  const [searchQuery, setSearchQuery] = useState('')

  async function onSubmit() {
    setLoading(true)
    try {
      const response = await api.delete(`/articles/${articleId}`)
      if (response.status === 200) {
        mutateArticles()
        toast({ title: 'Atikel berhasil dihapus!' })
      }
    } catch (error) {
      console.error('Error deleting news:', error)
      toast({ title: 'Artikel gagal dihapus!', variant: 'destructive' })
    } finally {
      setLoading(false)
      setOpenModalDelete(false)
    }
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  let filteredArticles = dataArticles

  if (dataArticles) {
    filteredArticles = dataArticles.filter((item: any) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  async function onSubmitStatus() {
    setLoading(true)

    const body = {
      status: 'public'
    }

    try {
      await api.put(`/articles/${articleId}`, body)
      mutateArticles()
      toast({ title: 'Atikel berhasil disetujui!' })
    } catch (error) {
      console.error('Error deleting news:', error)
      toast({ title: 'Artikel gagal disetujui!', variant: 'destructive' })
    } finally {
      setLoading(false)
      setOpenModalStatus(false)
    }
  }

  return (
    <section className="space-y-2">
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
            href="/dashboard/article/create"
            className="flex items-center w-full px-3 text-sm font-semibold leading-6 text-center text-white bg-indigo-600 rounded-md shadow-sm h-9 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Tambah artikel
          </Link>
        </div>
      </div>
      <div>
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
                urlDetail={`/dashboard/article/${item.id}`}
                urlEdit={`/dashboard/article/update/${item.id}`}
                loading={loading}
                handleDelete={() => {
                  setOpenModalDelete(true)
                  setArticleId(item.id)
                }}
                handlePermission={() => {
                  setOpenModalStatus(true)
                  setArticleId(item.id)
                }}
                permission
              />
            ))}
          </article>
        )}
      </div>
      <Modal open={openModalDelete} setOpen={setOpenModalDelete} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-semibold">Konfirmasi</p>
        <p>Kamu yakin ingin menghapus?</p>
        <Button className="w-full h-auto py-3 rounded-full bg-primary hover:bg-secondary-blue" onClick={onSubmit}>
          Ya, Hapus
        </Button>
        <Button
          className="w-full h-auto py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
          onClick={() => setOpenModalDelete(false)}
        >
          Tidak, Cancel
        </Button>
      </Modal>

      <Modal open={openModalStatus} setOpen={setOpenModalStatus} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-semibold">Konfirmasi</p>
        <p>Kamu yakin ingin menyetujui?</p>
        <Button className="w-full h-auto py-3 rounded-full bg-primary hover:bg-secondary-blue" onClick={onSubmitStatus}>
          Ya, Setujui
        </Button>
        <Button
          className="w-full h-auto py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
          onClick={() => setOpenModalStatus(false)}
        >
          Tidak, Cancel
        </Button>
      </Modal>
    </section>
  )
}
