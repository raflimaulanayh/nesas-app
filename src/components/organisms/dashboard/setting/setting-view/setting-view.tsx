'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { useHydration } from '@/hooks/use-hydration'
import api from '@/services/api'
import { InfoIcon } from 'lucide-react'
import { Fragment, useState } from 'react'

import { BreadcrumbResponsive } from '@/components/atoms/breadcrumb-responsive'
import { Modal } from '@/components/atoms/modal'
import { SkeletonDataTable } from '@/components/atoms/skeleton-data-table'
import { Button } from '@/components/atoms/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import { toast } from '@/components/atoms/ui/use-toast'

import { logout } from '@/lib/utils/actions/logout'

import { ChangePasswordForm } from '../form/form-change-password-form'
import { ProfileForm } from '../form/form-profile'

export const SettingView = () => {
  const user = useCurrentUser()
  const isHydrated = useHydration()
  const [modalDelete, setModalDelete] = useState(false)
  const [loading, setLoading] = useState(false)

  const items = [{ href: '/dashboard', label: 'Dashboard' }, { label: 'Setting' }]

  async function handleModal() {
    setLoading(true)

    try {
      const response = await api.delete(`/users/${user?.id}`)
      if (response.status === 200) {
        toast({ title: 'Akun berhasil dihapus!' })
        logout()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toast({ title: 'Akun gagal dihapus!', variant: 'destructive' })
    } finally {
      setLoading(false)
      setModalDelete(false)
    }
  }

  return (
    <Fragment>
      {!isHydrated && <SkeletonDataTable />}
      {isHydrated && (
        <div className="w-full space-y-4 lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <BreadcrumbResponsive items={items} />
            <Tabs defaultValue="profile" className="w-full py-5 space-y-7">
              <TabsList className="w-full">
                <TabsTrigger className="w-full" value="profile">
                  Profil
                </TabsTrigger>
                <TabsTrigger className="w-full" value="password">
                  Ganti Password
                </TabsTrigger>
                <TabsTrigger className="w-full" value="other">
                  Lainnya
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <ProfileForm user={user} />
              </TabsContent>
              <TabsContent value="password">
                <ChangePasswordForm user={user} />
              </TabsContent>
              <TabsContent value="other">
                <div className="space-y-2">
                  <h4 className="text-xl font-medium">Hapus akun</h4>
                  <p className="text-slate-700">
                    Tidak ingin lagi menggunakan layanan Nesas Smart School? Anda dapat menghapus akun Anda di sini. Tindakan
                    ini tidak dapat dibatalkan. Semua informasi terkait akun ini akan dihapus secara permanen.
                  </p>

                  <Button onClick={() => setModalDelete(true)} variant="destructive">
                    Hapus Akun
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      <Modal open={modalDelete} setOpen={setModalDelete} className="flex flex-col">
        <InfoIcon />
        <p className="text-xl font-semibold">Konfirmasi</p>
        <p>Kamu yakin ingin menghapus?</p>
        <Button
          disabled={loading}
          className="w-full h-auto py-3 rounded-full bg-primary hover:bg-secondary-blue"
          onClick={handleModal}
        >
          Ya, Hapus
        </Button>
        <Button
          className="w-full h-auto py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
          onClick={() => setModalDelete(false)}
        >
          Tidak, Cancel
        </Button>
      </Modal>
    </Fragment>
  )
}
