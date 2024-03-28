import { LandingAbout } from '@/components/organisms/landing/landing-about'
import { LandingHero } from '@/components/organisms/landing/landing-hero'
import { LandingNews } from '@/components/organisms/landing/landing-news'
import { SiteLayout } from '@/components/templates/site-layout'

const LandingPage = () => {
  return (
    <SiteLayout>
      <LandingHero />
      <LandingAbout />
      <LandingNews />
    </SiteLayout>
  )
}

export default LandingPage
