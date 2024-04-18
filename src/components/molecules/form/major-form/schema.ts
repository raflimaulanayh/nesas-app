import { z } from 'zod'

export const MajorSchema = z.object({
  long_name: z.string().nonempty({
    message: 'Nama Lengkap harus diisi'
  }),
  short_name: z.string().nonempty({
    message: 'Singkatan nama harus diisi'
  }),
  logo: z.optional(
    z.array(
      z.object({
        url: z.string()
      })
    )
  )
})

export const defaultValues = {
  long_name: '',
  short_name: '',
  logo: []
}
