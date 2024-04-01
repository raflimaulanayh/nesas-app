import { Suspense } from 'react'

import { Skeleton } from '@/components/atoms/ui/skeleton'
import { LoginForm } from '@/components/molecules/form/login-form'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

export default function LoginPage() {
  // const session = await getServerSession(authOptions)

  // if (session) {
  //   switch (session?.user?.role) {
  //     case 'admin':
  //       return (window.location.href = '/admin')
  //     case 'student':
  //       return (window.location.href = '/student')
  //     case 'teacher':
  //       return (window.location.href = '/teacher')
  //     default:
  //   }
  // }

  return (
    <SiteLayout>
      <Container>
        <div className="flex flex-col py-14 lg:py-20 min-h-screen sm:mx-auto sm:w-full sm:max-w-[480px]">
          <Suspense fallback={<Skeleton className="w-full h-96" />}>
            <LoginForm />
          </Suspense>
        </div>
      </Container>
    </SiteLayout>
  )
}
