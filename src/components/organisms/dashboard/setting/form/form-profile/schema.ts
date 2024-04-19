import { z } from 'zod'

export const ProfileSchema = z.object({
  username: z.string().nonempty({
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
  photo: z.optional(
    z.array(
      z.object({
        url: z.string()
      })
    )
  )
})

export const defaultValues = {
  username: '',
  email: '',
  photo: []
}
