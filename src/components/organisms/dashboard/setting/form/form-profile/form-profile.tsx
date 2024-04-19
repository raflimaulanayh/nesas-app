/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { ProfileSchema } from './schema'

export const ProfileForm = ({ user }: any) => {
  const [loading, setLoading] = useState(false)
  const { data: users, isLoading: loadUsers } = useSWR(`/users/${user?.id}`)

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: '',
      email: '',
      photo: []
    }
  })

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setLoading(true)

    let photoUrl: string | undefined
    if (values.photo && values.photo.length > 0) {
      photoUrl = values.photo[0]?.url
    }

    const body = {
      username: values.username,
      email: values.email,
      photo: photoUrl
    }

    await api
      .put(`/users/${user?.id}`, body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, user telah berhasil diupdate.'
          })
          TrackUserActivity(user?.email ?? '', 'update', 'Update data user : ' + body.username ?? '')

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

  useEffect(() => {
    if (users?.data) {
      form.setValue('username', users?.data?.username || '')
      form.setValue('email', users?.data?.email || '')
      // form.setValue('photo', users?.data?.photo || '');
    }
  }, [users, form])

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <Image
          src={user?.photo || '/static/icons/user.svg'}
          alt="Photo Profile"
          width={120}
          height={120}
          className="rounded-md"
        />

        <div>
          <Button variant="default">Ganti Foto</Button>
        </div>
      </div>
      <Form {...form}>
        {loadUsers && (
          <div className="h-[50vh] w-full flex justify-center items-center">
            <Loading className="w-10 h-10 text-primary" />
          </div>
        )}
        {!loadUsers && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="space-y-4">
              <Input name="username" label="Username" placeholder="Masukan username" {...form} />
              <Input name="email" label="Email" type="email" placeholder="Masukan email" {...form} />
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {loading ? <Loading /> : 'Simpan'}
            </Button>
          </form>
        )}
      </Form>
    </div>
  )
}
