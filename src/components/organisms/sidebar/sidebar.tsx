/* eslint-disable @typescript-eslint/no-explicit-any */
import { navigationAdmin } from '@/constants/menu'
import { useCurrentUser } from '@/hooks/use-current-user'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoSettingsOutline } from 'react-icons/io5'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/ui/accordion'

import { cn } from '@/lib/utils'

export const Sidebar = () => {
  const user = useCurrentUser()
  const pathname = usePathname()

  const hideUrl = ['/dashboard/user']

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col">
        <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-indigo-600 grow gap-y-5 rounded-r-xl">
          <Link href="/dashboard" className="flex items-center mt-5 shrink-0">
            <Image width={32} height={32} className="w-auto h-11" src="/nss-white.svg" alt="NSS" />
          </Link>
          <nav className="flex flex-col flex-1">
            <ul role="list" className="flex flex-col flex-1">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationAdmin.map((item) => {
                    if (item.childs) {
                      const filteredChilds =
                        user?.role === 'admin' ? item?.childs : item?.childs.filter((child) => !hideUrl.includes(child.url))

                      return (
                        <Accordion
                          defaultValue={item.childs.some((childItem) => pathname === childItem.url) ? 'item-1' : ''}
                          key={item.label}
                          type="single"
                          collapsible
                        >
                          <AccordionItem value="item-1">
                            <AccordionTrigger
                              className={cn(
                                'text-slate-200 hover:text-slate-900 hover:bg-white',
                                'group rounded-md p-2 text-sm leading-6 font-semibold',
                                pathname === item.url
                                  ? 'bg-white text-slate-900'
                                  : 'text-slate-200 hover:text-slate-900 hover:bg-white'
                              )}
                            >
                              <span className="flex items-center text-base gap-x-3">
                                <item.icon className="w-6 h-6 shrink-0" aria-hidden="true" />
                                {item.label}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 my-2 bg-white rounded-md">
                              <ul className="space-y-1">
                                {filteredChilds.map((item) => (
                                  <li key={item.label}>
                                    <Link
                                      href={item.url}
                                      className={cn(
                                        'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md',
                                        pathname == item.url
                                          ? 'bg-primary text-slate-200'
                                          : 'hover:bg-primary text-slate-900 hover:text-slate-200'
                                      )}
                                    >
                                      <item.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )
                    } else {
                      return (
                        <li key={item.label}>
                          <Link
                            href={item.url}
                            className={cn(
                              'text-slate-200 hover:text-slate-900 hover:bg-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                              pathname === item.url
                                ? 'bg-white text-slate-900'
                                : 'text-slate-200 hover:text-slate-900 hover:bg-white'
                            )}
                          >
                            <item.icon className="w-6 h-6 shrink-0" aria-hidden="true" />
                            {item.label}
                          </Link>
                        </li>
                      )
                    }
                  })}
                </ul>
              </li>
              <li className="mt-auto">
                <Link
                  href="/setting"
                  className="flex p-2 -mx-2 text-sm font-semibold leading-6 rounded-md text-slate-200 group gap-x-3 hover:bg-indigo-700 hover:text-white"
                >
                  <IoSettingsOutline className="w-6 h-6 text-slate-200 shrink-0 group-hover:text-white" aria-hidden="true" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
