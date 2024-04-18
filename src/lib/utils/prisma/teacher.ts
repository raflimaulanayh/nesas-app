import prisma from '@/lib/utils/prisma'

export const getTeacherByNIP = async (nip: string) => {
  try {
    const teacher = await prisma.teachers.findUnique({ where: { nip } })

    return teacher
  } catch {
    return null
  }
}
