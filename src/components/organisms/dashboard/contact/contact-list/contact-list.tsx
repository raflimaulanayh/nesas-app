'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHydration } from '@/hooks/use-hydration'
import api from '@/services/api'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { InfoIcon, ReplyIcon, Trash2Icon } from 'lucide-react'
import { Fragment, useState } from 'react'
import useSWR from 'swr'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Modal } from '@/components/atoms/modal'
import { Button } from '@/components/atoms/ui/button'
import { Popover, PopoverContent } from '@/components/atoms/ui/popover'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import { toast } from '@/components/atoms/ui/use-toast'

import { cn } from '@/lib/utils'

export const ContactList = () => {
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [contactId, setContactId] = useState<string>()
  const isHydrated = useHydration()
  const { data: contacts, isLoading: contactsLoading, mutate: mutateContacts } = useSWR('/contacts')
  const dataContacts = contacts?.data === undefined ? [{}] : contacts.data

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Kelola Kontak' }]

  async function onSubmit() {
    setLoading(true)
    try {
      await api.delete(`/contacts/${contactId}`)
      mutateContacts()
      toast({ title: 'Kontak berhasil dihapus!' })
    } catch (error) {
      console.error('Error deleting news:', error)
      toast({ title: 'Kontak gagal dihapus!', variant: 'destructive' })
    } finally {
      setLoading(false)
      setOpenModal(false)
    }
  }

  return (
    <Fragment>
      {!isHydrated && (
        <div className="space-y-3">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-10 w-52" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
          </div>
        </div>
      )}
      {isHydrated && (
        <div className="space-y-7">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="view" className="py-5 space-y-4">
              <TabsList>
                <TabsTrigger value="view">Kelola Kontak</TabsTrigger>
              </TabsList>

              <TabsContent value="view">
                {contactsLoading && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Skeleton className="w-full h-40" />
                    <Skeleton className="w-full h-40" />
                  </div>
                )}
                {!contactsLoading && (
                  <section className="grid gap-5 sm:grid-cols-2">
                    {dataContacts?.map((item: any) => (
                      <div
                        key={item.id}
                        className={cn(
                          loading && 'opacity-70',
                          'relative w-full p-4 border rounded-md shadow-md text-slate-600 hover:shadow-lg'
                        )}
                      >
                        <ul>
                          <li>
                            <span className="font-medium text-slate-900">Nama Lengkap :</span> {item?.fullName ?? '-'}
                          </li>
                          <li>
                            <span className="font-medium text-slate-900">Email :</span> {item?.email ?? '-'}
                          </li>
                          <li>
                            <span className="font-medium text-slate-900">No. HP :</span> {item?.phoneNumber ?? '-'}
                          </li>
                          <li>
                            <span className="font-medium text-slate-900">Subjek :</span> {item?.subject ?? '-'}
                          </li>
                          <li>
                            <span className="font-medium text-slate-900">Pesan :</span> {item?.message ?? '-'}
                          </li>
                        </ul>

                        <div className="absolute flex items-center gap-2 right-3 bottom-3">
                          <Popover>
                            <PopoverTrigger>
                              <button aria-label="Button Delete" className="text-primary">
                                <ReplyIcon size={24} />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <ul className="-m-2 space-y-1 text-center text-slate-900">
                                <li className="rounded-sm px-4 py-0.5 bg-primary text-white">
                                  <a target="_blank" href={`mailto:${item.email}`}>
                                    Email
                                  </a>
                                </li>
                                <li className="rounded-sm p-0.5 gap-1 bg-primary text-white">
                                  <a target="_blank" href={`https://wa.me/${item.phoneNumber.replace('0', '62')}`}>
                                    No. HP
                                  </a>
                                </li>
                              </ul>
                            </PopoverContent>
                          </Popover>
                          <button
                            onClick={() => {
                              setOpenModal(true)
                              setContactId(item.id)
                            }}
                            aria-label="Button Delete"
                            className="text-red-600"
                          >
                            <Trash2Icon size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </section>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
    </Fragment>
  )
}
