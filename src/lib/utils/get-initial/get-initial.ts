export const getInitials = (identifier: string) => {
  if (!identifier) return ''
  const words = identifier.split(' ')
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  } else {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
  }
}
