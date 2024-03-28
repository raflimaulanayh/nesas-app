import { Genders } from './gender'

interface TTeacher {
  data: {
    id?: string
    nip?: string
    name: string
    gender?: Genders
    birth_date?: string
    phone_number?: string
    address?: string
    join_date?: string
    end_date?: string
    user_id?: string
    ujikomIds?: string[]
    teacherPostionIds?: string[]
  }[]
}

interface Teacher {
  id?: string
  nip?: string
  name: string
  gender?: Genders
  birth_date?: string
  phone_number?: string
  address?: string
  join_date?: string
  end_date?: string
  user_id?: string
  ujikomIds?: string[]
  teacherPostionIds?: string[]
}

export type { Teacher, TTeacher }
