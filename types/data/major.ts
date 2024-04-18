/* eslint-disable @typescript-eslint/no-explicit-any */
interface TMajor {
  data: {
    long_name: string
    short_name: string
    description?: string
    logo?: string
  }[]
}

interface Major {
  long_name: string
  short_name: string
  description?: string
  logo?: string
  createdAt?: string
}

export type { Major, TMajor }
