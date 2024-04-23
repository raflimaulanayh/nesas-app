/* eslint-disable @typescript-eslint/no-explicit-any */
import { Internship } from 'types/data/internship'

import prisma from '@/lib/utils/prisma'

export const createInternship = async (internship: Internship) => {
  // Memeriksa apakah company_id yang diberikan valid
  if (internship.company_id) {
    const existingCompanyId = await prisma.companyInternships.findUnique({
      where: { id: internship.company_id }
    })
    if (!existingCompanyId) {
      throw new Error('Company not found')
    }
  }

  try {
    // Membuat internship baru
    let students: { id: string }[] = []
    if (internship.students && internship.students.length > 0) {
      students = internship.students.map((studentId: string) => ({ id: studentId }))
    }

    const result = await prisma.internships.create({
      data: {
        company_id: internship.company_id,
        start_date: internship.start_date,
        end_date: internship.end_date,
        status: internship.status,
        students: { connect: students }
      },
      include: {
        students: true
      }
    })

    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}
