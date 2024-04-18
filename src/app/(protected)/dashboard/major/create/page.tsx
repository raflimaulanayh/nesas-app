'use client'

import { MajorCreate } from '@/components/organisms/dashboard/major/major-create'
import { AdminLayout } from '@/components/templates/admin-layout'

const CreateMajorPage = () => {
  return (
    <AdminLayout>
      <MajorCreate />
    </AdminLayout>
  )
}

export default CreateMajorPage
