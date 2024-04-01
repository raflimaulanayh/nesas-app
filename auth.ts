import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from 'auth.config'
import NextAuth from 'next-auth'
import { getAccountByUserId } from 'src/lib/utils/prisma/account'
import { getUserById } from 'src/lib/utils/prisma/user'

import prisma from '@/lib/utils/prisma'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events: {
    async linkAccount({ user }) {
      await prisma.users.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id || '')

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'admin' | 'student' | 'teacher' | 'finance' | 'hubinmas' | 'copywritter'
      }

      if (token.active) {
        session.user.active = token.active as boolean
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email || ''
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.username = existingUser.username
      token.email = existingUser.email
      token.role = existingUser.role
      token.active = existingUser.active
      token.accountComplete = existingUser.accountComplete
      token.photo = existingUser.photo

      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig
})
