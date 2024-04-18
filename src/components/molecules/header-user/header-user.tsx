'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { useHydration } from '@/hooks/use-hydration'
import Link from 'next/link'
import useSWR from 'swr'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/ui/popover'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import Container from '@/components/templates/container/container'

import { cn } from '@/lib/utils'
import { logout } from '@/lib/utils/actions/logout'
import { getInitials } from '@/lib/utils/get-initial'

export const HeaderUser = () => {
  const isHydrated = useHydration()
  const user = useCurrentUser()
  const { data: users, isLoading: loadUsers } = useSWR(`/users/${user?.id}`)
  const { data: classes } = useSWR('/classes')

  const student = users?.data?.students[0]

  const getClassByStudent = (class_id: string) => {
    const classStudent = classes?.data?.find((item: { id: string }) => item.id == class_id)

    return classStudent ?? '-'
  }

  return (
    <div className="text-white bg-primary h-72">
      <Container>
        {!isHydrated && (
          <div className="flex items-center justify-between py-7">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-40 h-8" />
              <Skeleton className="w-48 h-6" />
              <Skeleton className="w-[81px] h-5" />
            </div>

            <Skeleton className="w-14 h-14 !rounded-full" />
          </div>
        )}

        {isHydrated && (
          <div>
            {loadUsers && <Skeleton className="w-full h-56 my-4" />}
            {!loadUsers && (
              <div className="flex items-center justify-between py-7">
                <div className="flex flex-col">
                  <span className="text-xl font-medium">Hi, {student?.name ?? user?.username}</span>
                  <span className="text-sm text-slate-300">
                    {student ? (
                      <span>
                        Kelas {getClassByStudent(student?.class_id || '').name} | NIS: {student?.nis ?? '-'}
                      </span>
                    ) : (
                      <span>{user?.email}</span>
                    )}
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
                        {getInitials(student?.name ?? (user?.username || 'AN'))}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent align="end" className="p-2 mt-2 mr-1 min-w-32">
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/student/setting"
                          className={cn('block px-3 py-1 text-sm leading-6 hover:bg-slate-100 rounded text-gray-900')}
                        >
                          Profil
                        </Link>
                      </li>
                      <li className="flex">
                        <button
                          onClick={() => logout()}
                          className={cn(
                            'px-3 py-1 w-full flex justify-start text-sm leading-6 hover:bg-slate-100 rounded text-gray-900'
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
          </div>
        )}
      </Container>
    </div>
  )
}
