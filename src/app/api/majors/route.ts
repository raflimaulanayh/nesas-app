import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma'

export async function GET() {
  try {
    const majors = await prisma.majors.findMany()

    return NextResponse.json({ data: majors }, { status: 200 })
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
