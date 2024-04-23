'use client'

import { ScheduleOverview } from '@/components/organisms/user/student-schedule/schedule-overview'
import { TeacherLayout } from '@/components/templates/teacher-layout'

const SchedulePage = () => {
  return (
    <TeacherLayout>
      <ScheduleOverview />
    </TeacherLayout>
  )
}

export default SchedulePage
