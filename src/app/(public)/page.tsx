import { LandingAbout } from '@/components/organisms/landing/landing-about'
import { LandingHero } from '@/components/organisms/landing/landing-hero'
import { LandingMajor } from '@/components/organisms/landing/landing-major'
import { LandingNews } from '@/components/organisms/landing/landing-news'
import { SiteLayout } from '@/components/templates/site-layout'

const LandingPage = () => {
  return (
    <SiteLayout>
      <LandingHero />
      <LandingAbout />
      <LandingNews />
      <LandingMajor />
    </SiteLayout>
  )
}

export default LandingPage
