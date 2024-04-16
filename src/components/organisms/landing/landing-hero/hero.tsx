'use client'

import useSWR from 'swr'

import { LoadingV2 } from '@/components/atoms/icons'
import { HeroCarousel } from '@/components/molecules/carousel/hero-carousel'

export const LandingHero = () => {
  const { data: articles, isLoading: loadArticles } = useSWR('/articles')
  const filtered = articles?.data?.filter((item: { status: string }) => item.status == 'public')

  if (loadArticles)
    return (
      <div className="flex items-center bg-primary justify-center w-full h-[35vh] lg:h-[90vh]">
        <LoadingV2 className="w-10 h-10 text-white" />
      </div>
    )

  return <HeroCarousel data={filtered} />
}
