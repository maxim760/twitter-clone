import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import ruLang from 'date-fns/locale/ru/index'
import { getDateFnsLocale } from '../core/dateFns'

export const formatDate = (date: Date): string => {
  const locale = getDateFnsLocale()
  const formattedDate = formatDistanceToNowStrict(
    date,
    {locale}
  )
  return formattedDate
}