import 'next-auth'

declare module 'next-auth' {
  interface User {
    jwt: string
    user: {
      id: string
      email: string
      username: string
      password: string
      photo: string
      confirmed: boolean
      role: 'admin' | 'student' | 'teacher'
      accountComplete: boolean
    }
  }

  interface Session {
    jwt: string
    user: User['user']
  }
}
