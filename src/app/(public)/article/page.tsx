import { ArticleContent } from '@/components/organisms/article/article-content'
import { SiteLayout } from '@/components/templates/site-layout'

export const metadata = {
  title: 'Artikel'
}

const ArticlePage = () => {
  return (
    <SiteLayout>
      <ArticleContent />
    </SiteLayout>
  )
}

export default ArticlePage
