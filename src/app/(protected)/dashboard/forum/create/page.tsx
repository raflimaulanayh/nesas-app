'use client'

import { ForumCreate } from '@/components/organisms/dashboard/forum/forum-create'
import { AdminLayout } from '@/components/templates/admin-layout'

const CreateForumPage = () => {
  return (
    <AdminLayout>
      <ForumCreate />
    </AdminLayout>
  )
}

export default CreateForumPage
