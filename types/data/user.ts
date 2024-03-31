interface TUser {
  data: {
    username?: string
    email: string
    password: string
    role: string
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
  active?: boolean
  photo?: string
  createdAt?: string
}

export type { User, TUser }
