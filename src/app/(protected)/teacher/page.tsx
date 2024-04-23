'use client'

import { TeacherOverView } from '@/components/organisms/user/teacher-overview'
import { TeacherLayout } from '@/components/templates/teacher-layout'

const TeacherPage = () => {
  return (
    <TeacherLayout>
      <TeacherOverView />
    </TeacherLayout>
  )
}

export default TeacherPage
