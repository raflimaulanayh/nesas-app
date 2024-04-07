import { navigationStudent } from '@/constants/menu'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useHydration } from '@/hooks/use-hydration'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { IoChevronDownSharp } from 'react-icons/io5'
import { MdNotificationsNone } from 'react-icons/md'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/atoms/ui/popover'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import Container from '@/components/templates/container/container'

import { cn } from '@/lib/utils'
import { logout } from '@/lib/utils/actions/logout'

const userNavigation = [{ name: 'Profile', href: '/setting/profile' }]

export const NavbarStudent = () => {
  const isHydrated = useHydration()
  const user = useCurrentUser()
  const pathname = usePathname()

  return (
    <Fragment>
      <div className="sticky top-0 z-40 flex items-center justify-between w-full px-4 py-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <Image src="/logo-nesas.svg" alt="Logo Nesas" width={40} height={30} />
          <span className="h-10 w-[1px] bg-slate-400" />
          <Image src="/nss.svg" alt="Logo NSS" width={100} height={30} className="lg:w-32" />
        </Link>

        <div className="flex self-stretch justify-end flex-1 gap-x-4 lg:gap-x-6">
          {!isHydrated && <Skeleton className="w-40 h-7" />}
          {isHydrated && (
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <MdNotificationsNone className="w-6 h-6" aria-hidden="true" />
              </button>

              <Popover>
                <PopoverTrigger className="flex items-center gap-2">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    src={user?.photo || '/static/icons/user.svg'}
                    alt={'Photo' + user?.username || 'User'}
                    height={28}
                    width={28}
                    className="rounded-full"
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                      {user?.username}
                    </span>
                    <IoChevronDownSharp className="w-5 h-5 ml-2 text-gray-400" aria-hidden="true" />
                  </span>
                </PopoverTrigger>
                <PopoverContent align="end" className="min-w-[120px]">
                  <ul className="space-y-2">
                    {userNavigation.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className={cn('block text-sm leading-6 text-gray-900')}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button onClick={() => logout()} className={cn('flex w-full text-sm leading-6 text-gray-900')}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>

      <nav className="fixed bottom-0 z-50 w-full py-3 shadow-sm rounded-t-xl bg-[url(/static/images/bg-navbar.png)] bg-contain lg:hidden">
        <Container>
          <ul className="grid grid-cols-4 gap-1 text-center place-items-center">
            {navigationStudent.map((item) => {
              if (item?.childs) {
                return (
                  <li key={item.label}>
                    <Popover>
                      <PopoverTrigger className="flex flex-col items-center gap-1 text-sm text-white group">
                        <item.icon size={23} />
                        <span>{item.label}</span>
                      </PopoverTrigger>
                      <PopoverContent className="mb-3">
                        <ul className="space-y-2 text-sm font-medium text-end">
                          {item.childs.map((item) => (
                            <li
                              key={item.label}
                              className={cn(
                                pathname === item.url ? 'underline text-primary' : 'hover:text-primary hover:underline'
                              )}
                            >
                              <Link href={item.url}>{item.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </li>
                )
              } else {
                return (
                  <li key={item.label}>
                    <Link href={item.url} className="flex flex-col items-center gap-1 text-sm text-white group">
                      <item.icon size={23} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              }
            })}
          </ul>
        </Container>
      </nav>
    </Fragment>
  )
}
