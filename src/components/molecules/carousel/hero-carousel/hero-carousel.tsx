'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/atoms/ui/carousel'
import Container from '@/components/templates/container/container'

import { cn } from '@/lib/utils'

export const HeroCarousel = ({ data }: any) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel
      id="top"
      opts={{
        align: 'start'
      }}
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
      setApi={setApi}
      className="relative w-full h-full"
    >
      <CarouselContent>
        {data?.map((item: any, index: number) => (
          <CarouselItem
            key={index}
            className={cn(
              isLoading && 'bg-primary blur',
              'duration-300 transition-all flex items-center lg:w-full min-h-[30vh] lg:min-h-[80vh] relative'
            )}
          >
            <div className="absolute bottom-0 z-20 w-9/12 h-full bg-gradient-to-r from-primary/90 via-primary/50 to-primary/10" />
            <Container className="relative z-30 py-10 space-y-1 sm:space-y-3">
              <article className="w-full max-w-3xl space-y-4 text-start">
                <h2 className="text-xl font-medium text-white sm:text-2xl lg:text-4xl line-clamp-2">{item.title}</h2>
                <p className="text-sm text-slate-200 lg:text-base line-clamp-3">{item.description}</p>
                <div>
                  <Link href={`/article/${item.slug}`}>
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white rounded-md sm:text-base hover:bg-white/80 text-primary">
                      Baca selengkapnya <ChevronRightIcon size={20} />
                    </button>
                  </Link>
                </div>
              </article>
            </Container>
            <Image
              src={item.picture}
              alt={`slide-${index}`}
              onLoadingComplete={() => setLoading(false)}
              fill
              className={cn(isLoading ? 'blur-md' : 'blur-0', 'duration-300 object-center object-cover')}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute z-30 hidden lg:block left-10 bottom-7">
        <div className="grid w-full gap-2 " style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
          {data.map((_: any, index: number) => (
            <div
              className={cn(
                ' h-3 w-3 rounded-full transition-all ease-in-out duration-500',
                index + 1 == current ? 'bg-primary' : 'bg-white'
              )}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="hidden sm:block">
        <CarouselPrevious
          className="absolute z-40 flex items-center justify-center bg-transparent hover:bg-transparent border-0 rounded-full w-9 h-9 top-20 md:top-1/2 -left-0.5 sm:left-0.5 lg:left-10 group"
          customArrow={<ChevronLeftIcon className="w-8 h-8 text-white disabled:text-primary/60" />}
        />
        <CarouselNext
          className="absolute z-40 flex items-center justify-center bg-transparent hover:bg-transparent border-0 rounded-full w-9 h-9 top-20 md:top-1/2 -right-0.5 sm:right-0.5 lg:right-10 group"
          customArrow={<ChevronRightIcon className="w-8 h-8 text-white disabled:text-primary/600" />}
        />
      </div>
    </Carousel>
  )
}
