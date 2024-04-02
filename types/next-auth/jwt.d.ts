import 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string
    user: {
      username: string
      role: 'admin' | 'student' | 'teacher' | 'finance' | 'hubinmas' | 'copywritter'
      photo?: string
      emailVerified?: string
      active?: boolean
      accountComplete?: boolean
      isOAuth: boolean
    }
  }
}
