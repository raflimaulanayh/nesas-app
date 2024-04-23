'use client'

import { ScheduleOverview } from '@/components/organisms/user/student-schedule/schedule-overview'
import { StudentLayout } from '@/components/templates/student-layout'

const InternshipPage = () => {
  return (
    <StudentLayout>
      <ScheduleOverview />
    </StudentLayout>
  )
}

export default InternshipPage
