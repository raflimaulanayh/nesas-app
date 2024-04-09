'use client'

import { ArticleList } from '@/components/organisms/user/user-article/article-list'
import { StudentLayout } from '@/components/templates/student-layout'

const ArticlePage = () => {
  return (
    <StudentLayout>
      <ArticleList />
    </StudentLayout>
  )
}

export default ArticlePage
