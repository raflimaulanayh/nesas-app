import { DefaultSession } from 'next-auth'

export interface User extends DefaultSession['user'] {
  id?: string
  username?: string | null
  email?: string | null
  photo?: string | null
  role: string | null
  active: boolean | null
  accountComplete?: boolean | null
}

// Declare module next-auth untuk menggabungkan definisi User yang baru
declare module 'next-auth' {
  interface User extends DefaultSession['user'] {
    id?: string
    username?: string | null
    email?: string | null
    photo?: string | null
    role: string | null
    active: boolean | null
    accountComplete?: boolean | null
  }
}
