'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { Params } from 'types/data/params'
import { z } from 'zod'

import { FileUploads } from '@/components/atoms/form-file-upload'
import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { MajorSchema, defaultValues } from '../schema'

export const MajorUpdateForm = ({ params }: Params) => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)
  const { data: majors, isLoading: loadMajor } = useSWR(`/majors/${params.id}`)

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
      .put(`/majors/${params.id}`, body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, jurusan berhasil diupdate.'
          })
          TrackUserActivity(user?.email ?? '', 'update', 'Update data jurusan : ' + body.short_name ?? '')

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

  useEffect(() => {
    if (majors?.data) {
      form.setValue('long_name', majors?.data?.long_name || '')
      form.setValue('short_name', majors?.data?.short_name || '')
      // form.setValue('logo', majors?.data?.logo || '');
    }
  }, [majors, form])

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
            {loading ? <Loading /> : 'Update'}
          </Button>
        </form>
      )}
    </Form>
  )
}
