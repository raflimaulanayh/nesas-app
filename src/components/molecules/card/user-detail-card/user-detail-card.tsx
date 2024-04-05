import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface UserDetailCardProps {
  label?: string | string[]
  value?: string | ReactNode
  className?: string
}

export const UserDetailCardSubmissionDetailCard = ({ label, value = '', className }: UserDetailCardProps) => (
  <div className={cn(className, 'py-2 font-gotham space-y-1 border-b border-slate-200')}>
    <span className="text-sm font-medium text-primary-blue">{label}</span>
    <br />
    {typeof value === 'string' ? <p dangerouslySetInnerHTML={{ __html: value }} /> : value}
  </div>
)
