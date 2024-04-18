'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { redirect } from 'next/navigation'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser()

  if (user?.role !== 'student' && user?.role !== 'admin') {
    if (user?.role === 'hubinmas') {
      redirect('/dashboard')
    } else if (user?.role === 'teacher') {
      redirect('/teacher')
    } else redirect('/')
  }
  user?.active !== true && redirect('/auth/login')
  // user?.accountComplete !== true && redirect('/auth/register/complete')

  return <div>{children}</div>
}
