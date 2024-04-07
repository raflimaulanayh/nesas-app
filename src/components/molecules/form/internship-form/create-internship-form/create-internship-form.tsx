'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { STATUS_OPTIONS } from '../data-options'
import { defaultValues, formSchema, OptionProps } from '../schema'

export const InternshipCreateForm = () => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)

  const COMPANY_OPTIONS: OptionProps[] = []
  const { data: companies, isLoading: loadCompanies } = useSWR('/internships/companies')
  if (!loadCompanies && companies) {
    companies.data.map((item: { name: string; id: string }) => {
      return COMPANY_OPTIONS.push({ label: item?.name, value: item?.id })
    })
  }

  const STUDENTS_OPTIONS: OptionProps[] = []
  const { data: students, isLoading: loadstudents } = useSWR('/students')
  if (!loadstudents && students) {
    students.data.map((item: { name: string; id: string }) => {
      return STUDENTS_OPTIONS.push({ label: item?.name, value: item?.id })
    })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const students = Array.isArray(values.students) ? values.students : [values.students]

    const body = {
      company_id: values.company_id,
      students: students,
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
            description: 'Selamat, PKL telah berhasil ditambahkan.'
          })
          TrackUserActivity(user?.email ?? '', 'create', 'Tambah data PKL')

          setTimeout(() => {
            setLoading(false)
            window.location.href = '/dashboard/internship'
          }, 2000)
        }
      })
      .catch((e) => {
        setLoading(false)
        toast({
          title: 'Gagal ditambahkan!',
          description: 'Maaf, terjadi kesalahan!',
          variant: 'destructive'
        })
        console.error('Error', e.error)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-4">
          <Select
            name="company_id"
            label="Daftar Perusahaan"
            placeholder="Pilih Perusahaan"
            option={COMPANY_OPTIONS}
            {...form}
          />
          <Select name="students" label="Daftar Siswa" placeholder="Pilih siswa" option={STUDENTS_OPTIONS} {...form} />
          <Input name="start_date" label="Tanggal mulai" type="date" placeholder="Masukan tanggal" {...form} />
          <Input name="end_date" label="Tanggal berakhir" type="date" placeholder="Masukan tanggal" {...form} />
          <Select name="status" label="Status" placeholder="Pilih status" option={STATUS_OPTIONS} {...form} />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {loading ? <Loading /> : 'Tambah'}
        </Button>
      </form>
    </Form>
  )
}
