/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ujikom } from 'types/data/ujikom'

import prisma from '@/lib/utils/prisma'

export const createUjikom = async (data: Ujikom) => {
  try {
    const result = await prisma.ujikoms.create({
      data: {
        project_name: data.project_name,
        project_design: data.project_design,
        room_number: data.room_number,
        status: data.status,
        exam_date: data.exam_date
      },
      include: {
        students: true,
        teachers: true
      }
    })

    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}
