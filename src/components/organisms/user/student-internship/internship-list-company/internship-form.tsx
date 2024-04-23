/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

export const FormChoiceInternsip = ({ companyId }: any) => {
  const user = useCurrentUser()
  const { data: users } = useSWR(`/users/${user?.id}`)
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    start_date: z.string().nonempty({
      message: 'Tanggal mulai harus diisi'
    }),
    end_date: z.string().nonempty({
      message: 'Tanggal berakhir harus diisi'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_date: '',
      end_date: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    if (!users || !users.data || !users.data.students || users.data.students.length === 0) {
      toast({
        title: 'Error!',
        description: 'Data mahasiswa tidak tersedia atau tidak valid.',
        variant: 'destructive'
      })
      setLoading(false)

      return
    }

    const studentId = users.data.students.id

    const body = {
      company_id: companyId,
      students: [studentId],
      start_date: values.start_date,
      end_date: values.end_date,
      status: 'pending'
    }

    try {
      const response = await api.post('/internships', body)
      if (response.status === 200) {
        toast({
          title: 'Berhasil!',
          description: 'Selamat, Anda berhasil memilih tempat PKL.'
        })
        mutate('/internships')
        TrackUserActivity(user?.email ?? 'no-identifier', 'create', 'Memilih tempat PKL')
        form.reset()
      }
    } catch (error: any) {
      toast({
        title: 'Gagal diajukan!',
        description: 'Maaf, terjadi kesalahan!',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            name="start_date"
            label="Tanggal Mulai"
            type="date"
            placeholder="Masukkan tanggal mulai"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
            {...form}
          />
          <Input
            name="end_date"
            label="Tanggal Berakhir"
            type="date"
            placeholder="Masukkan tanggal berakhir"
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
