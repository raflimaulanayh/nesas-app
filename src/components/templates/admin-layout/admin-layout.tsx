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
      <div className="px-4 py-5 lg:py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
    <Sidebar />
  </main>
)
