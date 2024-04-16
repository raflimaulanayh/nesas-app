'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert } from '@/components/atoms/alert'
import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Textarea } from '@/components/atoms/form-textarea'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'
import { HeaderForm } from '@/components/molecules/header-form'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

import { handleUpdateStatusComplete } from '@/lib/utils/actions/update-status-complete'
import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { formSchema } from './schema'

export default function RegisterPage() {
  const user = useCurrentUser()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nip: '',
      name: '',
      phone_number: '',
      birth_date: '',
      address: ''
    }
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
      end_date: values.end_date,
      user_id: user?.id
    }

    await api
      .post('/teachers', body)
      .then(({ status }) => {
        if (status == 200) {
          handleUpdateStatusComplete(user?.id || '', 'teacher' || '')
          TrackUserActivity(user?.email ?? '', 'create', 'Melengkapi data guru : ' + body.name)
          toast({
            title: 'Berhasil!',
            description: 'Selamat, data guru telah berhasil dilengkapi.'
          })
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
        } else if (e.error == 'User is already taken.') {
          toast({
            title: 'Gagal ditambahkan!',
            description: 'Tidak bisa membuat data siswa lebih dari 1 kali.',
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
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <SiteLayout title="Lengkapi Data Guru">
      <Container>
        <div className="flex flex-col justify-center min-h-screen">
          <div className="max-w-4xl py-10 sm:mx-auto sm:w-full">
            <HeaderForm title="Data lengkap guru" url="/auth/register/complete" />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <div className="space-y-4">
                  <Alert
                    type="info"
                    message={
                      <p>
                        Tanda <span className="text-red-600">*</span> mendandakan data input yang harus diisi
                      </p>
                    }
                  />
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
                  <Input
                    name="birth_date"
                    label="Tanggal lahir"
                    required
                    type="date"
                    placeholder="Masukan tanggal lahir"
                    {...form}
                  />

                  <Input name="join_date" label="Tanggal Masuk" type="date" placeholder="Masukan tanggal masuk" {...form} />

                  <Input name="end_date" label="Tanggal Keluar" type="date" placeholder="Masukan tanggal keluar" {...form} />

                  <Textarea name="address" label="Alamat" placeholder="Masukan alamat" required {...form} />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                  {loading ? <Loading /> : 'Submit'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}
