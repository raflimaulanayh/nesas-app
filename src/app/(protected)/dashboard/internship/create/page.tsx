'use client'

import { InternshipCreate } from '@/components/organisms/internship/internship-create'
import { AdminLayout } from '@/components/templates/admin-layout'

const CreateInternshipPage = () => {
  return (
    <AdminLayout>
      <InternshipCreate />
    </AdminLayout>
  )
}

export default CreateInternshipPage
