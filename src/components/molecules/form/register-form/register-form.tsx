/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useHydration } from '@/hooks/use-hydration'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { getRegisterSchema } from 'schemas'
import * as z from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Form } from '@/components/atoms/ui/form'
import { Tabs, TabsContent } from '@/components/atoms/ui/tabs'

import { register } from '@/lib/utils/actions/register'

import { FooterForm } from './footer-form'
import { HeaderForm } from './header-form'
import { StudentForm, TeacherForm } from './role-form'
import { defaultValues } from './schema'

export const RegisterForm = () => {
  const tablist = ['student', 'teacher']
  const [role, setRole] = useState<string>('student')
  const isHydrated = useHydration()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const schema = getRegisterSchema(role || 'student')
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  })

  console.log(form.formState.errors)
  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log('Form values:', values)
    setError('')

    const formValuesWithRole = { ...values, role }

    startTransition(() => {
      register(formValuesWithRole).then(async (data) => {
        setError(data?.error)
        setSuccess(data?.success)
        if (data?.success) {
          form.reset()

          if (data?.redirectUrl) {
            window.location.href = data.redirectUrl
          }
        }
      })
    })
  }

  return (
    <Tabs defaultValue="student" className="w-full">
      <div className="px-6 py-10 space-y-4 bg-white border-2 rounded-md shadow-md">
        <HeaderForm form={form} tablist={tablist} handleRole={setRole} />
        {!isHydrated && (
          <div className="flex items-center justify-center min-h-[18rem]">
            <Loading />
          </div>
        )}
        {isHydrated && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="p-4 space-y-4 rounded-sm bg-slate-50">
                <h3 className="font-medium text-primary">Informasi Akun</h3>
                <Input name="username" label="Username" required placeholder="Masukan username" {...form} />
                <Input name="email" label="Email" required placeholder="Masukan alamat email" {...form} />
                <Input name="password" label="Password" required type="password" placeholder="Masukan password" {...form} />
              </div>

              <TabsContent value="student" className="space-y-4">
                <StudentForm form={form} />
              </TabsContent>

              <TabsContent value="teacher">
                <TeacherForm form={form} />
              </TabsContent>

              {/* <TabsContent value="officer">
                <OfficerForm form={form} />
              </TabsContent> */}

              <FooterForm success={success} error={error} isPending={isPending} />
            </form>
          </Form>
        )}
      </div>
    </Tabs>
  )
}
