import { UseFormReturn } from 'react-hook-form'
import { getRegisterSchema } from 'schemas'
import { z } from 'zod'

import { FileUploads } from '@/components/atoms/form-file-upload'
import { Input } from '@/components/atoms/form-input'
import { Select } from '@/components/atoms/form-select'
import { Textarea } from '@/components/atoms/form-textarea'

import { GENDER_OPTIONS } from '../data-options'

const schema = getRegisterSchema('teacher')

interface FormFieldsProps {
  form: UseFormReturn<z.infer<typeof schema>>
}

export const TeacherForm = ({ form }: FormFieldsProps) => {
  return (
    <div className="p-4 space-y-4 rounded-sm bg-slate-50">
      <h3 className="font-medium text-primary">Informasi Guru</h3>
      <Input name="nip" label="NIP" placeholder="Masukan NIP" hint="Abaikan jika tidak memiliki NIP" {...form} />
      <Input placeholder="Masukan nama" name="name" label="Nama" required {...form} />
      <Input name="birth_date" label="Tanggal lahir" required type="date" placeholder="Masukan tanggal lahir" {...form} />
      <Select
        name="gender"
        label="Jenis Kelamin"
        required
        placeholder="Pilih Jenis Kelamin"
        option={GENDER_OPTIONS}
        {...form}
      />
      <Input name="phone_number" label="No. HP" required placeholder="Masukan nomor HP" {...form} />

      <Input name="join_date" label="Tanggal Masuk" type="date" placeholder="Masukan tanggal masuk" {...form} />

      <Input name="end_date" label="Tanggal Keluar" type="date" placeholder="Masukan tanggal keluar" {...form} />

      <Textarea name="address" label="Alamat" placeholder="Masukan alamat" required {...form} />

      <FileUploads name="proof" label="Bukti" hint="Ini bisa berupa Kartu NUPTK / KTP" required {...form} />
    </div>
  )
}
