import { RegisterForm } from '@/components/molecules/form/register-form'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

export default function RegisterPage() {
  return (
    <SiteLayout>
      <Container>
        <div className="flex flex-col min-h-screen py-14 lg:py-20">
          <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
            <RegisterForm />
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}
