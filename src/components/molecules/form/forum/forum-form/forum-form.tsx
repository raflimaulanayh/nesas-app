/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { RichText } from '@/components/atoms/form-rich-text'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { defaultValues, formSchema } from './schema'

export const ForumForm = ({
  user_id,
  mutate
}: {
  user_id: string
  mutate: {
    forum: any
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
      title: values.title,
      content: values.content,
      keyword: values.keyword,
      user_id: user_id
    }

    try {
      const response = await api.post('/forums', body)
      if (response.status === 200) {
        setLoading(false)
        mutate.forum()
        form.reset()
        toast({
          title: 'Forum telah berhasil dibuat!'
        })
      }
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Gagal dibuat!',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Input name="title" label="Judul" placeholder="Masukan judul" required {...form} />
          <RichText name="content" label="Konten" required {...form} />
          <Input
            name="keyword"
            label="Keyword"
            placeholder="Masukan keyword"
            hint="Format: key1, key2, key3 (Pisahkan dengan koma)"
            {...form}
          />
          <div className="flex justify-end">
            <Button disabled={loading} className="ml-auto" type="submit">
              {loading ? <Loading /> : 'Buat Forum'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
