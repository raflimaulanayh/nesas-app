/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor as CKEditorComponent } from '@ckeditor/ckeditor5-react'
import { useState } from 'react'
import { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'

import { cn } from '@/lib/utils'

interface RichTextProps {
  control?: Control<any, unknown>
  name: string
  label?: string
  required?: boolean
  className?: string
  defaultValue?: string
}

export const RichText: React.FC<RichTextProps> = ({
  name,
  label,
  control,
  required = false,
  className,
  defaultValue,
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
          <CKEditor defaultValue={defaultValue || ''} onChange={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const CKEditor = ({ onChange, defaultValue }: { onChange: (data: string) => void; defaultValue: string }) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <div className={cn('border-2 rounded-md', isFocus ? 'border-primary-blue' : 'border-gray-200')}>
      <FormControl>
        <CKEditorComponent
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
          editor={ClassicEditor}
          data={defaultValue}
          onChange={(event: any, editor: any) => {
            const data = editor.getData()
            onChange(data)
          }}
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'indent',
              'outdent',
              '|',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'undo',
              'redo'
            ]
          }}
        />
      </FormControl>
    </div>
  )
}
