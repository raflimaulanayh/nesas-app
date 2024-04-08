'use client'

import { Params } from 'types/data/params'

import { ArticleUpdate } from '@/components/organisms/dashboard/article/article-update'
import { AdminLayout } from '@/components/templates/admin-layout'

const UpdateArticlePage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <ArticleUpdate params={params} />
    </AdminLayout>
  )
}

export default UpdateArticlePage
