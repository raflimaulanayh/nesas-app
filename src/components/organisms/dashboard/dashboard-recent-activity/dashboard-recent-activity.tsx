import { addHours, format, parseISO } from 'date-fns'
import { TUserActivity } from 'types/data/user-activity'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/ui/avatar'

import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils/get-initial'

export const DashboardRecentActivity = ({ data }: TUserActivity) => {
  const sortedActivity = data?.sort((a, b) => {
    if (a?.createdAt && b?.createdAt) {
      return new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
    }

    return 0
  })

  const recentActivity = sortedActivity?.slice(0, 4)

  const colorStatus = (value: string) => {
    switch (value) {
      case 'create':
      case 'signin':
        return 'text-green-600 bg-green-100'
      case 'update':
        return 'text-blue-600 bg-blue-100'
      case 'delete':
      case 'signout':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-8">
      {recentActivity?.map((item, index) => (
        <div key={index} className="flex items-center justify-between gap-5">
          <div className="flex items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/static/icons/.svg" alt="Avatar" />
              <AvatarFallback>{getInitials(item.identifier || 'AN')}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none text-slate-900">{item.identifier}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{item.activity_detail}</p>
              <p className="text-[10px]">{format(addHours(parseISO(item.createdAt || ''), 7), 'dd/MM/yyyy HH:mm:ss')} </p>
            </div>
          </div>
          <div className={cn('text-xs capitalize rounded inline p-1.5', colorStatus(item.type_activity))}>
            {item.type_activity}
          </div>
        </div>
      ))}
    </div>
  )
}
