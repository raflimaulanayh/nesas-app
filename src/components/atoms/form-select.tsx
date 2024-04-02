'use client'

import { CheckIcon, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'
import { Select as FormSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, unknown>
  label?: string
  name: string
  required?: boolean
  className?: string
  placeholder?: string
  searchAble?: boolean
  option: {
    label: string
    value: string
  }[]
}

export const Select: React.FC<SelectProps> = ({
  control,
  label,
  name,
  required,
  className,
  placeholder,
  option,
  searchAble,
  ...props
}) => {
  const [isFocus] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <FormField
      {...props}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cn('border-2  pt-2 rounded-md', className, isFocus ? 'border-primary-blue' : 'border-gray-200')}>
            <Label className="px-3 text-sm text-primary-blue">
              {label} {required && <span className="text-red-600"> *</span>}
            </Label>
            {searchAble ? (
              <div className="relative w-full">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between w-full h-auto px-3 py-2 font-normal text-black bg-white hover:bg-transparent"
                    >
                      {field.value ? option.find((item) => item.value === field.value)?.label : placeholder}
                      <ChevronDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[290px] sm:w-[390px] lg:w-[490px] z-30 max-h-52 overflow-y-auto">
                    <Command>
                      <CommandInput placeholder={`Search ${label}...`} className="h-9" wrapperClassName="px-0" />
                      <CommandEmpty>No {label} found.</CommandEmpty>
                      <CommandGroup>
                        {option.map((item) => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={(currentValue) => {
                              field.onChange(currentValue)
                              setOpen(false)
                            }}
                          >
                            {item.label}
                            <CheckIcon
                              className={cn('ml-auto h-4 w-4', field.value === item.value ? 'opacity-100' : 'opacity-0')}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <FormSelect
                onValueChange={(value) => {
                  value && field.onChange(value)
                }}
                // defaultValue={field.value}
                value={field.value}
              >
                <FormControl className="border-0 border-transparent focus:border-0 focus:ring-offset-0 focus:ring-0 focus:outline-none">
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {option.map((item, index) => {
                    return (
                      <SelectItem value={item.value} key={index}>
                        {item.label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </FormSelect>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
