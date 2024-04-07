'use client'

import { StudentOverView } from '@/components/organisms/user/student-overview'
import { StudentLayout } from '@/components/templates/student-layout'

const StudentPage = () => {
  return (
    <StudentLayout>
      <StudentOverView />
    </StudentLayout>
  )
}

export default StudentPage
