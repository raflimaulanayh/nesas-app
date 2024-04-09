'use client'

import { Params } from 'types/data/params'

import { ArticlePreview } from '@/components/organisms/dashboard/article/article-preview'
import { AdminLayout } from '@/components/templates/admin-layout'

const PreviewArticlePage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <ArticlePreview params={params} />
    </AdminLayout>
  )
}

export default PreviewArticlePage
