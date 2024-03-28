'use client'

import { navigationGeneral } from '@/constants/menu'
import { ChevronDown } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { IoChevronDownSharp } from 'react-icons/io5'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/ui/popover'
import Container from '@/components/templates/container/container'

import { cn } from '@/lib/utils'

const userNavigation = [{ name: 'Your profile', href: '/dashboard' }]

export const Navbar = () => {
  const { data } = useSession()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [openStates, setOpenStates] = useState(new Array(navigationGeneral.length).fill(false))

  const handleScroll = () => {
    const offset = window.scrollY

    if (offset > 1) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <Fragment>
      <nav
        className={cn(
          'fixed top-0 z-40 w-full border-b shadow-sm duration-500 transition-all',
          scrolled ? 'bg-white/90 py-3 lg:py-4' : 'bg-white py-5 lg:py-6'
        )}
      >
        <Container className="flex items-center justify-between lg:pr-24">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-nesas.svg" alt="Logo Nesas" width={50} height={50} />
            <span className="h-10 w-[1px] bg-slate-400" />
            <Image src="/nss.svg" alt="Logo NSS" width={120} height={50} className="lg:w-32" />
          </Link>
          <div className="flex items-center sm:gap-5 lg:gap-10">
            <ul className="hidden gap-4 text-sm font-medium sm:flex text-slate-900 items-ceter">
              {navigationGeneral.map((item, index) => {
                if (item.childs) {
                  return (
                    <li key={item.label}>
                      <Popover
                        onOpenChange={() => {
                          const newOpenStates = [...openStates]
                          newOpenStates[index] = !openStates[index]
                          setOpenStates(newOpenStates)
                        }}
                      >
                        <PopoverTrigger className="flex hover:text-primary items-center gap-0.5">
                          <p>{item.label}</p>
                          <ChevronDown className={cn('inline w-5 h-5', openStates[index] && 'rotate-180')} />
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-auto p-2">
                          <ul>
                            {item.childs.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.url}
                                  className={cn(
                                    'block px-3 py-1 text-sm leading-6 hover:bg-slate-100 rounded text-gray-900'
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </PopoverContent>
                      </Popover>
                    </li>
                  )
                } else {
                  return (
                    <li key={index} className="hover:text-primary">
                      <Link href={item.url}>{item.label}</Link>
                    </li>
                  )
                }
              })}
            </ul>
            {data?.user ? (
              <Popover>
                <PopoverTrigger className="-m-1.5 flex gap-2 items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  {data?.user?.photo ? (
                    <Image
                      src={data.user.photo}
                      alt={`photo ${data.user.username}`}
                      height={28}
                      width={28}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src="/static/icons/user.svg"
                      alt="Photo dummy user"
                      height={28}
                      width={28}
                      className="rounded-full"
                    />
                  )}
                  <span className="hidden lg:flex lg:items-center">
                    <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                      {data?.user?.username}
                    </span>
                    <IoChevronDownSharp className="w-5 h-5 ml-2 text-gray-400" aria-hidden="true" />
                  </span>
                </PopoverTrigger>
                <PopoverContent className="p-2 mt-4 mr-1">
                  <ul>
                    {userNavigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn('block px-3 py-1 text-sm leading-6 hover:bg-slate-100 rounded text-gray-900')}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/dashboard"
                        className={cn('block px-3 py-1 text-sm leading-6 hover:bg-slate-100 rounded text-gray-900')}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className={cn('flex w-full px-3 py-1 text-sm leading-6 hover:bg-slate-100 rounded text-gray-900')}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            ) : (
              pathname !== '/login' && (
                <Link
                  href="/login"
                  className="px-6 py-2 font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Login
                </Link>
              )
            )}
          </div>
        </Container>
      </nav>

      <nav className="fixed bottom-0 z-50 w-full py-3 shadow-sm rounded-t-xl bg-[url(/static/images/bg-navbar.png)] bg-contain sm:hidden">
        <Container>
          <ul className="flex items-center justify-around text-center">
            {navigationGeneral.map((item) => {
              if (item?.childs) {
                return null
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
