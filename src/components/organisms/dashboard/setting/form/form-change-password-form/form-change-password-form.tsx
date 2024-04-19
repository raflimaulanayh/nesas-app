/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { ChangePasswordSchema } from './schema'

export const ChangePasswordForm = ({ user }: any) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current_password: '',
      password: '',
      password_confirmation: ''
    }
  })

  async function onSubmit(values: z.infer<typeof ChangePasswordSchema>) {
    setLoading(true)

    const body = {
      password: values.password
    }

    await api
      .put(`/users/${user?.id}`, body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, user telah berhasil diupdate.'
          })
          TrackUserActivity(user?.email ?? '', 'update', 'Update data user : ' + user?.name ?? '')

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
            title: 'Gagal diupdate!',
            description: 'Email atau Username yang anda masukan sudah terdaftar.',
            variant: 'destructive'
          })
        } else {
          toast({
            title: 'Gagal diupdate!',
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
          <Input
            name="current_password"
            label="Password saat ini"
            placeholder="Masukan password saat ini"
            type="password"
            {...form}
          />
          <Input name="password" label="password baru" placeholder="Masukan password baru" type="password" {...form} />
          <Input
            name="password_confirmation"
            label="Konfirmasi password"
            placeholder="Masukan konfirmasi password"
            type="password"
            {...form}
          />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {loading ? <Loading /> : 'Ubah'}
        </Button>
      </form>
    </Form>
  )
}
