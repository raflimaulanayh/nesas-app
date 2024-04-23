'use client'

import { SettingOverview } from '@/components/organisms/user/student-setting'
import { TeacherLayout } from '@/components/templates/teacher-layout'

const SettingPage = () => {
  return (
    <TeacherLayout>
      <SettingOverview />
    </TeacherLayout>
  )
}

export default SettingPage
