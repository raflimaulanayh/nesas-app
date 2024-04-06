'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { Params } from 'types/data/params'
import { z } from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Textarea } from '@/components/atoms/form-textarea'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { defaultValues, formSchema, OptionProps } from '../schema'

export const StudentUpdateForm = ({ params }: Params) => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)

  const CLASS_OPTIONS: OptionProps[] = []
  const { data: student, isLoading: loadStudents } = useSWR(`/students/${params.id}`)
  const { data: classes, isLoading: loadClass } = useSWR('/classes')
  if (!loadClass && classes) {
    classes.data.map((item: { name: string; id: string }) => {
      return CLASS_OPTIONS.push({ label: item?.name, value: item?.id })
    })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const body = {
      nis: values.nis,
      nisn: values.nisn,
      name: values.name,
      class_id: values.class_id,
      gender: values.gender,
      birth_date: values.birth_date,
      phone_number: values.phone_number,
      phone_number_parent: values.phone_number_parent,
      address: values.address,
      join_date: values.join_date,
      end_date: values.end_date
    }

    await api
      .put(`/students/${params.id}`, body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, data siswa telah berhasil diupdate.'
          })
          TrackUserActivity(user?.email ?? '', 'update', 'Mengupdate data siswa : ' + body.name)

          setTimeout(() => {
            window.location.href = '/dashboard/student'
          })
        }
      })
      .catch((e) => {
        setLoading(false)
        if (e.error == 'NIS or NISN is already taken.') {
          toast({
            title: 'Gagal ditambahkan!',
            description: 'NIS or NISN sudah ada!.',
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

  useEffect(() => {
    if (student) {
      form.setValue('nis', student?.data.nis || '')
      form.setValue('nisn', student?.data.nisn || '')
      form.setValue('name', student?.data.name || '')
      form.setValue('class_id', student?.data.class_id || '')
      form.setValue('gender', student?.data.gender || '')
      form.setValue('birth_date', student?.data.birth_date || '')
      form.setValue('phone_number', student?.data.phone_number || '')
      form.setValue('phone_number_parent', student?.data.phone_number_parent || '')
      form.setValue('address', student?.data.address || '')
      form.setValue('join_date', student?.data.join_date || '')
      form.setValue('end_date', student?.data.end_date || '')
    }
  }, [student, form])

  return (
    <Form {...form}>
      {loadStudents && (
        <div className="flex justify-center h-[50vh] items-center">
          <Loading className="w-10 h-10 text-primary" />
        </div>
      )}
      {!loadStudents && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="space-y-4">
            <Input name="nis" label="NIS" required placeholder="Masukan NIS" {...form} />
            <Input placeholder="Masukan NISN" name="nisn" label="NISN" required {...form} />
            <Input placeholder="Masukan nama" name="name" label="Nama" required {...form} />
            <Select
              name="class_id"
              label="Kelas"
              required
              searchAble
              placeholder="Pilih kelas"
              option={CLASS_OPTIONS}
              {...form}
            />
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
              name="phone_number_parent"
              label="No. HP orang tua/wali"
              required
              placeholder="Masukan nomor HP orang tua/wali"
              {...form}
            />
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
            {loading ? <Loading /> : 'Update'}
          </Button>
        </form>
      )}
    </Form>
  )
}
