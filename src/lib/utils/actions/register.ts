'use server'

import bcrypt from 'bcryptjs'
import { RegisterSchema } from 'schemas'
import * as z from 'zod'

import { sendVerificationEmail } from '../mail'
import prisma from '../prisma'
import { getUserByEmail } from '../prisma/user'
import { generateVerificationToken } from '../token'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, username } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Create account successful please check email for verification.' }
}
