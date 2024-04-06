'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Textarea } from '@/components/atoms/form-textarea'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { defaultValues, formSchema } from './schema'

export const TeacherCreateForm = () => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const body = {
      nip: values.nip,
      name: values.name,
      gender: values.gender,
      birth_date: values.birth_date,
      phone_number: values.phone_number,
      address: values.address,
      join_date: values.join_date,
      end_date: values.end_date
    }

    await api
      .post('/teachers', body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, guru telah berhasil ditambahkan.'
          })
          TrackUserActivity(user?.email ?? '', 'create', 'Tambah data guru : ' + body.name)

          setTimeout(() => {
            setLoading(false)
            window.location.href = '/dashboard/teacher'
          }, 1000)
        }
      })
      .catch((e) => {
        setLoading(false)
        if (e.error == 'NIP is already taken.') {
          toast({
            title: 'Gagal ditambahkan!',
            description: 'NIP sudah ada!.',
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
        <Input name="nip" label="NIP" placeholder="Masukan NIP" hint="Abaikan jika tidak memiliki NIP" {...form} />
        <Input placeholder="Masukan nama" name="name" label="Nama" required {...form} />
        <Select
          name="gender"
          label="Jenis Kelamin"
          required
          placeholder="Pilih Jenis Kelamin"
          option={[
            {
              value: 'male',
              label: 'Laki-Laki'
            },
            {
              value: 'female',
              label: 'Perempuan'
            }
          ]}
          {...form}
        />
        <Input name="phone_number" label="No. HP" required placeholder="Masukan nomor HP" {...form} />
        <Input name="birth_date" label="Tanggal lahir" required type="date" placeholder="Masukan tanggal lahir" {...form} />

        <Input name="join_date" label="Tanggal Masuk" type="date" placeholder="Masukan tanggal masuk" {...form} />

        <Input name="end_date" label="Tanggal Keluar" type="date" placeholder="Masukan tanggal keluar" {...form} />

        <Textarea name="address" label="Alamat" placeholder="Masukan alamat" required {...form} />
        <Button disabled={loading} className="ml-auto" type="submit">
          {loading ? <Loading /> : 'Tambah'}
        </Button>
      </form>
    </Form>
  )
}
