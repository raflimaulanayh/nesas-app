/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/services/api'

import { toast } from '@/components/atoms/ui/use-toast'

const useDelete = async (endpoint: string, rowSelection: { [key: string]: boolean }) => {
  const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id])

  try {
    await Promise.all(
      selectedIds.map(async (id) => {
        try {
          const response = await api.delete(`${endpoint}/${id}`)
          if (response.status === 200) {
            const responseData = response.data
            if (responseData.error && responseData.error.includes('Record to delete does not exist')) {
              throw new Error(`Data tidak ditemukan.`)
            } else {
              toast({
                title: 'Berhasil!',
                description: `Data berhasil dihapus.`,
                variant: 'default'
              })
            }
          } else {
            throw new Error(`Gagal menghapus data.`)
          }
        } catch (error: any) {
          toast({
            title: 'Gagal!',
            description: error.message || 'Terjadi kesalahan saat menghapus data.',
            variant: 'destructive'
          })
          console.error('Error deleting data:', error)
        }
      })
    )
  } catch (error) {
    console.error('Error deleting data:', error)
  }
}

export default useDelete
