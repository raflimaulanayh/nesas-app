// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use server'

// import prisma from '../prisma'

// enum InternshipStatus {
//   not_started = 'not_started',
//   pending = 'pending',
//   approved = 'approved',
//   interviewing = 'interviewing',
//   getted_kuota = 'getted_kuota',
//   rejected = 'rejected',
//   canceled = 'canceled',
//   dropoff_completed = 'dropoff_completed',
//   pickup_completed = 'pickup_completed',
//   ongoing = 'ongoing',
//   completed = 'completed',
//   sidang_completed = 'sidang_completed'
// }

// export const updateStatusInternship = async (internship: { id: string; status: InternshipStatus }) => {
//   try {
//     if (internship.status === 'approved') {
//       // Update status pengguna
//       await prisma.internships.update({
//         where: { id: internship.id },
//         data: {
//           status: status
//         }
//       })

//       return { success: 'PKL berhasil disetujui!' }
//     } else {
//       await prisma.internships.delete({
//         where: { id: internship.id }
//       })

//       return { success: 'PKL berhasil ditolak!', redirectUrl: '/dashboard/internship' }
//     }
//   } catch (error) {
//     console.error(error)

//     return { error: 'Terjadi kesalahan saat memproses permintaan!' }
//   }
// }
