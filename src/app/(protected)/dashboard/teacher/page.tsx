'use client'

import { TeacherView } from '@/components/organisms/teacher/teacher-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const TeacherPage = () => {
  return (
    <AdminLayout>
      <TeacherView />
    </AdminLayout>
  )
}

export default TeacherPage
