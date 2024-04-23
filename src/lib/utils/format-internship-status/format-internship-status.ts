export const formatInternshipStatus = (
  status:
    | 'not_started'
    | 'pending'
    | 'approved'
    | 'interviewing'
    | 'getted_kuota'
    | 'rejected'
    | 'canceled'
    | 'ongoing'
    | 'completed'
    | 'sidang_completed'
): { statusShow: string; customCSS: string } => {
  let statusShow = ''
  let customCSS = ''

  switch (status) {
    case 'not_started':
      statusShow = 'Belum mulai'
      customCSS = 'bg-slate-200 text-slate-700'
      break
    case 'pending':
      statusShow = 'Pending'
      customCSS = 'bg-blue-100 text-blue-700'
      break
    case 'approved':
      statusShow = 'Disetujui'
      customCSS = 'bg-green-100 text-green-700'
      break
    case 'interviewing':
      statusShow = 'Interviewing'
      customCSS = 'bg-yellow-100 text-yellow-700'
      break
    case 'getted_kuota':
      statusShow = 'Mendapatkan Kuota'
      customCSS = 'bg-purple-100 text-purple-700'
      break
    case 'rejected':
      statusShow = 'Ditolak'
      customCSS = 'bg-red-100 text-red-700'
      break
    case 'canceled':
      statusShow = 'Dibatalkan'
      customCSS = 'bg-gray-100 text-gray-700'
      break
    case 'ongoing':
      statusShow = 'Sedang berlangsung'
      customCSS = 'bg-blue-100 text-blue-700'
      break
    case 'completed':
      statusShow = 'Selesai'
      customCSS = 'bg-primary/20 text-primary'
      break
    case 'sidang_completed':
      statusShow = 'PKL Selesai'
      customCSS = 'bg-green-100 text-green-700'
      break
    default:
      statusShow = ''
      customCSS = ''
      break
  }

  return { statusShow, customCSS }
}
