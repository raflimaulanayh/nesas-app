import { z } from 'zod'

export const formSchema = z.object({
  username: z.string().nonempty({ message: 'Username harus diisi' }),
  email: z
    .string()
    .nonempty({
      message: 'Email harus diisi'
    })
    .email({
      message: 'Email tidak valid'
    }),
  password: z
    .string()
    .nonempty({
      message: 'Password harus diisi'
    })
    .min(6, {
      message: 'Password minimal 6 karakter'
    })
})
