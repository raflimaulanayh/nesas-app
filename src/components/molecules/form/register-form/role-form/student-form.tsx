'use client'

import { UseFormReturn } from 'react-hook-form'
import { getRegisterSchema } from 'schemas'
import useSWR from 'swr'
import { z } from 'zod'

import { FileUploads } from '@/components/atoms/form-file-upload'
import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Textarea } from '@/components/atoms/form-textarea'

import { GENDER_OPTIONS, GRADUATE_STATUS_OPTIONS, OptionProps } from '../data-options'

const schema = getRegisterSchema('officer')

interface FormFieldsProps {
  form: UseFormReturn<z.infer<typeof schema>>
}

export const StudentForm = ({ form }: FormFieldsProps) => {
  const CLASS_OPTIONS: OptionProps[] = []
  const { data: classes, isLoading: loadClass } = useSWR('/classes')
  if (!loadClass && classes) {
    classes.data.map((item: { name: string; id: string }) => {
      return CLASS_OPTIONS.push({ label: item?.name, value: item?.id })
    })
  }

  return (
    <div className="p-4 space-y-4 rounded-sm bg-slate-50">
      <h3 className="font-medium text-primary">Informasi Siswa</h3>
      <Input name="nis" label="NIS" required placeholder="Masukan NIS" {...form} />
      <Input placeholder="Masukan NISN" name="nisn" label="NISN" required {...form} />
      <Input placeholder="Masukan nama" name="name" label="Nama" required {...form} />
      <Select name="class_id" label="Kelas" required searchAble placeholder="Pilih kelas" option={CLASS_OPTIONS} {...form} />
      <Input name="birth_date" label="Tanggal lahir" required type="date" placeholder="Masukan tanggal lahir" {...form} />
      <Select
        name="gender"
        label="Jenis Kelamin"
        required
        placeholder="Pilih Jenis Kelamin"
        option={GENDER_OPTIONS}
        {...form}
      />
      <Select
        name="graduate_status"
        label="Status"
        required
        placeholder="Pilih Status"
        option={GRADUATE_STATUS_OPTIONS}
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

      <Input name="join_date" label="Tanggal Masuk" type="date" placeholder="Masukan tanggal masuk" {...form} />

      <Input name="end_date" label="Tanggal Keluar" type="date" placeholder="Masukan tanggal keluar" {...form} />

      <Textarea name="address" label="Alamat" placeholder="Masukan alamat" required {...form} />

      <FileUploads name="proof" label="Bukti" hint="Ini bisa berupa Kartu Pelajar / NISN" required {...form} />
    </div>
  )
}
