'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import { z } from 'zod'

import { Checkbox } from '@/components/atoms/form-checkbox'
import { Input } from '@/components/atoms/form-input'
import { RichText } from '@/components/atoms/form-rich-text'
import { Textarea } from '@/components/atoms/form-textarea'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

interface OptionProps {
  label: string
  value: string
  checked?: boolean
  other?: string
}

export const FormSubmissionCompany = () => {
  const user = useCurrentUser()

  const MAJOR_OPTIONS: OptionProps[] = []
  const { data: majors, isLoading: loadMajors } = useSWR('/majors')

  if (!loadMajors && majors) {
    majors.data.map((item: { short_name: string; id: string }) => {
      return MAJOR_OPTIONS.push({ label: item.short_name, value: item.id })
    })
  }

  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    name: z.string().nonempty({
      message: 'Nama perusahaan harus diisi'
    }),
    address: z.string().nonempty({
      message: 'Alamat mulai harus diisi'
    }),
    contact: z.string().nonempty({
      message: 'Kontak harus diisi'
    }),
    leader_name: z.optional(
      z.string().nonempty({
        message: 'Nama pimpinan harus diisi'
      })
    ),
    majors: z.array(z.string().nonempty()).min(1, { message: 'Pilih minimal satu jurusan' }),
    status: z.string().nonempty({
      message: 'Status harus diisi'
    }),
    quota: z.string().nonempty({
      message: 'Jumlah kuota harus diisi'
    }),
    requirements: z.optional(z.string())
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      contact: '',
      leader_name: '',
      majors: [],
      status: 'pending',
      quota: '',
      requirements: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const majors = values.majors.map((major: string) => major)

    const body = {
      name: values.name,
      address: values.address,
      contact: values.contact,
      majors: majors,
      leader_name: values.leader_name,
      status: values.status,
      quota: parseInt(values.quota),
      requirements: values.requirements
    }

    console.log(body)

    await api
      .post('/internships/companies', body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, anda telah berhasil mengajukan tempat PKL.'
          })
          mutate('/internships/companies')
          TrackUserActivity(user?.email ?? 'no-identifier', 'create', 'Mengajukan tempat PKL')
          form.reset()
          form.setValue('requirements', '')

          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
      .catch(() => {
        setLoading(false)
        toast({
          title: 'Gagal mengajukan!',
          description: 'Maaf, terjadi kesalahan!',
          variant: 'destructive'
        })
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="name" label="Nama Perusahaan" placeholder="Masukan nama perusahaan" {...form} />
          <Input
            name="contact"
            label="Kontak Perusahaan"
            hint="Contoh Format: 081320179999, info@gmail.com"
            placeholder="Masukan kontak perusahaan"
            {...form}
          />
          <Input name="quota" label="Jumlah Kuota" type="number" placeholder="Masukan jumlah kuota" {...form} />
          <Input name="leader_name" label="Nama Pimpinan" placeholder="Masukan nama pimpinan" {...form} />
          <Checkbox name="majors" label="Jurusan Relevan" options={MAJOR_OPTIONS} {...form} />
          <RichText name="requirements" label="Persyaratan" height="400px" {...form} />
          <Textarea name="address" label="Alamat" placeholder="Masukan alamat lengkap" {...form} />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {loading ? <Loading /> : 'Ajukan'}
        </Button>
      </form>
    </Form>
  )
}
