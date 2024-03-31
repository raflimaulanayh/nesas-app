'use client'

import { useHydration } from '@/hooks/use-hydration'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { NewPasswordSchema } from 'schemas'
import { z } from 'zod'

import { Alert } from '@/components/atoms/alert'
import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'

import { newPassword } from '@/lib/utils/actions/new-password'

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const isHydrated = useHydration()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)

        if (data.success) {
          setTimeout(() => {
            window.location.href = '/auth/login'
          }, 5000)
        }
      })
    })
  }

  return (
    <>
      {!isHydrated && (
        <div className="flex items-center justify-center min-h-[18rem]">
          <Loading />
        </div>
      )}
      {isHydrated && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && <Alert message={error} type="error" />}
            <Input name="password" label="Password" required type="password" placeholder="******" {...form} />
            {success && <Alert message={success} type="success" />}
            <div className="flex justify-center py-2">
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                disabled={isPending}
              >
                {isPending ? <Loading /> : 'Reset password'}
              </Button>
            </div>
            <div className="space-y-1 text-center">
              <Link href="/auth/login">
                <span className="text-indigo-700 hover:underline">Kembali ke login</span>
              </Link>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}
