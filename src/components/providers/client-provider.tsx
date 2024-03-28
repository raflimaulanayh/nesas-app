'use client'

import api from '@/services/api'
import { SessionProvider } from 'next-auth/react'

interface ClientProviderProps {
  children: React.ReactNode
  jwt?: string
}
export const ClientProvider: React.FC<ClientProviderProps> = ({ children, jwt }) => {
  if (jwt) {
    api.defaults.headers.Authorization = `Bearer ${jwt}`
  }

  return <SessionProvider>{children}</SessionProvider>
}
