export const formatCompanyStatus = (
  status: 'active' | 'not_active' | 'pending' | 'filled'
): { statusShow: string; customCSS: string } => {
  let statusShow = ''
  let customCSS = ''

  switch (status) {
    case 'not_active':
      statusShow = 'Tidak aktif'
      customCSS = 'bg-slate-200 text-slate-700'
      break
    case 'active':
      statusShow = 'Aktif'
      customCSS = 'bg-green-100 text-green-700'
      break
    case 'pending':
      statusShow = 'Pending'
      customCSS = 'bg-blue-100 text-blue-700'
      break
    case 'filled':
      statusShow = 'Penuh/terisi'
      customCSS = 'bg-primary/20 text-primary'
      break
    default:
      statusShow = ''
      customCSS = ''
      break
  }

  return { statusShow, customCSS }
}
