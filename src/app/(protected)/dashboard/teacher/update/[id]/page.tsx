'use client'

import { Params } from 'types/data/params'

import { TeacherUpdate } from '@/components/organisms/teacher/teacher-update'
import { AdminLayout } from '@/components/templates/admin-layout'

const UpdateTeacherPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <TeacherUpdate params={params} />
    </AdminLayout>
  )
}

export default UpdateTeacherPage
