'use client'

import { ContactList } from '@/components/organisms/dashboard/contact/contact-list'
import { AdminLayout } from '@/components/templates/admin-layout'

const ContactPage = () => {
  return (
    <AdminLayout>
      <ContactList />
    </AdminLayout>
  )
}

export default ContactPage
