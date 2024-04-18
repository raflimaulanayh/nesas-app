'use client'

import { UseFormReturn } from 'react-hook-form'
import { getRegisterSchema } from 'schemas'
import useSWR from 'swr'
import { z } from 'zod'

import { Checkbox } from '@/components/atoms/form-checkbox'
import { Input } from '@/components/atoms/form-input'
import { RichText } from '@/components/atoms/form-rich-text'
import { Textarea } from '@/components/atoms/form-textarea'

import { OptionProps } from '../data-options'

const schema = getRegisterSchema('officer')

interface FormFieldsProps {
  form: UseFormReturn<z.infer<typeof schema>>
}

export const OfficerForm = ({ form }: FormFieldsProps) => {
  const MAJOR_OPTIONS: OptionProps[] = []
  const { data: majors, isLoading: loadMajors } = useSWR('/majors')

  if (!loadMajors && majors) {
    majors.data.map((item: { name: string; id: string }) => {
      return MAJOR_OPTIONS.push({ label: item.name, value: item.id })
    })
  }

  return (
    <div className="p-4 space-y-4 rounded-sm bg-slate-50">
      <h3 className="font-medium text-primary">Informasi Perusahaan</h3>
      <Input name="name" label="Nama Perusahaan" placeholder="Masukan nama perusahaan" required {...form} />
      <Input
        name="contact"
        label="Kontak Perusahaan"
        hint="Contoh Format: 081320179999, info@gmail.com (isi min. 1 kontak)"
        placeholder="Masukan kontak perusahaan"
        required
        {...form}
      />
      <Input name="quota" label="Jumlah Kuota" type="number" placeholder="Masukan jumlah kuota" {...form} />
      <Input name="leader_name" label="Nama Pimpinan" placeholder="Masukan nama pimpinan" {...form} />
      <Checkbox name="majors" label="Jurusan Relevan" options={MAJOR_OPTIONS} {...form} />
      {/* <Textarea name="requirements" label="Persyaratan" placeholder="Masukan persyaratan" {...form} /> */}
      <RichText height="200px" name="requirements" label="Persyaratan" {...form} />
      <Textarea name="address" label="Alamat" placeholder="Masukan alamat lengkap" {...form} />
    </div>
  )
}
