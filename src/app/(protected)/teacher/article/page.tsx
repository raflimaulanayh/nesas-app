'use client'

import { ArticleList } from '@/components/organisms/user/user-article/article-list'
import { TeacherLayout } from '@/components/templates/teacher-layout'

const ArticlePage = () => {
  return (
    <TeacherLayout>
      <ArticleList />
    </TeacherLayout>
  )
}

export default ArticlePage
