import { Params } from 'types/data/params'

import { ForumContentDetail } from '@/components/organisms/forum/forum-content-detail'
import { SiteLayout } from '@/components/templates/site-layout'

export const metadata = {
  title: 'Detail Forum'
}

const ForumDetailPage = ({ params }: Params) => {
  return (
    <SiteLayout>
      <ForumContentDetail params={params} />
    </SiteLayout>
  )
}

export default ForumDetailPage
