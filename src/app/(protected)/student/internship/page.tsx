'use client'

import { InternshipOverView } from '@/components/organisms/user/student-internship/internship-overview'
import { StudentLayout } from '@/components/templates/student-layout'

const InternshipPage = () => {
  return (
    <StudentLayout>
      <InternshipOverView />
    </StudentLayout>
  )
}

export default InternshipPage
