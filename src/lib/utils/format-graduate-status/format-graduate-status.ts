export const formatGraduateStatus = (status: 'ongoing' | 'graduated' | 'dropout' | 'transferred') => {
  let statusShow = ''
  let customCSS = ''

  switch (status) {
    case 'ongoing':
      statusShow = 'Proses'
      customCSS = 'bg-blue-100 text-blue-700'
      break

    case 'graduated':
      statusShow = 'Lulus'
      customCSS = 'bg-green-100 text-green-700'
      break

    case 'dropout':
      statusShow = 'Dropout'
      customCSS = 'bg-red-100 text-red-700'
      break

    case 'transferred':
      statusShow = 'Pindah'
      customCSS = 'bg-yellow-100 text-yellow-700'
      break

    default:
      statusShow = ''
      customCSS = ''
      break
  }

  return { statusShow, customCSS }
}
