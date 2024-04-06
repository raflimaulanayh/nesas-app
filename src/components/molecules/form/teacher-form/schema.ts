import { z } from 'zod'

enum Genders {
  male = 'male',
  female = 'female'
}

export interface OptionProps {
  label: string
  value: string
  checked?: boolean
  other?: string
}

export const formSchema = z.object({
  nip: z.optional(z.string()),
  name: z.string().nonempty({
    message: 'Nama harus diisi'
  }),
  gender: z.nativeEnum(Genders),
  birth_date: z.optional(z.string().nonempty({ message: 'Tanggal lahir harus diisi' })),
  phone_number: z.optional(
    z
      .string()
      .nonempty({ message: 'No. HP harus diisi' })
      .regex(/^[0-9]+$/)
      .min(10)
  ),
  address: z.optional(z.string().nonempty({ message: 'Alamat harus diisi' })),
  join_date: z.optional(z.string()),
  end_date: z.optional(z.string()),
  user_id: z.optional(z.string())
})

export const defaultValues = {
  nip: '',
  name: ''
}
