'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Alert } from '@/components/atoms/alert'
import { Loading } from '@/components/atoms/icons'

import { newVerification } from '@/lib/utils/actions/new-verification-token'

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError('Missing token!')

      return
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)

        if (data.success) {
          setTimeout(() => {
            window.location.href = '/auth/login'
          }, 5000)
        }
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className="flex flex-col items-center px-6 py-10 space-y-6 bg-white border-2 rounded-md shadow-md sm:px-12">
      <h1 className="text-3xl font-bold leading-9 tracking-tight text-center text-primary">Email Verifikasi</h1>
      {!success && !error && <Loading className="w-10 h-10" />}
      {success && <Alert type="success" message={success} />}
      {error && <Alert type="error" message={error} />}

      <Link href="/auth/login" className="underline text-primary">
        Kembali ke halaman login
      </Link>
    </div>
  )
}
