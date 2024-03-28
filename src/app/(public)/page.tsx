import { LandingAbout } from '@/components/organisms/landing/landing-about'
import { LandingHero } from '@/components/organisms/landing/landing-hero'
import { SiteLayout } from '@/components/templates/site-layout'

const LandingPage = () => {
  return (
    <SiteLayout>
      <LandingHero />
      <LandingAbout />
    </SiteLayout>
  )
}

export default LandingPage
