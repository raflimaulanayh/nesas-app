'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { redirect } from 'next/navigation'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser()

  if (user === undefined || user === null) {
    redirect('/auth/login')
  } else if (!user.accountComplete) {
    redirect('/auth/register/complete')
  }

  return <div>{children}</div>
}
