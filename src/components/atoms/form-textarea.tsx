import { useState } from 'react'
import { Control, FieldValues, FormProps } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'

import { cn } from '@/lib/utils'

interface Input extends FormProps<FieldValues> {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown>
  placeholder?: string
  label?: string
  required?: boolean
  className?: string
  type?: string
  hint?: string
}

export const Textarea: React.FC<Input> = ({
  control,
  name,
  placeholder,
  label,
  required = false,
  className,
  hint,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <FormField
      {...props}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div
            className={cn('border-2 bg-white pt-2 rounded-md', className, isFocus ? 'border-primary' : 'border-gray-200')}
          >
            {label && (
              <Label className="px-3 text-sm text-primary">
                {label} {required && <span className="text-red-600">*</span>}
              </Label>
            )}
            <FormControl>
              <textarea
                placeholder={placeholder}
                {...field}
                className="focus:border-0 flex px-3 py-2 text-sm placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 !ring-0 !outline-none !bg-transparent !border-none w-full rounded-md"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </FormControl>
          </div>
          {hint && <span className="text-xs text-red-600">{hint}</span>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
