import { z } from 'zod'

export const ClassSchema = z.object({
  name: z.string().nonempty({
    message: 'Nama kelas harus diisi'
  }),
  major_id: z.string().nonempty({
    message: 'Jurusan harus diisi'
  })
})

export const defaultValues = {
  name: '',
  major_id: ''
}
