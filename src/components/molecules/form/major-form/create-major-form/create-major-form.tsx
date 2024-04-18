'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FileUploads } from '@/components/atoms/form-file-upload'
import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { defaultValues, MajorSchema } from '../schema'

export const MajorCreateForm = () => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof MajorSchema>>({
    resolver: zodResolver(MajorSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof MajorSchema>) {
    setLoading(true)

    let logoUrl: string | undefined
    if (values.logo && values.logo.length > 0) {
      logoUrl = values.logo[0]?.url
    }

    const body = {
      long_name: values.long_name,
      short_name: values.short_name,
      logo: logoUrl
    }

    await api
      .post('/majors', body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, jurusan berhasil ditambahkan.'
          })
          TrackUserActivity(user?.email ?? '', 'create', 'Tambah data jurusan : ' + body.short_name ?? '')

          setTimeout(() => {
            setLoading(false)
            window.location.href = '/dashboard/major'
          }, 2000)
        }
      })
      .catch(() => {
        setLoading(false)
        toast({
          title: 'Gagal ditambahkan!',
          description: 'Maaf, terjadi kesalahan!',
          variant: 'destructive'
        })
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-4">
          <Input name="long_name" label="Nama lengkap" placeholder="Masukan nama lengkap" {...form} />
          <Input
            name="short_name"
            label="Singkatan nama"
            placeholder="Masukan singkatan nama"
            hint="Contoh: RPL, TKJ..."
            {...form}
          />
          <FileUploads name="logo" label="Logo" {...form} />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {loading ? <Loading /> : 'Tambah'}
        </Button>
      </form>
    </Form>
  )
}
