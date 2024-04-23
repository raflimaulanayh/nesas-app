'use client'

import { SettingOverview } from '@/components/organisms/user/student-setting'
import { StudentLayout } from '@/components/templates/student-layout'

const SettingPage = () => {
  return (
    <StudentLayout>
      <SettingOverview />
    </StudentLayout>
  )
}

export default SettingPage
