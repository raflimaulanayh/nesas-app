'use client'

import { Params } from 'types/data/params'

import { StudentUpdate } from '@/components/organisms/student/student-update'
import { AdminLayout } from '@/components/templates/admin-layout'

const UpdateStudentPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <StudentUpdate params={params} />
    </AdminLayout>
  )
}

export default UpdateStudentPage
