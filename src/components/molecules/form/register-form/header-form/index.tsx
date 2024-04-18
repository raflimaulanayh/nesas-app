/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { getRegisterSchema } from 'schemas'
import { z } from 'zod'

import { Alert } from '@/components/atoms/alert'
import { TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'

const schema = getRegisterSchema('student')

interface FormFieldsProps {
  form: UseFormReturn<z.infer<typeof schema>>
  tablist: string[]
  handleRole: any
}

export const HeaderForm = ({ tablist, handleRole, form }: FormFieldsProps) => {
  const getCustomRole = (role: string) => {
    if (role == 'student') {
      return 'Siswa'
    } else if (role == 'teacher') {
      return 'Guru'
    } else if (role == 'officer') {
      return 'Perusahaan'
    }

    return 'Siswa'
  }

  return (
    <header className="space-y-4">
      <h2 className="mb-5 text-3xl font-medium leading-9 tracking-tight text-center uppercase text-primary">Register</h2>
      <TabsList className="grid w-full grid-cols-2 bg-slate-100 text-primary">
        {tablist.map((tab: string) => (
          <TabsTrigger
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
            key={tab}
            onClick={() => {
              handleRole(tab.toLowerCase().split(' ')[1] ?? tab.toLowerCase().split(' ')[0])
              form.reset()
            }}
            value={tab.toLowerCase().replace(' ', '-')}
          >
            {getCustomRole(tab)}
          </TabsTrigger>
        ))}
      </TabsList>

      <Alert
        type="info"
        message={
          <p>
            Tanda <span className="text-red-600">*</span> mendandakan data yang wajib diisi.
          </p>
        }
      />
    </header>
  )
}
