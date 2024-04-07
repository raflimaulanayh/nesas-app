'use client'

import { Params } from 'types/data/params'

import { UserUpdate } from '@/components/organisms/dashboard/user/user-update'
import { AdminLayout } from '@/components/templates/admin-layout'

const UpdateUserPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <UserUpdate params={params} />
    </AdminLayout>
  )
}

export default UpdateUserPage
