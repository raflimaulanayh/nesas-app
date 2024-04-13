/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { RichText } from '@/components/atoms/form-rich-text'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { defaultValues, formSchema } from './schema'

export const CommentForm = ({
  forum_id,
  user_id,
  mutate
}: {
  forum_id: string
  user_id: string
  mutate: {
    forum: any
    comment: any
  }
}) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const body = {
      content: values.content,
      forum_id: forum_id,
      user_id: user_id
    }

    try {
      const response = await api.post('/forums/forum-comments', body)
      if (response.status === 200) {
        setLoading(false)
        mutate.forum()
        mutate.comment()
        form.setValue('content', '')
        toast({
          title: 'Jawaban telah berhasil dikirim.'
        })
      }
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Gagal dikirim!',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-10 space-y-6">
          <RichText name="content" label="Jawaban" required {...form} />
          <div className="flex justify-end">
            <Button disabled={loading} className="ml-auto" type="submit">
              {loading ? <Loading /> : 'Kirim jawaban'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
