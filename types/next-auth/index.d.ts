import 'next-auth'

declare module 'next-auth' {
  interface User {
    jwt: string
    user: {
      id: string
      email: string
      username: string
      firstName: string
      confirmed: boolean
      gender: 'male' | 'female'
      middleName: string
      lastName: string
      institution: string
      country: {
        id: number
        name: string
      }
      province: {
        id: number
        name: string
      }
      birthDate: Date | string
      phoneNumber: string
      accountComplete: boolean
    }
  }

  interface Session {
    jwt: string
    user: User['user']
  }
}
