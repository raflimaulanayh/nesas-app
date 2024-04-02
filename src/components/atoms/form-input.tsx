import { useState } from 'react'
import { Control, FieldValues, FormProps } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Input as FormInput } from '@/components/atoms/ui/input'
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
  disabled?: boolean
  hint?: string
  isVerified?: boolean
}

export const Input: React.FC<Input> = ({
  control,
  name,
  placeholder,
  label,
  required = false,
  className,
  type,
  disabled,
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
            className={cn(
              'border-2  pt-2 rounded-md',
              className,
              isFocus ? 'border-primary' : 'border-gray-200',
              disabled ? 'bg-gray-100' : ''
            )}
          >
            <Label className="px-3 text-sm text-primary">
              {label} {required && <span className="text-red-600"> *</span>}
            </Label>
            <FormControl>
              <FormInput
                className={cn(disabled ? 'bg-gray-100' : '')}
                type={type}
                placeholder={placeholder}
                {...field}
                onBlur={() => setIsFocus(false)}
                onFocus={(e) => {
                  setIsFocus(true)
                  if (type == 'number') {
                    e.target.addEventListener(
                      'wheel',
                      function (e) {
                        e.preventDefault()
                      },
                      { passive: false }
                    )
                  }
                }}
                disabled={disabled}
              />
            </FormControl>
          </div>
          {hint && <p className="text-xs leading-tight text-gray-500">{hint}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
