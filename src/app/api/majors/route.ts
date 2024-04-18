/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()

    const { long_name, short_name, logo, description, content, image } = json

    const createArticle = await prisma.majors.create({
      data: {
        long_name,
        short_name,
        logo,
        description,
        content,
        image
      }
    })

    return NextResponse.json({ data: createArticle }, { status: 200 })
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
    const majors = await prisma.majors.findMany({
      include: {
        classes: true,
        companyInternships: true,
        educationalPositions: true
      }
    })

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
