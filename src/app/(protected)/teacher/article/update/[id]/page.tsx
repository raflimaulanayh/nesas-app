'use client'

import { Params } from 'types/data/params'

import { ArticleUserUpdate } from '@/components/organisms/user/user-article/article-update'
import { TeacherLayout } from '@/components/templates/teacher-layout'

const UpdateArticleStudentPage = ({ params }: Params) => {
  return (
    <TeacherLayout>
      <ArticleUserUpdate params={params} />
    </TeacherLayout>
  )
}

export default UpdateArticleStudentPage
