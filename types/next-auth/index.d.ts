import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  username: string
  role: 'admin' | 'student' | 'teacher'
  photo?: string
  active?: boolean
  isOAuth: boolean
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}
