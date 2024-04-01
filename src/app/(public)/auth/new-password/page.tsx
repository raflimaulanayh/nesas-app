import { Suspense } from 'react'

import { Skeleton } from '@/components/atoms/ui/skeleton'
import { NewPasswordForm } from '@/components/molecules/form/new-password-form'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

const NewPasswordPage = () => {
  return (
    <SiteLayout>
      <div className="flex flex-col min-h-screen py-14 lg:py-20">
        <Container>
          <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="px-6 py-10 bg-white shadow sm:rounded-lg sm:px-12">
              <h1 className="mb-5 text-3xl font-bold leading-9 tracking-tight text-center text-primary">
                Enter a new password
              </h1>
              <Suspense fallback={<Skeleton className="w-full h-96" />}>
                <NewPasswordForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  )
}

export default NewPasswordPage
