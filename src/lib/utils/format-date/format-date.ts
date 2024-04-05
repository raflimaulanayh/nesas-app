import moment from 'moment'

export const formatDate = (value: string) => {
  const format = moment(value).locale('id').format('DD MMMM YYYY')

  return format
}
