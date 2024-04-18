'use client'

import { ClassView } from '@/components/organisms/dashboard/class/class-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const ClassPage = () => {
  return (
    <AdminLayout>
      <ClassView />
    </AdminLayout>
  )
}

export default ClassPage
