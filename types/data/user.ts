/* eslint-disable @typescript-eslint/no-explicit-any */
interface TUser {
  data: {
    username?: string
    email: string
    password: string
    role: string
    accountComplete?: boolean
    active?: any
    photo?: any
    createdAt?: string
  }[]
}

interface User {
  username?: string
  email: string
  password: string
  role: string
  accountComplete?: boolean
  active?: any
  photo?: any
  createdAt?: string
}

export type { User, TUser }
