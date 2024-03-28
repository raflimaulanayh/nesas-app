/* eslint-disable @typescript-eslint/no-explicit-any */
import { Absent } from 'types/data/absent'

import prisma from '@/lib/utils/prisma-client'

export const createAbsent = async (absent: Absent) => {
  if (absent.student_id) {
    const existingStudentId = await prisma.students.findUnique({
      where: { id: absent.student_id }
    })

    if (!existingStudentId) {
      throw new Error('Student not found')
    }
  }

  try {
    const result = await prisma.absents.create({
      data: {
        student_id: absent.student_id,
        status: absent.status
      }
    })

    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}
