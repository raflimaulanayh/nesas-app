import { HeaderUser } from '@/components/molecules/header-user'
import { NavbarStudent } from '@/components/organisms/navbar/navbar-student'

interface StudentLayoutProps {
  children: React.ReactNode
  className?: string
}

export const StudentLayout = ({ children }: StudentLayoutProps) => (
  <main>
    <div className="flex flex-col flex-1 w-full bg-white">
      <HeaderUser />
      <div>{children}</div>
      <NavbarStudent />
    </div>
  </main>
)
