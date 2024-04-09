import Link from 'next/link'
import { PiArrowLeftBold } from 'react-icons/pi'
import { Params } from 'types/data/params'

import { ArticleUpdateUserForm } from '@/components/molecules/form/article/update-article-user-form'
import Container from '@/components/templates/container/container'

export const ArticleUserUpdate = ({ params }: Params) => {
  return (
    <div className="rounded-3xl pt-7 lg:py-10 relative -mt-32 bg-white overflow-y-auto pb-32 min-h-[70vh]">
      <Container className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Link href="/student/article" className="flex items-center gap-2">
            <PiArrowLeftBold size={25} />
            <h2 className="text-lg font-semibold text-slate-900">Update Artikel</h2>
          </Link>
        </div>
        <div>
          <ArticleUpdateUserForm params={params} />
        </div>
      </Container>
    </div>
  )
}
