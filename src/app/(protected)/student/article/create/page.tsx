'use client'

import { ArticleUserCreate } from '@/components/organisms/user/user-article/article-create'
import { StudentLayout } from '@/components/templates/student-layout'

const CreateArticleStudentPage = () => {
  return (
    <StudentLayout>
      <ArticleUserCreate />
    </StudentLayout>
  )
}

export default CreateArticleStudentPage
