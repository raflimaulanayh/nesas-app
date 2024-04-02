import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useState } from 'react'
import { Control } from 'react-hook-form'
import { RxFontBold, RxFontItalic, RxUnderline } from 'react-icons/rx'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/atoms/ui/form'
import { Label } from '@/components/atoms/ui/label'

import { cn } from '@/lib/utils'

import { Toggle } from './ui/toggle'

interface RichTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <Tiptap defaultValue={defaultValue || ''} onChange={field.onChange} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const Tiptap = ({ onChange, defaultValue }: { onChange: (richText: string) => void; defaultValue: string }) => {
  const [isFocus, setIsFocus] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder:
          'Use concise and clear language, avoid jargon and complicated terms and make sure the abstract is easy to understand.'
      })
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class: 'p-5 font-gotham text-base focus:outline-none min-h-[150px]'
      }
    },
    onUpdate({ editor }) {
      const richText = editor.getHTML()
      onChange(richText)
    }
  })

  return (
    <div className={cn('border-2 rounded-md', isFocus ? 'border-primary-blue' : 'border-gray-200')}>
      <div
        className={cn(
          'flex items-center gap-1 p-2 border-b-2 border-gray-200',
          isFocus ? 'border-primary-blue' : 'border-gray-200'
        )}
      >
        <Toggle
          pressed={editor?.isActive('bold')}
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
          aria-label="Toggle Bold"
        >
          <RxFontBold className="w-6 h-6" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive('italic')}
          onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
          aria-label="Toggle italic"
        >
          <RxFontItalic className="w-6 h-6" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive('underline')}
          onPressedChange={() => editor?.chain().focus().toggleUnderline().run()}
          aria-label="Toggle underline"
        >
          <RxUnderline className="w-6 h-6" />
        </Toggle>
      </div>
      <FormControl>
        <EditorContent onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)} editor={editor} />
      </FormControl>
    </div>
  )
}
