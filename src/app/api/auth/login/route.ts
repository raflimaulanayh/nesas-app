/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma-client'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()
    const userLogin = await prisma.users.create({
      data: json
    })

    return NextResponse.json({ data: userLogin }, { status: 200 })
  } catch (error: any) {
    let errorMessage
    try {
      errorMessage = JSON.parse(error.message)
    } catch (parseError) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  try {
    const users = await prisma.users.findMany()

    return NextResponse.json({ data: users }, { status: 200 })
  } catch (error) {
    let errorMessage
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = 'Internal server error'
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
