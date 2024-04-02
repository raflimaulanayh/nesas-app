'use client'

import { useCurrentUser } from '@/hooks/use-current-user'

import { logout } from '@/lib/utils/actions/logout'

const TeacherPage = () => {
  const user = useCurrentUser()

  return (
    <div className="w-full min-h-screen p-10 text-white bg-primary">
      {JSON.stringify(user)}
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default TeacherPage
