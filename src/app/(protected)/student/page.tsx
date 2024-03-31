'use client'

import { useCurrentUser } from '@/hooks/use-current-user'

const StudentPage = () => {
  const user = useCurrentUser()

  return <div className="w-full min-h-screen p-10 text-white bg-primary">{JSON.stringify(user)}</div>
}

export default StudentPage
