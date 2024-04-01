'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { redirect } from 'next/navigation'

import { logout } from '@/lib/utils/actions/logout'

const DashboardPage = () => {
  const user = useCurrentUser()

  if (user?.role !== 'admin') {
    if (user?.role === 'student') {
      redirect('/student')
    } else if (user?.role === 'teacher') {
      redirect('/teacher')
    } else redirect('/')
  }

  return (
    <div className="w-full min-h-screen p-10 text-white bg-primary">
      {JSON.stringify(user)}
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default DashboardPage
