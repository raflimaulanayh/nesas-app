/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from '@tinymce/tinymce-react'
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
  height?: string
}

export const RichText: React.FC<RichTextProps> = ({
  name,
  label,
  control,
  required = false,
  className,
  defaultValue,
  height,
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
              {label} {required && <span className="text-red-600"> *</span>}
            </Label>
          </div>
          <TinyEditor height={height} defaultValue={defaultValue || ''} onChange={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const TinyEditor = ({
  onChange,
  defaultValue,
  height
}: {
  onChange: (data: string) => void
  defaultValue: string
  height?: string
}) => {
  const [isFocus, setIsFocus] = useState(false)

  const handleEditorChange = (content: string) => {
    onChange(content)
  }

  return (
    <div className={cn('border-2 rounded-md', isFocus ? 'border-primary' : 'border-gray-200')}>
      <FormControl>
        <Editor
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
          apiKey="oy9aih0lyzqgbbpjz6zj1fen4o28hf31tppl9i8fxnoy5tsl"
          init={{
            height: height || '300px',
            branding: false,
            menubar: true,
            plugins:
              'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags typography inlinecss markdown',
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | checklist numlist bullist indent outdent | emoticons charmap',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name'
          }}
          onEditorChange={handleEditorChange}
          initialValue={defaultValue}
        />
      </FormControl>
    </div>
  )
}
