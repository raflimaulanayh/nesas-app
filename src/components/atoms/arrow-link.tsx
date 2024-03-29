import Link from 'next/link'

import { cn } from '@/lib/utils'

import { ArrowLeftIcon } from './icons'

interface IArrowLink {
  title: string
  url: string
  className?: string
}

export const ArrowLink = ({ url, title, className }: IArrowLink) => {
  return (
    <Link href={url} className={cn('inline-flex items-center space-x-3 text-tosca w-auto', className)}>
      <ArrowLeftIcon className="w-6 h-6 cursor-pointer" />
      <p className="text-xl font-semibold">{title}</p>
    </Link>
  )
}
