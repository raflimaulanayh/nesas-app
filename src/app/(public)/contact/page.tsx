import { ContactForm } from '@/components/organisms/contact/contact-form/contact-form'
import { ContactInfo } from '@/components/organisms/contact/contact-info'
import Container from '@/components/templates/container/container'
import { SiteLayout } from '@/components/templates/site-layout'

export const metadata = {
  title: 'Kontak'
}

const ContactPage = () => {
  return (
    <SiteLayout>
      <Container>
        <div className="relative bg-white isolate">
          <div className="grid mx-auto max-w-7xl lg:grid-cols-2">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </Container>
    </SiteLayout>
  )
}

export default ContactPage
