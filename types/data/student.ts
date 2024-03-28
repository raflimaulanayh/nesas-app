import { Genders } from './gender'

enum GraduateStatus {
  ongoing = 'ongoing',
  graduated = 'graduated',
  dropout = 'dropout',
  transferred = 'transferred'
}

interface TStudent {
  data: {
    id?: string
    nis: string
    nisn?: string
    name: string
    gender?: Genders
    class_id?: string
    birth_date?: string
    phone_number?: string
    phone_number_parent?: string
    address?: string
    join_date?: string
    end_date?: string
    graduate_status?: GraduateStatus
    internship_id?: string
    ujikom_id?: string
    user_id?: string
    paymentIds?: string[]
    absentIds?: string[]
  }[]
}

interface Student {
  id?: string
  nis: string
  nisn?: string
  name: string
  gender?: Genders
  class_id?: string
  birth_date?: string
  phone_number?: string
  phone_number_parent?: string
  address?: string
  join_date?: string
  end_date?: string
  graduate_status?: GraduateStatus
  internship_id?: string
  ujikom_id?: string
  user_id?: string
  paymentIds?: string[]
  absentIds?: string[]
}

export type { Student, TStudent }
