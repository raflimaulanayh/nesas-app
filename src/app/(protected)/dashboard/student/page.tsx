'use client'

import { StudentView } from '@/components/organisms/student/student-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const StudentPage = () => {
  return (
    <AdminLayout>
      <StudentView />
    </AdminLayout>
  )
}

export default StudentPage
