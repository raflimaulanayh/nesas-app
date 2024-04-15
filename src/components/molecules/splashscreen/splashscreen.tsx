'use client'

import { useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'

import { cn } from '@/lib/utils'

export const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isFinished, setIsFinished] = useState(false)

  const controls = useAnimation()

  useEffect(() => {
    controls.start({ y: 0, opacity: 1 })
  }, [controls])

  const hideScroll = () => {
    document.body.classList.add('overflow-hidden')
  }
  const showScroll = () => {
    document.body.classList.remove('overflow-hidden')
    document.body.removeAttribute('style')
    document.body.removeAttribute('class')
  }

  useEffect(() => {
    hideScroll()
    setTimeout(() => {
      setIsLoading(false)
      showScroll()
    }, 4000)
    setTimeout(() => {
      setIsFinished(true)
    }, 4000)
  }, [])

  return (
    <div
      className={cn(
        'fixed top-0 z-[100] flex items-center justify-center w-screen h-screen bg-white transition-all duration-700 ease-in-out flex-col',
        !isLoading && 'opacity-0',
        isFinished && 'hidden'
      )}
    >
      <div className="relative">
        <h1 className="text-3xl font-medium tracking-wider text-center sm:text-5xl text-primary">
          <Typewriter
            options={{
              strings: ['Nesas Smart School'],
              autoStart: true,
              delay: 100
            }}
          />
        </h1>
      </div>
    </div>
  )
}
