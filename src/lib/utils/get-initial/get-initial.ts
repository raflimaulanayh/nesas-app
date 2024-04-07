export const getInitials = (identifier: string) => {
  if (!identifier) return ''

  const initials = identifier.substring(0, 2).toUpperCase()

  return initials
}
