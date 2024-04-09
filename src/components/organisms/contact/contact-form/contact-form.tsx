'use client'

import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Textarea } from '@/components/atoms/form-textarea'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { defaultValues, formSchema } from './schema'

export const ContactForm = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const body = {
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      subject: values.subject || 'Pesan dari user Nesas Smart School',
      message: values.message
    }

    try {
      const response = await api.post('/contacts', body)
      if (response.status === 200) {
        setLoading(false)
        form.reset()
        toast({
          title: 'Berhasil!',
          description: 'Selamat, pesan telah berhasil dikirim.'
        })
      }
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Gagal ditambahkan!',
        description: 'Maaf, terjadi kesalahan!',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 py-14 lg:py-20 lg:px-8">
        <div className="max-w-xl mx-auto space-y-6 lg:mr-0 lg:max-w-lg">
          <div className="space-y-6">
            <Input name="fullName" label="Nama Lengkap" placeholder="Masukkan nama lengkap" required {...form} />
            <Input name="email" label="Email" placeholder="Masukkan email" required {...form} />
            <Input
              name="phoneNumber"
              label="No. HP / Whatsapp"
              placeholder="Masukkan nomor hp/whatsapp"
              hint="Contoh : 081xxxxxxxxx"
              required
              {...form}
            />
            <Input name="subject" label="Subjek" placeholder="Masukkan subjek" {...form} />
            <Textarea name="message" label="Pesan" placeholder="Masukkan pesan" required {...form} />
          </div>
          <div className="flex justify-end">
            <Button disabled={loading} className="ml-auto" type="submit">
              {loading ? <Loading /> : 'Kirim pesan'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
