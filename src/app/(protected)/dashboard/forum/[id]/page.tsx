'use client'

import { Params } from 'types/data/params'

import { ForumPreview } from '@/components/organisms/dashboard/forum/forum-preview'
import { AdminLayout } from '@/components/templates/admin-layout'

const PreviewForumPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <ForumPreview params={params} />
    </AdminLayout>
  )
}

export default PreviewForumPage
