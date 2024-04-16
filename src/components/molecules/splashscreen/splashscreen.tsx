'use client'

import { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'

import { cn } from '@/lib/utils'

export const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
      document.body.classList.remove('overflow-hidden')
      document.body.removeAttribute('style')
      document.body.removeAttribute('class')
    }, 3000)

    const finishedTimeout = setTimeout(() => {
      setIsFinished(true)
    }, 3000)

    return () => {
      clearTimeout(loadingTimeout)
      clearTimeout(finishedTimeout)
    }
  }, [])

  if (isLoading || !isFinished) {
    return (
      <div
        className={cn(
          'fixed top-0 z-[100] flex items-center justify-center w-screen h-screen bg-white transition-all duration-300 ease-in-out',
          !isLoading && 'opacity-0',
          isFinished && 'hidden'
        )}
      >
        <h1 className="absolute text-3xl font-medium tracking-wider text-center top-[45%] sm:text-5xl text-primary">
          <Typewriter
            options={{
              strings: 'Nesas Smart School',
              autoStart: true,
              delay: 100
            }}
          />
        </h1>
      </div>
    )
  }

  return null
}
