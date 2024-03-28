import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma-client'

export async function GET() {
  try {
    const classes = await prisma.classes.findMany()

    return NextResponse.json({ data: classes }, { status: 200 })
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
