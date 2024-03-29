import { toast } from '@/hooks/use-toast'
import api from '@/services/api'
import { useSession } from 'next-auth/react'

import { TrackUserActivity } from './user-activity'

export const handleDelete = async (idsToDelete: string[], apiEndpoint: string): Promise<void> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession()

  try {
    await Promise.all(
      idsToDelete.map(async (id) => {
        try {
          const response = await api.delete(`${apiEndpoint}/${id}`)
          if (response.status === 200) {
            toast({
              title: 'Berhasil!',
              description: `Data berhasil dihapus.`,
              variant: 'default'
            })
            TrackUserActivity(session?.user?.id ?? '', 'delete', 'Melakukan delete beberapa atau semua data')
          } else {
            throw new Error(`Gagal menghapus data.`)
          }
        } catch (error: any) {
          let errorMessage = 'Terjadi kesalahan saat menghapus data.'
          if (error.response && error.response.status === 404) {
            errorMessage = 'Data tidak ditemukan.'
          }
          toast({
            title: 'Gagal!',
            description: errorMessage,
            variant: 'destructive'
          })
          console.error('Error deleting data:', error)
        }
      })
    )
  } catch (error: any) {
    console.error('Error deleting data:', error)
  }
}

export const handleModalDelete = async (
  rowSelection: Record<string, boolean>,
  setAlertDelete: React.Dispatch<React.SetStateAction<boolean>>,
  apiEndpoint: string
): Promise<void> => {
  const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id])
  setAlertDelete(true)
  await handleDelete(selectedIds, apiEndpoint)
}
