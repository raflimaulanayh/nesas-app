'use client'

import { useHydration } from '@/hooks/use-hydration'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { ResetSchema } from 'schemas'
import { z } from 'zod'

import { Alert } from '@/components/atoms/alert'
import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

import { resetPassword } from '@/lib/utils/actions/reset-password'

export default function ResetPasswordPage() {
  const isHydrated = useHydration()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <SiteLayout>
      <Container>
        <div className="flex flex-col justify-center min-h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="px-6 py-10 bg-white shadow sm:rounded-lg sm:px-12">
              <h1 className="mb-5 text-3xl font-bold leading-9 tracking-tight text-center text-primary">Lupa password?</h1>
              {!isHydrated && (
                <div className="flex items-center justify-center min-h-[18rem]">
                  <Loading />
                </div>
              )}
              {isHydrated && (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {error && <Alert message={error} type="error" />}
                    <Input name="email" label="Email" required type="email" placeholder="Masukan email" {...form} />
                    {success && <Alert message={success} type="success" />}
                    <div className="flex justify-center py-2">
                      <Button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                        disabled={isPending}
                      >
                        {isPending ? <Loading /> : 'Send reset email'}
                      </Button>
                    </div>
                    <div className="space-y-1 text-center ">
                      <Link href="/auth/login">
                        <span className="text-indigo-700 hover:underline">Kembali ke login</span>
                      </Link>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}
