import { z } from 'zod'

export const formSchema = z.object({
  title: z.string().nonempty({
    message: 'Judul harus diisi'
  }),
  description: z.string().nonempty({
    message: 'Deskripsi harus diisi'
  }),
  content: z.string().nonempty({
    message: 'Konten harus diisi'
  }),
  category: z.string().nonempty({ message: 'Kategori harus diisi' }),
  writer_name: z.optional(z.string().nonempty({ message: 'Nama penulis harus diisi' })),
  status: z.string().nonempty({ message: 'Status harus diisi' }),
  keyword: z.optional(
    z.string().nonempty({
      message: 'Keyword harus diisi'
    })
  ),
  picture: z.optional(
    z.array(
      z.object({
        url: z.string()
      })
    )
  )
})

export const defaultValues = {
  title: '',
  description: '',
  content: '',
  category: '',
  keyword: '',
  writer_name: '',
  picture: [],
  status: ''
}
