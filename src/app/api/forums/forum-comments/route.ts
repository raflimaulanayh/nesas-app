/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()

    const { content, forum_id, user_id } = json

    const createForum = await prisma.forumComments.create({
      data: {
        content,
        forum_id,
        user_id
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
    const forumComments = await prisma.forumComments.findMany({
      include: {
        users: true,
        forums: true
      }
    })

    return NextResponse.json({ data: forumComments }, { status: 200 })
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
