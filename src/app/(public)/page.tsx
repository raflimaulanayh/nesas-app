import { LandingAbout } from '@/components/organisms/landing/landing-about'
import { LandingArticle } from '@/components/organisms/landing/landing-article'
import { LandingHero } from '@/components/organisms/landing/landing-hero'
import { LandingMajor } from '@/components/organisms/landing/landing-major'
import { SiteLayout } from '@/components/templates/site-layout'

const LandingPage = () => {
  return (
    <SiteLayout>
      <LandingHero />
      <LandingAbout />
      <LandingArticle />
      <LandingMajor />
    </SiteLayout>
  )
}

export default LandingPage
