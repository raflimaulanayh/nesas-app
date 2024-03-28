/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRole } from 'types/data/user-role'

import prisma from '@/lib/utils/prisma-client'

export const createUserRole = async (data: UserRole) => {
  try {
    if (data.name) {
      const existingName = await prisma.userRoles.findUnique({
        where: { name: data.name }
      })

      if (existingName) {
        throw new Error('Role is already taken.')
      }
    }

    const result = await prisma.userRoles.create({
      data: {
        name: data.name
      }
    })

    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}
