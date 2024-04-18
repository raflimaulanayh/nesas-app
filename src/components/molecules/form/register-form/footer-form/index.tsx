import Link from 'next/link'

import { Alert } from '@/components/atoms/alert'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'

export const FooterForm = ({ success, error, isPending }: { success?: string; error?: string; isPending: boolean }) => {
  return (
    <footer className="space-y-4">
      <div className="flex flex-col justify-center gap-4 py-2">
        {error && <Alert message={error} type="error" />}
        {success && <Alert message={success} type="success" />}
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
    </footer>
  )
}
