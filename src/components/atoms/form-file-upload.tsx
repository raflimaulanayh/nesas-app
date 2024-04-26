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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultPhoto?: string
}

export const FileUploads: React.FC<FileUpload> = ({
  control,
  name,
  label,
  required = false,
  className,
  hint,
  defaultPhoto,
  ...props
}) => {
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
              defaultPhoto={defaultPhoto}
              onRemove={(newValue) => field.onChange(newValue)}
            />
          </FormControl>
          {hint && <p className="text-xs leading-tight text-red-600">{hint}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
