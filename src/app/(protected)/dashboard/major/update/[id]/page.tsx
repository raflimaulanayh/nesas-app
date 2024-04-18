'use client'

import { Params } from 'types/data/params'

import { MajorUpdate } from '@/components/organisms/dashboard/major/major-update'
import { AdminLayout } from '@/components/templates/admin-layout'

const UpdateMajorPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <MajorUpdate params={params} />
    </AdminLayout>
  )
}

export default UpdateMajorPage
