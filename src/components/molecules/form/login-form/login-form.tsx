/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useHydration } from '@/hooks/use-hydration'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Input } from '@/components/atoms/form-input'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

export const LoginForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const isHydrated = useHydration()
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    email: z
      .string()
      .nonempty({
        message: 'Email harus diisi'
      })
      .email({
        message: 'Email tidak valid'
      }),
    password: z
      .string()
      .nonempty({
        message: 'Password harus diisi'
      })
      .min(6, {
        message: 'Password minimal 6 karakter'
      })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const signed: any = await signIn('credentials', {
      redirect: false,
      password: values.password,
      identifier: values.email
    })
    if (signed.error && signed.error === 'CredentialsSignin') {
      toast({
        title: 'email & password salah',
        variant: 'destructive'
      })
      setLoading(false)
    } else {
      toast({
        title: 'Login sukses'
      })
      setLoading(false)
      TrackUserActivity('anonymous', 'signin', 'User ' + values.email + ' Telah berhasil login')

      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
  }

  return (
    <div className="px-6 py-10 bg-white shadow sm:rounded-lg sm:px-12">
      <h1 className="mb-5 text-3xl font-bold leading-9 tracking-tight text-center uppercase text-primary">Login</h1>
      {!isHydrated && (
        <div className="flex items-center justify-center min-h-[18rem]">
          <Loading />
        </div>
      )}
      {isHydrated && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input name="email" label="Email" required placeholder="Masukan alamat email" {...form} />
            <Input name="password" label="Password" required type="password" placeholder="Masukan password" {...form} />
            <div className="flex justify-center py-2">
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                disabled={loading}
              >
                {loading ? <Loading /> : 'Login'}
              </Button>
            </div>
            <div className="space-y-1">
              <p className="text-center text-gray-700 ">
                <span>Belum punya akun?</span>
                <Link href="/register">
                  <span className="text-indigo-700 hover:underline"> Register sekarang</span>
                </Link>
              </p>
              <p className="text-center text-gray-600">
                <Link href="/forgot-password">
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
