import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/atoms/ui/radio-group'

import { cn } from '@/lib/utils'

interface RadioEventInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown>
  name: string
  label?: string
  options?: {
    label: string
    subLabel?: string
    value: string
  }[]
  required?: boolean
  className?: string
}

export const RadioEventInput: React.FC<RadioEventInputProps> = ({
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
              {label} {required && <span className="text-red-600"> *</span>}
            </Label>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value)
              }}
              defaultValue={field.value}
              className="flex flex-col w-full space-y-3"
            >
              {options?.map((item) => (
                <label htmlFor={`${name}_${item.value}`} key={`${name}_${item.value}`}>
                  <FormItem
                    className={cn(
                      'flex items-start w-full p-4 space-x-3 space-y-0 rounded justify-between cursor-pointer',
                      field.value == item.value ? 'border border-primary-blue' : 'border border-gray-300'
                    )}
                  >
                    <Label className="inline-flex flex-col w-auto">
                      <span className="font-normal">{item.label}</span>
                      <span className="mt-2 font-medium">{item.subLabel}</span>
                    </Label>
                    <label htmlFor={`${name}_${item.value}`}>
                      <FormControl>
                        <RadioGroupItem
                          isEvent
                          value={item.value}
                          checked={field.value == item.value ? true : false}
                          id={`${name}_${item.value}`}
                        />
                      </FormControl>
                    </label>
                  </FormItem>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
