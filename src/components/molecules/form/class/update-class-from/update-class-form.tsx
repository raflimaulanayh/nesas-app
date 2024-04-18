'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { TOption } from 'types/data/option'
import { Params } from 'types/data/params'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { ClassSchema, defaultValues } from '../schema'

export const ClassUpdateForm = ({ params }: Params) => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)
  const { data: classes, isLoading: loadMajor } = useSWR(`/classes/${params.id}`)

  const MAJOR_OPTIONS: TOption[] = []
  const { data: majors, isLoading: loadClass } = useSWR('/majors')
  if (!loadClass && majors) {
    majors.data.map((item: { short_name: string; id: string }) => {
      return MAJOR_OPTIONS.push({ label: item?.short_name, value: item?.id })
    })
  }

  const form = useForm<z.infer<typeof ClassSchema>>({
    resolver: zodResolver(ClassSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof ClassSchema>) {
    setLoading(true)

    const body = {
      name: values.name,
      major_id: values.major_id
    }

    await api
      .put(`/classes/${params.id}`, body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, kelas berhasil diupdate.'
          })
          TrackUserActivity(user?.email ?? '', 'update', 'Update data kelas : ' + body.name ?? '')

          setTimeout(() => {
            setLoading(false)
            window.location.href = '/dashboard/class'
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
  useEffect(() => {
    if (classes?.data) {
      form.setValue('name', classes?.data?.name || '')
      form.setValue('major_id', classes?.data?.major_id || '')
      // form.setValue('logo', classes?.data?.logo || '');
    }
  }, [classes, form])

  return (
    <Form {...form}>
      {loadMajor && (
        <div className="h-[50vh] w-full flex justify-center items-center">
          <Loading className="w-10 h-10 text-primary" />
        </div>
      )}
      {!loadMajor && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="space-y-4">
            <Input name="name" label="Nama Kelas" placeholder="Masukan nama kelas" hint="Contoh: 12 RPL 2" {...form} />
            <Select name="major_id" label="Jurusan" placeholder="Pilih jurusan" required option={MAJOR_OPTIONS} {...form} />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? <Loading /> : 'Update'}
          </Button>
        </form>
      )}
    </Form>
  )
}
