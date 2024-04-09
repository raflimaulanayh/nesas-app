'use client'

import { Params } from 'types/data/params'

import { ArticlePreview } from '@/components/organisms/user/user-article/article-preview'
import { StudentLayout } from '@/components/templates/student-layout'

const ArticleDetailPage = ({ params }: Params) => {
  return (
    <StudentLayout>
      <ArticlePreview params={params} />
    </StudentLayout>
  )
}

export default ArticleDetailPage
