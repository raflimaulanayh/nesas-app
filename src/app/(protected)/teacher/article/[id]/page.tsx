'use client'

import { Params } from 'types/data/params'

import { ArticlePreview } from '@/components/organisms/user/user-article/article-preview'
import { TeacherLayout } from '@/components/templates/teacher-layout'

const ArticleDetailPage = ({ params }: Params) => {
  return (
    <TeacherLayout>
      <ArticlePreview params={params} />
    </TeacherLayout>
  )
}

export default ArticleDetailPage
