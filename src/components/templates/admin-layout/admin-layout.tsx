import { NavbarDashboard } from '@/components/organisms/navbar/navbar-dashboard'
import { Sidebar } from '@/components/organisms/sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
  className?: string
}

export const AdminLayout = ({ children }: AdminLayoutProps) => (
  <main>
    <div className="flex flex-col flex-1 w-full bg-white lg:pl-52">
      <NavbarDashboard />
      <div className="px-4 pt-5 pb-20 lg:pt-8 sm:px-6 lg:px-8">{children}</div>
    </div>
    <Sidebar />
  </main>
)
