'use client'

import { TeacherView } from '@/components/organisms/teacher/teacher-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const UserPage = () => {
  return (
    <AdminLayout>
      <TeacherView />
    </AdminLayout>
  )
}

export default UserPage
