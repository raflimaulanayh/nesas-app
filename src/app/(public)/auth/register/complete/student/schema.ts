import { z } from 'zod'

enum Genders {
  male = 'male',
  female = 'female'
}

export const formSchema = z.object({
  nis: z.string().nonempty({
    message: 'NIS harus diisi'
  }),
  nisn: z.string().nonempty({
    message: 'NISN harus diisi'
  }),
  name: z.string().nonempty({
    message: 'Nama Harus diisi'
  }),
  gender: z.optional(z.nativeEnum(Genders)),
  phone_number: z.optional(z.string()),
  address: z.optional(z.string()),
  birth_date: z.optional(z.string()),
  join_date: z.optional(z.string()),
  end_date: z.optional(z.string())
})
