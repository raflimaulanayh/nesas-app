'use client'

import { ForumView } from '@/components/organisms/dashboard/forum/forum-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const ForumPage = () => {
  return (
    <AdminLayout>
      <ForumView />
    </AdminLayout>
  )
}

export default ForumPage
