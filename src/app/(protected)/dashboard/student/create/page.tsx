'use client'

import { StudentCreate } from '@/components/organisms/student/student-create'
import { AdminLayout } from '@/components/templates/admin-layout'

const CreateStudentPage = () => {
  return (
    <AdminLayout>
      <StudentCreate />
    </AdminLayout>
  )
}

export default CreateStudentPage
