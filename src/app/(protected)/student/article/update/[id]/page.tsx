'use client'

import { Params } from 'types/data/params'

import { ArticleUserUpdate } from '@/components/organisms/user/user-article/article-update'
import { StudentLayout } from '@/components/templates/student-layout'

const UpdateArticleStudentPage = ({ params }: Params) => {
  return (
    <StudentLayout>
      <ArticleUserUpdate params={params} />
    </StudentLayout>
  )
}

export default UpdateArticleStudentPage
