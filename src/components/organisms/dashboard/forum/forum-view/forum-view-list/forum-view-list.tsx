/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api'
import { InfoIcon, MessageCircle, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Loading } from '@/components/atoms/icons'
import { Modal } from '@/components/atoms/modal'
import { Button } from '@/components/atoms/ui/button'
import { Input } from '@/components/atoms/ui/input'
import { toast } from '@/components/atoms/ui/use-toast'
import { ForumCard } from '@/components/molecules/card/forum-card'

export const ForumViewList = ({ dataForums, mutateForums }: any) => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forumId, setForumId] = useState<string>()
  const [searchQuery, setSearchQuery] = useState('')

  async function onSubmit() {
    setLoading(true)
    try {
      const response = await api.delete(`/forums/${forumId}`)
      if (response.status == 200) {
        mutateForums()
        toast({ title: 'Forum berhasil dihapus!' })
      }
    } catch (error) {
      console.error('Error deleting forum:', error)
      toast({ title: 'Forum gagal dihapus!', variant: 'destructive' })
    } finally {
      setLoading(false)
      setOpenModal(false)
    }
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  let filteredForums = dataForums

  if (dataForums) {
    filteredForums = dataForums.filter((item: any) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between w-full">
        <div className="w-auto">
          <Input
            placeholder="Cari forum..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="text-sm h-9 w-[150px] lg:w-[250px] rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <Link
            href="/dashboard/forum/create"
            className="flex items-center w-full px-3 text-sm font-semibold leading-6 text-center text-white bg-indigo-600 rounded-md shadow-sm h-9 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Tambah forum
          </Link>
        </div>
      </div>
      <div>
        {filteredForums == undefined && <p>Data kosong...</p>}
        {filteredForums?.length == 0 && <p>Data kosong...</p>}

        {filteredForums?.length !== 0 && (
          <article className="grid gap-4 py-5 sm:grid-cols-2">
            {filteredForums?.map((item: any) => (
              <ForumCard
                key={item.id}
                title={item.title}
                content={item.content}
                user={{ username: item.users.username, picture: item.users.photo }}
                updatedAt={item.updatedAt}
                isManage
                toolbar={
                  <div className="flex items-center gap-3">
                    <button>
                      <Link href={`/dashboard/forum/${item.id}`} className="flex items-center gap-0.5">
                        <span className="sr-only">Jawaban</span>
                        <MessageCircle size={20} />
                        <p className="text-sm">{item.ForumComments.length || 0}</p>
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        setOpenModal(true)
                        setForumId(item.id)
                      }}
                      className="flex items-center text-red-600 gap-0.5"
                    >
                      <span className="sr-only">Hapus</span>
                      <Trash2Icon size={20} />
                    </button>
                  </div>
                }
              />
            ))}
          </article>
        )}
      </div>
      <Modal open={openModal} setOpen={setOpenModal} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-semibold">Konfirmasi</p>
        <p>Kamu yakin ingin menghapus?</p>
        <Button
          disabled={loading}
          className="w-full h-auto py-3 rounded-full bg-primary hover:bg-secondary-blue"
          onClick={onSubmit}
        >
          {loading ? <Loading /> : 'Ya, Hapus'}
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
