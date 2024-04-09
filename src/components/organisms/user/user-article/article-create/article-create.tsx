import Link from 'next/link'
import { PiArrowLeftBold } from 'react-icons/pi'

import { ArticleCreateUserForm } from '@/components/molecules/form/article/create-article-user-form'
import Container from '@/components/templates/container/container'

export const ArticleUserCreate = () => {
  return (
    <div className="rounded-3xl pt-7 lg:py-10 relative -mt-32 bg-white overflow-y-auto pb-32 min-h-[70vh]">
      <Container className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Link href="/student/article" className="flex items-center gap-2">
            <PiArrowLeftBold size={25} />
            <h2 className="text-lg font-semibold text-slate-900">Tambah Artikel</h2>
          </Link>
        </div>
        <div>
          <ArticleCreateUserForm />
        </div>
      </Container>
    </div>
  )
}
