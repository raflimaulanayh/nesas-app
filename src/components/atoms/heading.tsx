import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface HeadingProps {
  text: string | ReactNode
  className?: string
  url?: string
}

export const Heading = ({ text, className, url = '#!' }: HeadingProps) => (
  <Link href={url}>
    <h1 className={cn('text-2xl font-semibold text-primary flex items-center gap-2', className)}>
      <ArrowLeftIcon size={24} />
      {typeof text === 'string' ? <span>{text}</span> : text}
    </h1>
  </Link>
)
