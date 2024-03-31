'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { useToast } from '@/hooks/use-toast'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Textarea } from '@/components/atoms/form-textarea'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { formSchema } from './schema'

export default function RegisterPage() {
  const user = useCurrentUser()

  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nis: '',
      nisn: '',
      name: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const body = {
      nis: values.nis,
      nisn: values.nisn,
      name: values.name,
      gender: values.gender,
      birth_date: values.birth_date,
      phone_number: values.phone_number,
      address: values.address,
      join_date: values.join_date,
      end_date: values.end_date
    }

    await api
      .post('/api/students', body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, siswa telah berhasil ditambahkan.'
          })
          TrackUserActivity(user?.id ?? '', 'create', 'Tambah data siswa : ' + body.name)

          setTimeout(() => {
            setLoading(false)
            router.push('/dashboard/student')
          }, 1000)
        }
      })
      .catch((e) => {
        setLoading(false)
        if (e.error == 'NIS or NISN is already taken.') {
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
    <SiteLayout>
      <Container>
        <div className="flex flex-col justify-center min-h-screen">
          <div className="sm:mx-auto py-10 sm:w-full sm:max-w-[480px]">
            <h1 className="pb-4 text-2xl font-semibold text-primary">Data lengkap siswa</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="nis" label="NIS" required placeholder="Masukan nis" {...form} />
                  <Input placeholder="Masukan nisn" name="nisn" label="NISN" required {...form} />
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

                  <Textarea name="address" label="Alamat" placeholder="Masukan alamat" {...form} />
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
