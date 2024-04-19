'use server'

import { signIn } from 'auth'
import { AuthError } from 'next-auth'
import { DEFAULT_LOGIN_REDIRECT } from 'route'
import { LoginSchema } from 'schemas'
import * as z from 'zod'

import { sendVerificationEmail } from '../mail'
import { getUserByEmail } from '../prisma/user'
import { generateVerificationToken } from '../token'
import { TrackUserActivity } from './user-activity'

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials!' }
  }

  if (!existingUser.emailVerified) {
    if (existingUser.role === 'student') {
      const verificationToken = await generateVerificationToken(existingUser.email)
      await sendVerificationEmail(verificationToken.email, verificationToken.token)

      return { success: 'Email konfirmasi telah dikirim. Silakan periksa email Anda!' }
    }

    return { error: 'Akun Anda sedang dalam proses verifikasi!' }
  }

  try {
    const { role } = existingUser

    let redirectTo: string

    if (existingUser.accountComplete !== null || existingUser.accountComplete !== false) {
      if (role === 'admin') {
        redirectTo = '/dashboard'
      } else if (role === 'operator') {
        redirectTo = '/dashboard'
      } else if (role === 'student') {
        redirectTo = '/student'
      } else if (role === 'teacher') {
        redirectTo = '/teacher'
      } else {
        redirectTo = callbackUrl || DEFAULT_LOGIN_REDIRECT
      }
    } else {
      redirectTo = '/auth/login'
    }

    TrackUserActivity(email, 'signin', 'Melakukan login')

    await signIn('credentials', {
      email,
      password,
      redirectTo: redirectTo
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
