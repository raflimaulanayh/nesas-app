import { LandingAbout } from '@/components/organisms/landing/landing-about'
import { LandingArticle } from '@/components/organisms/landing/landing-article'
import { LandingForum } from '@/components/organisms/landing/landing-forum'
import { LandingHero } from '@/components/organisms/landing/landing-hero'
import { LandingMajor } from '@/components/organisms/landing/landing-major'
import { SiteLayout } from '@/components/templates/site-layout'

export const metadata = {
  title: 'Home'
}

const LandingPage = () => {
  return (
    <SiteLayout>
      <LandingHero />
      <LandingAbout />
      <LandingMajor />
      <LandingArticle />
      <LandingForum />
    </SiteLayout>
  )
}

export default LandingPage
