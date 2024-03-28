'use client'

import data from '@/shared/jsons/landing-slider.json'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/atoms/ui/carousel'

import { cn } from '@/lib/utils'

export const HeroCarousel = () => {
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
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className={cn(
              isLoading && 'bg-primary blur',
              'duration-300 transition-all lg:w-full min-h-[30vh] lg:min-h-[80vh] relative'
            )}
          >
            <Image
              src={item.image}
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
          {data.map((_, index) => (
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
      <CarouselPrevious
        className="absolute z-40 flex items-center justify-center bg-transparent hover:bg-transparent border-0 rounded-full w-9 h-9 top-20 md:top-1/2 -left-0.5 sm:left-0.5 lg:left-10 group"
        customArrow={<ChevronLeftIcon className="w-8 h-8 text-white disabled:text-primary-blue/60" />}
      />
      <CarouselNext
        className="absolute z-40 flex items-center justify-center bg-transparent hover:bg-transparent border-0 rounded-full w-9 h-9 top-20 md:top-1/2 -right-0.5 sm:right-0.5 lg:right-10 group"
        customArrow={<ChevronRightIcon className="w-8 h-8 text-white disabled:text-primary-blue/600" />}
      />
    </Carousel>
  )
}
