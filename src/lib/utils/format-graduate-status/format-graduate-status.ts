export const formatGraduateStatus = (status: 'ongoing' | 'graduated' | 'dropout' | 'transferred') => {
  let statusShow = ''
  let customCSS = ''

  switch (status) {
    case 'ongoing':
      statusShow = 'Proses'
      customCSS = 'bg-blue-50 text-blue-600'
      break

    case 'graduated':
      statusShow = 'Lulus'
      customCSS = 'bg-green-50 text-green-600'
      break

    case 'dropout':
      statusShow = 'Dropout'
      customCSS = 'bg-red-50 text-red-600'
      break

    case 'transferred':
      statusShow = 'Pindah'
      customCSS = 'bg-yellow-50 text-yellow-600'
      break

    default:
      statusShow = ''
      customCSS = ''
      break
  }

  return { statusShow, customCSS }
}
