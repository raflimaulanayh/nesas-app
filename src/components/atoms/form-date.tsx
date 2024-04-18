'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Control } from 'react-hook-form'

import { Button } from '@/components/atoms/ui/button'
import { Calendar } from '@/components/atoms/ui/calendar'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/ui/popover'

import { cn } from '@/lib/utils'

interface DateInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown>
  label?: string
  name: string
  required?: boolean
  placeholder?: string
  className?: string
}

export const DateInput: React.FC<DateInputProps> = ({
  control,
  label,
  name,
  required,
  placeholder,
  className,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <>
      <FormField
        {...props}
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div
              className={cn(
                'border-2  pt-2 rounded-md bg-white overflow-hidden',
                className,
                isFocus ? 'border-primary' : 'border-gray-200'
              )}
              data-attribute="date-input"
            >
              <Label className="px-3 text-sm text-primary">
                {label} {required && <span className="text-red-600"> *</span>}
              </Label>
              <Popover>
                <PopoverTrigger asChild onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full focus:border-0 border-0  hover:bg-white justify-between text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'dd/MM/yyyy') : <span className="font-medium">{placeholder}</span>}
                      <CalendarIcon className="w-6 h-6 text-black" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    className="border rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
