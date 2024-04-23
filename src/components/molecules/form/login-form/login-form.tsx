'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHydration } from '@/hooks/use-hydration'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema } from 'schemas'
import * as z from 'zod'

import { Alert } from '@/components/atoms/alert'
import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'

import { login } from '@/lib/utils/actions/login'

export const LoginForm = () => {
  const isHydrated = useHydration()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setIsSubmitting(true)

    try {
      const data = await login(values, callbackUrl)

      if (data?.error) {
        setError(data.error)
      }

      if (data?.success) {
        setSuccess(data.success)
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Something went wrong!')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="px-6 py-10 bg-white border-2 rounded-md shadow-md sm:px-12">
      <h2 className="mb-5 text-3xl font-medium leading-9 tracking-tight text-center uppercase text-primary">Login</h2>
      {!isHydrated && (
        <div className="flex items-center justify-center min-h-[18rem]">
          <Loading />
        </div>
      )}
      {isHydrated && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && <Alert message={error} type="error" />}
            {success && <Alert message={success} type="success" />}
            <Input name="email" label="Email" required placeholder="Masukan alamat email" {...form} />
            <Input name="password" label="Password" required type="password" placeholder="Masukan password" {...form} />
            <div className="flex justify-center py-2">
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loading /> : 'Login'}
              </Button>
            </div>
            <div className="space-y-1">
              <p className="text-center text-gray-700 ">
                <span>Belum punya akun?</span>
                <Link href="/auth/register">
                  <span className="text-indigo-700 hover:underline"> Register sekarang</span>
                </Link>
              </p>
              <p className="text-center text-gray-600">
                <Link href="/auth/reset-password">
                  <span className="text-indigo-700 hover:underline">Lupa password</span>
                </Link>
              </p>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
