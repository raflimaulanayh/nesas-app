import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/atoms/ui/radio-group'

import { cn } from '@/lib/utils'

interface RadioInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown>
  name: string
  label?: string
  options?: {
    label: string
    value: string
  }[]
  required?: boolean
  className?: string
}

export const RadioInput: React.FC<RadioInputProps> = ({
  name,
  label,
  options,
  control,
  required = false,
  className,
  ...props
}) => {
  return (
    <FormField
      {...props}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <div className={cn('flex justify-between w-full', className)}>
            <Label className="text-sm font-semibold text-primary-blue">
              {label} {required && <span> *</span>}
            </Label>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value)
              }}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              {options?.map((item) => (
                <FormItem className="flex items-center space-x-3 space-y-0" key={`${name}_${item.value}`}>
                  <FormControl>
                    <RadioGroupItem
                      value={item.value}
                      checked={field.value == item.value ? true : false}
                      id={`${name}_${item.value}`}
                    />
                  </FormControl>
                  <Label className="font-normal" htmlFor={`${name}_${item.value}`}>
                    {item.label}
                  </Label>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
