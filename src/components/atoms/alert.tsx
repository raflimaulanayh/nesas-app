import * as Icon from 'lucide-react'
import { useMemo } from 'react'

import { AlertDescription, AlertTitle, Alert as DefaultAlert } from '@/components/atoms/ui/alert'

import { cn } from '@/lib/utils'

interface AlertProps {
  title?: string
  message: string | React.ReactNode
  type: 'default' | 'destructive' | 'error' | 'success' | 'warning' | 'info'
  className?: string
  allignment?: 'start' | 'center' | 'end'
}

export const Alert = ({ allignment = 'center', title, message, type = 'default', className }: AlertProps) => {
  const Icons = useMemo(() => {
    switch (type) {
      case 'success':
        return <Icon.Check className="w-5 h-5 p-0.5 text-white bg-green-600 rounded-full" />
      case 'error':
        return <Icon.X className="w-5 h-5 p-0.5 text-white bg-red-600 rounded-full" />
      case 'warning':
        return <Icon.AlertCircle className="w-5 h-5 p-0.5 text-white bg-yellow-600 rounded-full" />
      case 'info':
        return <Icon.Info className="w-5 h-5 p-0.5 text-primary-blue" />
    }
  }, [type])

  return (
    <DefaultAlert
      className={cn(
        'flex px-2 py-2.5 space-x-2 rounded-md',
        allignment === 'center' && 'items-center',
        allignment === 'start' && 'items-start',
        allignment === 'end' && 'items-end'
      )}
      variant={type}
    >
      <div>{Icons}</div>
      <div>
        {title && <AlertTitle className="font-semibold font-gotham">{title}</AlertTitle>}
        {typeof message === 'string' ? <AlertDescription className={className}>{message}</AlertDescription> : message}
      </div>
    </DefaultAlert>
  )
}
