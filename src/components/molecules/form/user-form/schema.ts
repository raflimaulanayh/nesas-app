import { User } from 'types/data/user'
import { z } from 'zod'

export const formSchema = z.object({
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
  role: z.string().nonempty({ message: 'Role harus diisi' }),
  password: z
    .string()
    .nonempty({
      message: 'Password harus diisi'
    })
    .min(6, {
      message: 'Password minimal 6 karakter'
    }),
  active: z.string().nonempty({
    message: 'Status harus diisi'
  }),
  photo: z.optional(
    z.array(
      z.object({
        url: z.string()
      })
    )
  )
})

export const defaultValues: User = {
  username: '',
  email: '',
  role: '',
  password: '',
  active: '',
  photo: []
}
