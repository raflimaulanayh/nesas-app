export const formatArticleStatus = (status: 'public' | 'private' | 'draft' | 'pending') => {
  let statusShow = ''
  let customCSS = ''

  switch (status) {
    case 'public':
      statusShow = 'Public'
      customCSS = 'bg-green-600 text-white'
      break

    case 'private':
      statusShow = 'Private'
      customCSS = 'bg-yellow-600 text-white'
      break

    case 'draft':
      statusShow = 'Draft'
      customCSS = 'bg-slate-600 text-white'
      break

    case 'pending':
      statusShow = 'Pending'
      customCSS = 'bg-blue-600 text-white'
      break

    default:
      statusShow = ''
      customCSS = ''
      break
  }

  return { statusShow, customCSS }
}
