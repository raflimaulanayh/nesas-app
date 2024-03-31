/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt'
import { User } from 'types/data/user'

import prisma from '@/lib/utils/prisma'

export const createUser = async (data: User) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    if (data.email) {
      const existingEmail = await prisma.users.findUnique({
        where: { email: data.email }
      })

      if (existingEmail) {
        throw new Error('Email is already taken.')
      }
    }

    const result = await prisma.users.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        role: data.role,
        active: data.active,
        photo: data.photo
      },
      include: {
        teachers: true,
        students: true
      }
    })

    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email
      }
    })

    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}
