'use client'

import { Params } from 'types/data/params'

import { ClassUpdate } from '@/components/organisms/dashboard/class/class-update'
import { AdminLayout } from '@/components/templates/admin-layout'

const UpdateClassPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <ClassUpdate params={params} />
    </AdminLayout>
  )
}

export default UpdateClassPage
