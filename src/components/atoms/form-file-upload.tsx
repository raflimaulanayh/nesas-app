import { Control, FieldValues, FormProps } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'

import { cn } from '@/lib/utils'

import { FileUpload as FormFileUpload } from './ui/file-upload'

interface FileUpload extends FormProps<FieldValues> {
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

export const FileUploads: React.FC<FileUpload> = ({ control, name, label, required = false, className, hint, ...props }) => {
  return (
    <FormField
      {...props}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <Label className="text-sm text-primary">
            {label} {required && <span className="text-red-600"> *</span>}
          </Label>
          <FormControl>
            <FormFileUpload
              onChange={(newValue) => field.onChange(newValue)}
              value={field.value}
              onRemove={(newValue) => field.onChange(newValue)}
            />
          </FormControl>
          {hint && <p className="text-xs leading-tight text-gray-500">{hint}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
