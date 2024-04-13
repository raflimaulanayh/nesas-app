import { Control } from 'react-hook-form'

import { Checkbox as FormCheckbox } from '@/components/atoms/ui/checkbox'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'

import { cn } from '@/lib/utils'

interface CheckboxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown>
  name: string
  label?: string
  options?: {
    label: string
    value: string
    checked?: boolean
    other?: string
  }[]
  required?: boolean
  className?: string
  isTOR?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  options = [],
  control,
  required = false,
  className,
  isTOR = false,
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
            <Label className="text-sm font-semibold text-primary">
              {label} {required && !isTOR && <span className="text-red-600"> *</span>}
            </Label>
          </div>
          {options?.map((item) => (
            <FormItem className="flex items-center space-x-3 space-y-0" key={`${name}_${item.value}`}>
              <FormControl>
                <FormCheckbox
                  id={`${name}_${item.value}`}
                  checked={field.value?.includes(item.value)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...field.value, item.value])
                      : field.onChange(field.value?.filter((value: unknown) => value !== item.value))
                  }}
                  className="w-5 h-5 border-2 border-gray-300 data-[state=checked]:border-primary"
                />
              </FormControl>
              <Label className="font-normal cursor-pointer" htmlFor={`${name}_${item.value}`}>
                {item.label}
              </Label>
            </FormItem>
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
