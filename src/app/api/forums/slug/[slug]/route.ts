import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import { generateSlug } from '@/lib/utils/generate-slug/generate-slug'
import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const slug = params.slug

    const forum = await prisma.forums.findUnique({
      where: { slug },
      include: {
        users: true,
        ForumComments: true
      }
    })

    return NextResponse.json({ data: forum, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating forum:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const slugParams = params.slug || 'fijfeijie'

    const { title, content, keyword, user_id } = data

    const slug = await generateSlug(title)

    const updateForum = await prisma.forums.update({
      where: { slug: slugParams },
      data: {
        title,
        content,
        keyword,
        user_id,
        slug
      }
    })

    return NextResponse.json({ data: updateForum, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating forum:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const slugParams = params.slug

    const deleteForum = await prisma.forums.delete({
      where: { slug: slugParams }
    })

    return NextResponse.json({ data: deleteForum, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating forum:' + error, status: 500 })
  }
}
