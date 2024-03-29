import { cn } from '@/lib/utils'

interface HeadingProps {
  text: string
  className?: string
}

export const Heading = ({ text, className }: HeadingProps) => (
  <h2 className={cn('text-2xl lg:text-4xl font-semibold text-tosca font-gotham', className)}>{text}</h2>
)
