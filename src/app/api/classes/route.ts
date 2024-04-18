/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()

    const { name, major_id } = json

    const createClass = await prisma.classes.create({
      data: {
        name,
        major_id
      }
    })

    return NextResponse.json({ data: createClass }, { status: 200 })
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
    const classes = await prisma.classes.findMany({
      include: {
        major: true,
        students: true
      }
    })

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
