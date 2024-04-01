'use client'

import { fetcher } from '@/services/fetcher'
import { SessionProvider } from 'next-auth/react'
import { FC } from 'react'
import { SWRConfig } from 'swr'

interface ClientProviderProps {
  children: React.ReactNode
  jwt?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any
}
export const ClientProvider: FC<ClientProviderProps> = ({ children, session }) => {
  // if (jwt) {
  //   api.defaults.headers.Authorization = `Bearer ${jwt}`
  // }

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  )
}
