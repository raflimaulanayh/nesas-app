/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

import { generateSlug } from '@/lib/utils/generate-slug/generate-slug'
import prisma from '@/lib/utils/prisma'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()

    const { title, content, category, keyword, writer_name, picture, status, user_id } = json

    const slug = await generateSlug(title)

    const createArticle = await prisma.articles.create({
      data: {
        title,
        content,
        category,
        keyword,
        writer_name,
        picture,
        status,
        slug,
        user_id
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
    const articles = await prisma.articles.findMany({
      include: {
        user: true
      }
    })

    return NextResponse.json({ data: articles }, { status: 200 })
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
