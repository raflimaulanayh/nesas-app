'use client'

import { UserOverview } from '@/components/organisms/user'
import { AdminLayout } from '@/components/templates/admin-layout'

const UserPage = () => {
  return (
    <AdminLayout>
      <UserOverview />
    </AdminLayout>
  )
}

export default UserPage
