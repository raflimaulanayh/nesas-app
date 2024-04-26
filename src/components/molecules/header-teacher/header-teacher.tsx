'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import Link from 'next/link'
import useSWR from 'swr'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/ui/popover'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import Container from '@/components/templates/container/container'

import { cn } from '@/lib/utils'
import { logout } from '@/lib/utils/actions/logout'
import { getInitials } from '@/lib/utils/get-initial'

export const HeaderTeacher = () => {
  const user = useCurrentUser()
  const { data: users, isLoading: loadUsers } = useSWR(`/users/${user?.id}`)

  const teacher = users?.data?.teachers

  return (
    <div className="text-white bg-primary h-72">
      <Container>
        {loadUsers && (
          <div className="flex items-center justify-between py-7">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-40 h-8" />
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-[81px] h-5" />
            </div>

            <Skeleton className="w-14 h-14 !rounded-full" />
          </div>
        )}

        {!loadUsers && (
          <div className="flex items-center justify-between py-7">
            <div className="flex flex-col">
              <span className="text-xl font-medium">Hi, {teacher?.name ?? user?.username}</span>
              <span className="text-sm text-slate-300">
                {teacher ? <span>NIP: {teacher?.nip ?? '-'}</span> : <span>{user?.email}</span>}
              </span>
              <span className="text-xs mt-2 w-[81px] bg-white rounded-full py-1 px-2 inline font-medium text-primary">
                2021-2024
              </span>
            </div>

            <Popover>
              <PopoverTrigger>
                <Avatar className="w-14 h-14">
                  <AvatarImage src={user?.photo || '/'} alt="Avatar" />
                  <AvatarFallback className="text-lg font-medium">
                    {getInitials(teacher?.name ?? (user?.username || 'AN'))}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent align="end" className="p-2 mt-2 mr-1 min-w-32">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/teacher/setting"
                      className={cn('block px-3 py-1 text-sm leading-6 hover:bg-slate-100 rounded text-gray-900')}
                    >
                      Profil
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className={cn('block px-3 py-1 text-sm leading-6 hover:bg-slate-100 rounded text-gray-900')}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex">
                    <button
                      onClick={() => logout()}
                      className={cn(
                        'px-3 py-1 w-full flex justify-start text-sm leading-6 bg-red-600 text-white rounded hover:bg-red-700'
                      )}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </Container>
    </div>
  )
}
