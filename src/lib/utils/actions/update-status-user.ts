'use server'

import { sendVerificationEmail } from '../mail'
import prisma from '../prisma'
import { generateVerificationToken } from '../token'

export const updateStatusUser = async (
  user: { id: string; email: string; role: string; data_id: string },
  approved: boolean
) => {
  const body = {
    active: true
  }

  try {
    if (approved) {
      // Update status pengguna
      await prisma.users.update({
        where: { id: user.id },
        data: body
      })

      // Kirim email verifikasi
      const verificationToken = await generateVerificationToken(user.email)
      await sendVerificationEmail(user.email, verificationToken.token)

      return { success: 'User berhasil disetujui!' }
    } else {
      // Hapus pengguna
      await prisma.users.delete({
        where: { id: user.id }
      })

      // Menghapus data siswa atau guru terkait
      if (user.data_id !== '' || user.data_id !== undefined) {
        if (user.role === 'student') {
          await prisma.students.delete({
            where: { id: user.data_id }
          })
          console.log('Siswa berhasil dihapus!')
        } else if (user.role === 'teacher') {
          await prisma.teachers.delete({
            where: { id: user.data_id }
          })
          console.log('Guru berhasil dihapus!')
        }
      }

      return { success: 'User berhasil ditolak!', redirectUrl: '/dashboard/user' }
    }
  } catch (error) {
    console.error(error)

    return { error: 'Terjadi kesalahan saat memproses permintaan!' }
  }
}
