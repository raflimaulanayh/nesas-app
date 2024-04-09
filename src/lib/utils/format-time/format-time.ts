import moment from 'moment'
import 'moment/locale/id'

export const formatTime = (value: string) => {
  const format = moment(value).locale('id').utcOffset('+0700').format('dddd, DD MMM YYYY HH:mm [WIB]')

  return format
}
