interface TUser {
  data: {
    username?: string
    email: string
    password: string
    role: string
    accountComplete?: boolean
    active?: boolean
    photo?: string
    createdAt?: string
  }[]
}

interface User {
  username?: string
  email: string
  password: string
  role: string
  accountComplete?: boolean
  active?: boolean
  photo?: string
  createdAt?: string
}

export type { User, TUser }
