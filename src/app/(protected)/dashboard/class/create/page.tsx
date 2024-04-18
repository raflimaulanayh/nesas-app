'use client'

import { ClassCreate } from '@/components/organisms/dashboard/class/class-create'
import { AdminLayout } from '@/components/templates/admin-layout'

const CreateClassPage = () => {
  return (
    <AdminLayout>
      <ClassCreate />
    </AdminLayout>
  )
}

export default CreateClassPage
