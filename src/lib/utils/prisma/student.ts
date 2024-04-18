import prisma from '@/lib/utils/prisma'

export const getStudentByNIS = async (nis: string) => {
  try {
    const student = await prisma.students.findUnique({ where: { nis } })

    return student
  } catch {
    return null
  }
}

export const getStudentByNISN = async (nisn: string) => {
  try {
    const student = await prisma.students.findUnique({ where: { nisn } })

    return student
  } catch {
    return null
  }
}
