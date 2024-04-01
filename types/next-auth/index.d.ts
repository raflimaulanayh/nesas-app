import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  username: string
  role: 'admin' | 'student' | 'teacher' | 'finance' | 'hubinmas' | 'copywritter'
  photo?: string
  emailVerified?: string
  active?: boolean
  accountComplete?: boolean
  isOAuth: boolean
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}
