'use client'

import { ScheduleOverview } from '@/components/organisms/user/student-schedule/schedule-overview'
import { StudentLayout } from '@/components/templates/student-layout'

const SchedulePage = () => {
  return (
    <StudentLayout>
      <ScheduleOverview />
    </StudentLayout>
  )
}

export default SchedulePage
