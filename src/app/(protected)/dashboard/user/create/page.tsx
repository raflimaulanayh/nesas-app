'use client'

import { UserCreate } from '@/components/organisms/dashboard/user/user-create'
import { AdminLayout } from '@/components/templates/admin-layout'

const CreateUserPage = () => {
  return (
    <AdminLayout>
      <UserCreate />
    </AdminLayout>
  )
}

export default CreateUserPage
