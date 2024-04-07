'use client'

import { UserView } from '@/components/organisms/dashboard/user/user-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const UserPage = () => {
  return (
    <AdminLayout>
      <UserView />
    </AdminLayout>
  )
}

export default UserPage
