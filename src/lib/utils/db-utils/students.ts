/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from 'types/data/student'

import prisma from '@/lib/utils/prisma'

export const createStudent = async (data: Student) => {
  try {
    if (data.nis || data.nisn) {
      const existingNis = await prisma.students.findUnique({
        where: { nis: data.nis }
      })

      const existingNisn = await prisma.students.findUnique({
        where: { nisn: data.nisn }
      })

      if (existingNis || existingNisn) {
        throw new Error('NIS or NISN is already taken.')
      }
    }

    const result = await prisma.students.create({
      data: {
        nis: data.nis,
        nisn: data.nisn,
        user_id: data.user_id || '',
        name: data.name,
        gender: data.gender,
        class_id: data.class_id,
        graduate_status: data.graduate_status,
        birth_date: data.birth_date,
        phone_number: data.phone_number,
        phone_number_parent: data.phone_number_parent,
        address: data.address,
        join_date: data.join_date,
        end_date: data.end_date,
        internship_id: data.internship_id,
        ujikom_id: data.ujikom_id
      },
      include: {
        payments: true,
        absents: true
      }
    })

    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}
