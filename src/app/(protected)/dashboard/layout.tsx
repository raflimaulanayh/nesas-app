'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { redirect } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser()

  if (!(user?.role === 'admin' || user?.role === 'operator')) {
    if (user?.role === 'student') {
      redirect('/student')
    } else if (user?.role === 'teacher') {
      redirect('/teacher')
    } else redirect('/')
  }

  return <div>{children}</div>
}
