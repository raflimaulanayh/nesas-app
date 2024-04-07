/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
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

export const FormChoiceInternsip = ({ companyId }: any) => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    student_id: z.array(
      z.string().nonempty({
        message: 'Nama Lengkap harus diisi'
      })
    ),
    start_date: z.string().nonempty({
      message: 'Tanggal mulai harus diisi'
    }),
    end_date: z.string().nonempty({
      message: 'Tanggal berakhir harus diisi'
    }),
    status: z.string().nonempty({
      message: 'Tanggal berakhir harus diisi'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: ['clunq1jzn00013nwj1o5e6r3u'],
      start_date: '',
      end_date: '',
      status: 'pending'
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const body = {
      company_id: companyId,
      student_id: values.student_id,
      start_date: values.start_date,
      end_date: values.end_date,
      status: values.status
    }

    await api
      .post('/internships', body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, anda telah berhasil memilih tempat PKL.'
          })
          TrackUserActivity(user?.email ?? '', 'create', 'Memilih tempat PKL')

          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }
      })
      .catch(() => {
        setLoading(false)
        toast({
          title: 'Gagal diajukan!',
          description: 'Maaf, terjadi kesalahan!',
          variant: 'destructive'
        })
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="start_date"
            label="Tanggal Mulai"
            type="date"
            placeholder="Masukan tanggal mulai"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
            {...form}
          />
          <Input
            name="end_date"
            label="Tanggal Berakhir"
            type="date"
            placeholder="Masukan tanggal berakhir"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
            {...form}
          />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {loading ? <Loading /> : 'Ajukan'}
        </Button>
      </form>
    </Form>
  )
}
