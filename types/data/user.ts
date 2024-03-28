interface TUser {
  data: {
    username?: string
    email: string
    password: string
    role_id: string
    photo?: string
    createdAt?: string
  }[]
}

interface User {
  username?: string
  email: string
  password: string
  role_id: string
  photo?: string
  createdAt?: string
}

export type { User, TUser }
