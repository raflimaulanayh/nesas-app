'use server'

import bcrypt from 'bcryptjs'
import { NewPasswordSchema } from 'schemas'
import * as z from 'zod'

import prisma from '@/lib/utils/prisma'

import { getPasswordResetTokenByToken } from '../prisma/password-reset-token'
import { getUserByEmail } from '../prisma/user'

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
  if (!token) {
    return { error: 'Missing token!' }
  }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid token!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Token has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.users.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword }
  })

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id }
  })

  return { success: 'Password updated!' }
}
