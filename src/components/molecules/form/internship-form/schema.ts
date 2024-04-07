import { z } from 'zod'

export interface OptionProps {
  label: string
  value: string
  checked?: boolean
  other?: string
}

enum InternshipStatus {
  not_started = 'not_started',
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  canceled = 'canceled',
  ongoing = 'ongoing',
  completed = 'completed'
}

export const formSchema = z.object({
  company_id: z.string().nonempty({
    message: 'Perusahaan harus diisi'
  }),
  students: z.string().nonempty({
    message: 'Siswa harus diisi'
  }),
  start_date: z.string().nonempty({
    message: 'Tanggal mulai harus diisi'
  }),
  end_date: z.string().nonempty({
    message: 'Tanggal berakhir harus diisi'
  }),
  status: z.nativeEnum(InternshipStatus)
})

interface Internship {
  company_id: string
  students: ''
  start_date?: string
  end_date?: string
  status?: InternshipStatus
}

export const defaultValues: Internship = {
  company_id: '',
  students: '',
  start_date: '',
  end_date: '',
  status: undefined
}
