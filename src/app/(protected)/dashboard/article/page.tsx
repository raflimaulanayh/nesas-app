'use client'

import { ArticleView } from '@/components/organisms/dashboard/article/article-view'
import { AdminLayout } from '@/components/templates/admin-layout'

const ArticlePage = () => {
  return (
    <AdminLayout>
      <ArticleView />
    </AdminLayout>
  )
}

export default ArticlePage
