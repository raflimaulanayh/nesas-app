import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().nonempty({
    message: 'Judul harus diisi'
  }),
  content: z.string().nonempty({
    message: 'Konten harus diisi'
  }),
  status: z.optional(
    z.string().nonempty({
      message: 'Status harus diisi'
    })
  ),
  keyword: z.optional(
    z.string().nonempty({
      message: 'Keyword harus diisi'
    })
  )
})

export const defaultValues = {
  title: '',
  content: '',
  status: 'public',
  keyword: ''
}
