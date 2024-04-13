import { Params } from 'types/data/params'

import { ArticleContentDetail } from '@/components/organisms/article/article-content-detail'
import { SiteLayout } from '@/components/templates/site-layout'

export const metadata = {
  title: 'Detail Forum'
}

const ForumDetailPage = ({ params }: Params) => {
  return (
    <SiteLayout>
      <ArticleContentDetail params={params} />
    </SiteLayout>
  )
}

export default ForumDetailPage
