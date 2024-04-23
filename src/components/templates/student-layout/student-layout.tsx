import { usePathname } from 'next/navigation'

import { HeaderStudent } from '@/components/molecules/header-student'
import { NavbarStudent } from '@/components/organisms/navbar/navbar-student'

interface StudentLayoutProps {
  children: React.ReactNode
  className?: string
}

export const StudentLayout = ({ children }: StudentLayoutProps) => {
  const pathname = usePathname()

  return (
    <main>
      <div className="flex flex-col flex-1 w-full bg-white">
        {pathname !== '/student/setting' && <HeaderStudent />}
        <div className="mb-5 lg:mb-20">{children}</div>
        <NavbarStudent />
      </div>
    </main>
  )
}
