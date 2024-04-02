import { NavbarDashboard } from '@/components/organisms/navbar/navbar-dashboard'
import { Sidebar } from '@/components/organisms/sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
  className?: string
}

export const AdminLayout = ({ children }: AdminLayoutProps) => (
  <div>
    <NavbarDashboard />
    <div className="w-full bg-white pl-[73px] pr-[97px] py-16 flex flex-col space-y-6 flex-1">{children}</div>
    <Sidebar />
  </div>
)
