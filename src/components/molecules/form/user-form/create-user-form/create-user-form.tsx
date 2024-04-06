'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FileUploads } from '@/components/atoms/form-file-upload'
import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { ROLES_OPTIONS, STATUS_USER_OPTIONS } from '../data-options'
import { defaultValues, formSchema } from '../schema'

export const UserCreateForm = () => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    let photoUrl: string | undefined
    if (values.photo && values.photo.length > 0) {
      photoUrl = values.photo[0]?.url
    }

    const status = values.active == 'true'

    const body = {
      username: values.username,
      email: values.email,
      role: values.role,
      password: values.password,
      active: status,
      photo: photoUrl
    }

    await api
      .post('/users', body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, user telah berhasil ditambahkan.'
          })
          TrackUserActivity(user?.email ?? '', 'create', 'Tambah data user : ' + body.username ?? '')

          setTimeout(() => {
            setLoading(false)
            window.location.href = '/dashboard/user'
          }, 2000)
        }
      })
      .catch((e) => {
        setLoading(false)
        if (e.error == 'Email is already taken.') {
          toast({
            title: 'Gagal ditambahkan!',
            description: 'Email atau Username yang anda masukan sudah terdaftar.',
            variant: 'destructive'
          })
        } else {
          toast({
            title: 'Gagal ditambahkan!',
            description: 'Maaf, terjadi kesalahan!',
            variant: 'destructive'
          })
        }
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-4">
          <Input name="username" label="Username" placeholder="Masukan username" {...form} />
          <Input name="email" label="Email" type="email" placeholder="Masukan email" {...form} />
          <Select name="role" label="Role" placeholder="Pilih role" option={ROLES_OPTIONS} {...form} />
          <Input name="password" label="Password" type="password" placeholder="Masukan password" {...form} />
          <Select name="active" label="Status" placeholder="Pilih status" option={STATUS_USER_OPTIONS} {...form} />
          <FileUploads name="photo" label="Foto" {...form} />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {loading ? <Loading /> : 'Tambah'}
        </Button>
      </form>
    </Form>
  )
}
