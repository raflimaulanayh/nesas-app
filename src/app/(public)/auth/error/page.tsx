import Link from 'next/link'

import { Alert } from '@/components/atoms/alert'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

const AuthErrorPage = () => {
  return (
    <SiteLayout>
      <Container>
        <div className="flex w-full max-w-md min-h-screen mx-auto py-14 lg:py-20">
          <div className="flex flex-col items-center w-full h-full px-6 py-10 space-y-6 bg-white border-2 rounded-md shadow-md sm:px-12">
            <h1 className="text-3xl font-medium leading-9 tracking-tight text-center text-primary">Error Authentication</h1>
            <Alert type="error" message="Maaf terjadi kesalahan saat authentication!" />

            <Link href="/auth/login" className="underline text-primary">
              Kembali ke halaman login
            </Link>
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}

export default AuthErrorPage
