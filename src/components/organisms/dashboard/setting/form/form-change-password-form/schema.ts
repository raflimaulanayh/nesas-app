import { z } from 'zod'

export const ChangePasswordSchema = z
  .object({
    current_password: z
      .string()
      .nonempty({
        message: 'Password saat ini harus diisi'
      })
      .min(6, {
        message: 'Password minimal 6 karakter'
      }),
    password: z
      .string()
      .nonempty({
        message: 'Password harus diisi'
      })
      .min(6, {
        message: 'Password minimal 6 karakter'
      }),
    password_confirmation: z
      .string()
      .nonempty({
        message: 'Konfirmasi Password harus diisi'
      })
      .min(6, {
        message: 'Password minimal 6 karakter'
      })
  })
  .refine(
    (values) => {
      return values.password === values.password_confirmation
    },
    {
      message: 'Password dan Konfirmasi Password tidak sama',
      path: ['password_confirmation']
    }
  )

export const defaultValues = {
  password: ''
}
