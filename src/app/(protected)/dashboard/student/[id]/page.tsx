'use client'

import { Params } from 'types/data/params'

import { UserViewDetail } from '@/components/organisms/dashboard/user/user-view-detail'
import { AdminLayout } from '@/components/templates/admin-layout'

const UpdateStudentPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <UserViewDetail params={params} />
    </AdminLayout>
  )
}

export default UpdateStudentPage
