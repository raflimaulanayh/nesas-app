import { Suspense } from 'react'

import { Skeleton } from '@/components/atoms/ui/skeleton'
import { NewVerificationForm } from '@/components/molecules/form/new-verification-form/new-verification-form'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

const NewVerificationPage = () => {
  return (
    <SiteLayout>
      <Container>
        <div className="flex flex-col justify-center min-h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
            <Suspense fallback={<Skeleton className="w-full h-96" />}>
              <NewVerificationForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}

export default NewVerificationPage
