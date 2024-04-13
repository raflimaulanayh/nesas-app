'use client'

import { useState } from 'react'
import { Control, FieldValues, FormProps } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'
import { PhoneInput as Phone, PhoneNumberValue } from '@/components/atoms/ui/phone'

import { cn } from '@/lib/utils'

interface PhoneInput extends FormProps<FieldValues> {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown>
  placeholder?: string
  label?: string
  required?: boolean
  className?: string
  disabled?: boolean
  hint?: string
}

export const PhoneInput: React.FC<PhoneInput> = ({
  control,
  name,
  placeholder,
  label,
  required = false,
  className,
  disabled,
  hint,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const [value, setValue] = useState<PhoneNumberValue>()

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
            <FormControl className="m-1">
              <Phone
                {...field}
                placeholder={placeholder}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(e) => {
                  setValue(e)
                  field.onChange(e)
                }}
                international
                value={value || field.value}
                // defaultValue={value || field.value}
                className={cn(disabled ? 'bg-gray-100' : '')}
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
