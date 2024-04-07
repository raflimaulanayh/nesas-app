'use client'

import { InternshipView } from '@/components/organisms/internship/internship-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const InternshipPage = () => {
  return (
    <AdminLayout>
      <InternshipView />
    </AdminLayout>
  )
}

export default InternshipPage
