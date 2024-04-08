/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api'
import { Trash2Icon, EditIcon, InfoIcon, EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Modal } from '@/components/atoms/modal'
import { Button } from '@/components/atoms/ui/button'
import { Input } from '@/components/atoms/ui/input'
import { toast } from '@/components/atoms/ui/use-toast'

import { cn } from '@/lib/utils'
import { formatArticleStatus } from '@/lib/utils/format-article-status'
import { formatDate } from '@/lib/utils/format-date'

export const ArticleViewPermission = ({ dataArticles, mutateArticles }: any) => {
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
    filteredArticles = dataArticles.filter((item: any) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
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
              <figure
                key={item.id}
                className={cn(
                  loading && 'opacity-50',
                  'relative flex items-center w-full gap-5 p-3 transition-all border rounded-md shadow-sm group hover:shadow-md'
                )}
              >
                <Image
                  src={item.picture ?? '/static/images/article-dummy.jpg'}
                  alt={'Picture' + (item.title ?? 'Artikel')}
                  width={200}
                  height={200}
                  className="object-cover transition-all rounded-sm w-28 h-28 group-hover:scale-105"
                />
                <figcaption>
                  <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-primary text-slate-900">
                    {item.title}
                  </h2>
                  <span className="text-sm text-slate-700">{formatDate(item.updatedAt)}</span>
                </figcaption>
                <span
                  className={cn(
                    'absolute p-1.5 text-xs font-medium rounded-sm left-3 top-3',
                    formatArticleStatus(item.status).customCSS
                  )}
                >
                  {formatArticleStatus(item.status).statusShow}
                </span>
                <div className="absolute flex items-center gap-2 right-3 bottom-3">
                  <Link aria-label="Button See Detail" href={`/dashboard/article/${item.id}`} className="text-primary">
                    <EyeIcon size={23} />
                  </Link>
                  <Link aria-label="Button Edit" href={`/dashboard/article/update/${item.id}`} className="text-primary">
                    <EditIcon size={20} />
                  </Link>
                  <button
                    onClick={() => {
                      setOpenModal(true)
                      setArticleId(item.id)
                    }}
                    aria-label="Button Delete"
                    className="text-red-600"
                  >
                    <Trash2Icon size={20} />
                  </button>
                </div>
              </figure>
            ))}
          </article>
        )}
      </div>
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
    </section>
  )
}
