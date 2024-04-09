'use client'

import { useHydration } from '@/hooks/use-hydration'
import useSWR from 'swr'

import { Loading } from '@/components/atoms/icons'
import { HeroCarousel } from '@/components/molecules/carousel/hero-carousel'

export const LandingHero = () => {
  const isHydrate = useHydration()
  const { data: articles, isLoading: loadArticles } = useSWR('/articles')
  const filtered = articles?.data?.filter((item: { status: string }) => item.status == 'public')

  if (!isHydrate || loadArticles)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-sage">
        <Loading className="w-10 h-10 text-primary" />
      </div>
    )

  return <HeroCarousel data={filtered} />
}
