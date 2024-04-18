/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/hooks/use-toast'
import { UploadDropzone } from '@uploadthing/react'
import axios from 'axios'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { OurFileRouter } from 'src/app/api/uploadthing/core'

import { Button } from '@/components/atoms/ui/button'

import { cn } from '@/lib/utils'

interface ImageUploadProps {
  onChange?: (newFiles: any[]) => void
  onRemove: (removedFiles: any[]) => void
  value: any[]
  defaultValue?: string
}

const IMG_MAX_LIMIT = 2

export const FileUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value = [], defaultValue }) => {
  const onDeleteFile = async (key: string) => {
    const filteredFiles = value.filter((item) => item.key !== key)
    onRemove(filteredFiles)

    const options = {
      method: 'POST',
      url: 'https://uploadthing.com/api/deleteFile',
      headers: {
        'Content-Type': 'application/json',
        'X-Uploadthing-Api-Key': 'sk_live_1cfa66f2a566ec16ada9a5364e9e214b2949efeb5e7aa0a22c219f13e9f986e2'
      },
      data: { fileKeys: [key] }
    }

    try {
      await axios.request(options)
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Image deleted successfully.'
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete image.'
      })
    }
  }

  const onUpdateFile = (newFiles: any[]) => {
    if (onChange) {
      onChange([...value, ...newFiles])
    }
  }

  const [loading, setLoading] = useState(true)

  return (
    <div>
      <div className={cn('flex items-center max-w-full overflow-hidden gap-4', value.length > 0 && 'mt-1 mb-4')}>
        {!!value.length &&
          value.map((item) => (
            <div
              key={item.key}
              className={cn(
                loading && 'animate-pulse bg-slate-300 h-[200px]',
                'relative w-[200px] h-auto rounded-md overflow-hidden'
              )}
            >
              <div className="absolute z-10 top-2 right-2">
                <Button type="button" onClick={() => onDeleteFile(item.key)} variant="destructive" size="sm">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <Image
                  width={200}
                  height={200}
                  onLoadingComplete={() => setLoading(false)}
                  className="object-contain w-full max-h-[200px]"
                  alt="Image"
                  src={item.url || defaultValue || ''}
                />
              </div>
            </div>
          ))}
      </div>
      <div>
        {value.length < IMG_MAX_LIMIT && (
          <UploadDropzone<OurFileRouter, 'imageUploader'>
            className="py-2 pb-4 bg-white dark:bg-zinc-800 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
            endpoint="imageUploader"
            config={{ mode: 'auto' }}
            content={{
              allowedContent({ isUploading }) {
                if (isUploading) {
                  return <p className="mt-2 text-sm text-slate-400 animate-pulse">Image Uploading...</p>
                }
              }
            }}
            onClientUploadComplete={(res) => {
              const data: any[] | undefined = res
              if (data) {
                onUpdateFile(data)
              }
            }}
            onUploadError={(error: Error) => {
              toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message
              })
            }}
            onUploadBegin={() => {
              // Do something once upload begins
            }}
          />
        )}
      </div>
    </div>
  )
}
