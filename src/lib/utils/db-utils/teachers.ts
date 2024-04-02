/* eslint-disable @typescript-eslint/no-explicit-any */
import { Teacher } from 'types/data/teacher'

import prisma from '@/lib/utils/prisma'

export const createTeacher = async (data: Teacher) => {
  try {
    const teacherPostionIds = data.teacherPostionIds || []
    const ujikomIds = data.ujikomIds || []

    const teacherPositions = await prisma.educationalPositions.findMany({
      where: {
        id: { in: teacherPostionIds }
      }
    })

    if (teacherPositions.length !== teacherPostionIds.length) {
      throw new Error('One or more teacher positions not found')
    }

    const ujikoms = await prisma.ujikoms.findMany({
      where: {
        id: { in: teacherPostionIds }
      }
    })

    if (ujikoms.length !== ujikomIds.length) {
      throw new Error('One or more ujikoms not found')
    }

    if (data.nip) {
      const existingNip = await prisma.teachers.findUnique({
        where: { nip: data.nip }
      })

      if (existingNip) {
        throw new Error('NIP is already taken.')
      }
    }

    const existingUserStudent = await prisma.students.findUnique({
      where: { user_id: data.user_id }
    })

    const existingUserTeacher = await prisma.teachers.findUnique({
      where: { user_id: data.user_id }
    })

    if (existingUserStudent || existingUserTeacher) {
      throw new Error('User is already taken.')
    }

    const result = await prisma.teachers.create({
      data: {
        nip: data.nip,
        user_id: data.user_id,
        name: data.name,
        gender: data.gender,
        teacherPositions: { connect: teacherPositions.map((permission: { id: string }) => ({ id: permission.id })) },
        ujikoms: { connect: ujikoms.map((ujikom: { id: string }) => ({ id: ujikom.id })) },
        birth_date: data.birth_date,
        phone_number: data.phone_number,
        address: data.address,
        join_date: data.join_date,
        end_date: data.end_date
      },
      include: {
        teacherPositions: true,
        ujikoms: true
      }
    })

    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}
