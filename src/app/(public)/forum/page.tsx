import { ForumContent } from '@/components/organisms/forum/forum-content'
import { SiteLayout } from '@/components/templates/site-layout'

export const metadata = {
  title: 'Forum'
}

const ForumPage = () => {
  return (
    <SiteLayout title="Forum">
      <ForumContent />
    </SiteLayout>
  )
}

export default ForumPage
