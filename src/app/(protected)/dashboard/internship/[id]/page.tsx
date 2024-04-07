'use client'

import { Params } from 'types/data/params'

import { InternshipViewDetail } from '@/components/organisms/internship/internship-view-detail'
import { AdminLayout } from '@/components/templates/admin-layout'

const UpdateUserPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <InternshipViewDetail params={params} />
    </AdminLayout>
  )
}

export default UpdateUserPage
