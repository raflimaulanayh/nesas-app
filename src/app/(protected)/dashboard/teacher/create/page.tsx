'use client'

import { TeacherCreate } from '@/components/organisms/teacher/teacher-create'
import { AdminLayout } from '@/components/templates/admin-layout'

const CreateTeacherPage = () => {
  return (
    <AdminLayout>
      <TeacherCreate />
    </AdminLayout>
  )
}

export default CreateTeacherPage
