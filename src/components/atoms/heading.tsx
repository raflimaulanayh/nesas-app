import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface HeadingProps {
  text: string | ReactNode
  className?: string
  url?: string
}

export const Heading = ({ text, className, url }: HeadingProps) => {
  const router = useRouter()

  const urls = url || router.back()

  return (
    <h1>
      <Link
        href={urls || '#!'}
        className={cn('text-2xl font-semibold text-primary inline-flex items-center gap-2', className)}
      >
        {url && <ArrowLeftIcon size={24} />}
        {typeof text === 'string' ? <span>{text}</span> : text}
      </Link>
    </h1>
  )
}
