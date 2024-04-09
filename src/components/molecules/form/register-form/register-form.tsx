/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useHydration } from '@/hooks/use-hydration'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from 'schemas'
import * as z from 'zod'

import { Alert } from '@/components/atoms/alert'
import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'

import { register } from '@/lib/utils/actions/register'

export const RegisterForm = () => {
  const isHydrated = useHydration()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <div className="px-6 py-10 bg-white border-2 rounded-md shadow-md sm:px-12">
      <h1 className="mb-5 text-3xl font-medium leading-9 tracking-tight text-center uppercase text-primary">Register</h1>
      {!isHydrated && (
        <div className="flex items-center justify-center min-h-[18rem]">
          <Loading />
        </div>
      )}
      {isHydrated && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && <Alert message={error} type="error" />}
            <Input name="username" label="Username" required placeholder="Masukan username" {...form} />
            <Input name="email" label="Email" required placeholder="Masukan alamat email" {...form} />
            <Input name="password" label="Password" required type="password" placeholder="Masukan password" {...form} />
            {success && <Alert message={success} type="success" />}
            <div className="flex justify-center py-2">
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                disabled={isPending}
              >
                {isPending ? <Loading /> : 'Register'}
              </Button>
            </div>
            <div className="space-y-1">
              <p className="text-center text-gray-700 ">
                <span>Sudah punya akun?</span>
                <Link href="/auth/login">
                  <span className="text-indigo-700 hover:underline"> Login</span>
                </Link>
              </p>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
