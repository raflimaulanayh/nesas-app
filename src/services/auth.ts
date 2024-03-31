// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { compare } from 'bcrypt'
// import type { NextAuthOptions } from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'

// import prisma from '@/lib/utils/prisma-client'

// import api from './api'

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: 'credentials',
//       name: 'User Credentials Login',
//       credentials: {
//         identifier: { label: 'Identifier', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials: Record<'identifier' | 'password', string> | undefined): Promise<any | null> {
//         if (!credentials) {
//           throw new Error('Credentials are missing')
//         }

//         try {
//           const user = await prisma.users.findFirst({
//             where: {
//               email: credentials?.identifier
//             }
//           })

//           if (!user) {
//             throw new Error('User not found')
//           }

//           const isPasswordValid = await compare(credentials.password, user.password)

//           if (!isPasswordValid) {
//             throw new Error('Invalid password')
//           }

//           return {
//             id: user.id,
//             email: user.email,
//             password: user.password,
//             role_id: user.role_id,
//             username: user.username,
//             photo: user.photo
//           }
//         } catch (error: any) {
//           console.error('Authorization error:', error.message) // Print error message

//           return null
//         }
//       }
//     })
//   ],
//   secret: process.env.NEXTAUTH_SECRET ?? '1234567890',

//   session: {
//     strategy: 'jwt',
//     maxAge: 1 * 24 * 60 * 60, // 3 days
//     updateAge: 24 * 60 * 60 // 24 hours
//   },

//   pages: {
//     signIn: '/auth/login',
//     signOut: '/auth/login'
//   },

//   callbacks: {
//     async signIn({ user }) {
//       if (user) {
//         return true
//       } else {
//         return false
//       }
//     },
//     async redirect({ baseUrl }) {
//       return baseUrl
//     },
//     async session({ session, token }) {
//       if (token?.user) {
//         session.user = token.user
//         session.jwt = token.jwt
//       }

//       return session
//     },
//     async jwt({ token, user, account }) {
//       const isSignIn = !!user
//       if (account?.type === 'credentials') {
//         token.user = user

//         return token
//       }
//       if (isSignIn) {
//         const data = await api
//           .get(`/auth/${account?.provider}/callback?access_token=${account?.access_token}`)
//           .then(({ data }: any) => data)
//           .catch((e: any) => e.response?.data ?? e.message) // Catch specific errors
//         if (data?.statusCode === 400) {
//           throw new Error(JSON.stringify(data))
//         }
//         token.user = data?.user
//         token.jwt = data?.jwt
//         token.email = data?.email
//         token.name = data?.user?.username
//       }

//       return token
//     }
//   },

//   events: {},

//   theme: {
//     colorScheme: 'light'
//   },

//   debug: false
// }
