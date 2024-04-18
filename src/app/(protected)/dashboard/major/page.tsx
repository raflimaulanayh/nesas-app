'use client'

import { MajorView } from '@/components/organisms/dashboard/major/major-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const MajorPage = () => {
  return (
    <AdminLayout>
      <MajorView />
    </AdminLayout>
  )
}

export default MajorPage
