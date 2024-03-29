import { cn } from '@/lib/utils'

import { BadgeProps, Badge as DefaultBadge, badgeVariants } from './ui/badge'

export const Badge = ({ variant, ...rest }: BadgeProps) => {
  return (
    <DefaultBadge
      className={cn('capitalize rounded-full px-3 py-1 text-xs border', badgeVariants({ variant: variant }))}
      {...rest}
    >
      {variant}
    </DefaultBadge>
  )
}
