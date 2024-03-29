import { authOptions } from '@/services/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/molecules/form/login-form/login-form'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <SiteLayout>
      <Container>
        <div className="flex flex-col justify-center min-h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
            <LoginForm />
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}
