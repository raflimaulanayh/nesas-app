'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { redirect } from 'next/navigation'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser()

  if (user?.role !== 'teacher') {
    if (user?.role === 'student') {
      redirect('/student')
    } else if (user?.role === 'admin') {
      redirect('/dashboard')
    } else redirect('/')
  }
  user?.active !== true && redirect('/auth/register/complete/teacher/success')
  user?.accountComplete !== true && redirect('/auth/register/complete')

  return <div>{children}</div>
}
