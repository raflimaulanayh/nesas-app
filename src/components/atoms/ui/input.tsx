'use client'

import * as Icons from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const [types, setTypes] = React.useState<string>('text')
  const [isShow, setIsShow] = React.useState(false)
  const Eye = isShow ? Icons.Eye : Icons.EyeOff

  React.useEffect(() => {
    if (type === 'password') {
      setTypes(isShow ? 'text' : 'password')
    } else {
      setTypes(type || 'text')
    }
  }, [isShow, type])

  return (
    <div className="relative w-full">
      <input
        type={types}
        className={cn(
          'flex w-full outline-none rounded-md border border-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      {type === 'password' && (
        <Eye className="absolute top-0 w-5 h-5 cursor-pointer right-3" onClick={() => setIsShow(!isShow)} />
      )}
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
