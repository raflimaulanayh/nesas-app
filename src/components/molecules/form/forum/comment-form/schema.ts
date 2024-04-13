import { z } from 'zod'

export const formSchema = z.object({
  content: z.string().nonempty({
    message: 'Jawaban harus diisi'
  })
})

export const defaultValues = {
  content: ''
}
