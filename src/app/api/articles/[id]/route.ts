/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import { generateSlug } from '@/lib/utils/generate-slug/generate-slug'
import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const article = await prisma.articles.findUnique({
      where: { id },
      include: {
        user: true
      }
    })

    return NextResponse.json({ data: article, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating article:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { title, description, content, category, keyword, writer_name, picture, status, user_id } = data

    const slug = await generateSlug(title)

    const updateArticle = await prisma.articles.update({
      where: { id },
      data: {
        title,
        description,
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

    return NextResponse.json({ data: updateArticle, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating article:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deletearticle = await prisma.articles.delete({
      where: { id }
    })

    return NextResponse.json({ data: deletearticle, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating article:' + error, status: 500 })
  }
}
