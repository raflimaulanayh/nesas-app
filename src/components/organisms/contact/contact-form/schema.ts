import { z } from 'zod'

export const formSchema = z.object({
  fullName: z.string().nonempty({
    message: 'Nama Lengkap harus diisi'
  }),
  email: z
    .string()
    .nonempty({
      message: 'Email harus diisi'
    })
    .email({
      message: 'Email tidak valid'
    }),
  phoneNumber: z.string().nonempty({ message: 'Nomor HP. harus diisi' }),
  subject: z.optional(z.string().nonempty({ message: 'Subjek harus diisi' })),
  message: z.string().nonempty({ message: 'Pesan harus diisi' })
})

export const defaultValues = {
  fullName: '',
  email: '',
  phoneNumber: '',
  subject: '',
  message: ''
}
