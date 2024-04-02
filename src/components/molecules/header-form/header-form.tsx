import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface HeaderFormProps {
  title: string
  url: string
  className?: string
}

export const HeaderForm = ({ title, url, className }: HeaderFormProps) => {
  return (
    <Link href={url} className={cn('inline-flex items-center gap-2 mb-7 text-2xl font-semibold text-primary', className)}>
      <ArrowLeftIcon size={24} />
      <h1>{title}</h1>
    </Link>
  )
}
