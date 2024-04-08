'use client'

import { ArticleCreate } from '@/components/organisms/dashboard/article/article-create'
import { AdminLayout } from '@/components/templates/admin-layout'

const CreateArticlePage = () => {
  return (
    <AdminLayout>
      <ArticleCreate />
    </AdminLayout>
  )
}

export default CreateArticlePage
