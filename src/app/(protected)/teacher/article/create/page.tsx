'use client'

import { ArticleUserCreate } from '@/components/organisms/user/user-article/article-create'
import { TeacherLayout } from '@/components/templates/teacher-layout'

const CreateArticleStudentPage = () => {
  return (
    <TeacherLayout>
      <ArticleUserCreate />
    </TeacherLayout>
  )
}

export default CreateArticleStudentPage
