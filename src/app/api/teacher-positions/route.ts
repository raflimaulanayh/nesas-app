import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma-client'

export async function GET() {
  try {
    const educationalPositions = await prisma.educationalPositions.findMany({
      include: {
        teachers: true
      }
    })

    return NextResponse.json({ data: educationalPositions }, { status: 200 })
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
