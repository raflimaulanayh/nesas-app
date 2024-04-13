/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

import { generateSlug } from '@/lib/utils/generate-slug/generate-slug'
import prisma from '@/lib/utils/prisma'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()

    const { title, content, keyword, user_id } = json

    const slug = await generateSlug(title)

    const createForum = await prisma.forums.create({
      data: {
        title,
        content,
        user_id,
        keyword,
        slug
      }
    })

    return NextResponse.json({ data: createForum }, { status: 200 })
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
    const forums = await prisma.forums.findMany({
      include: {
        users: true,
        ForumComments: true
      }
    })

    return NextResponse.json({ data: forums }, { status: 200 })
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
