import { navigationStudent } from '@/constants/menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import { Popover, PopoverTrigger, PopoverContent } from '@/components/atoms/ui/popover'
import Container from '@/components/templates/container/container'

import { cn } from '@/lib/utils'

export const NavbarStudent = () => {
  const pathname = usePathname()

  return (
    <Fragment>
      <nav className="fixed bottom-0 z-50 w-full py-3 shadow-sm rounded-t-xl bg-[url(/static/images/bg-navbar.png)] bg-contain">
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
