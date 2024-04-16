import { Params } from 'types/data/params'

import { ArticleContentDetail } from '@/components/organisms/article/article-content-detail'
import { SiteLayout } from '@/components/templates/site-layout'

export const metadata = {
  title: 'Detail Artikel'
}

const ArticleDetailPage = ({ params }: Params) => {
  return (
    <SiteLayout className="Detail Artikel">
      <ArticleContentDetail params={params} />
    </SiteLayout>
  )
}

export default ArticleDetailPage
