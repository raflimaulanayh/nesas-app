/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const forum = await prisma.forumComments.findUnique({
      where: { id },
      include: {
        users: true,
        forums: true
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
    const id = params.id

    const { content, forum_id, user_id } = data

    const updateForum = await prisma.forumComments.update({
      where: { id },
      data: {
        content,
        forum_id,
        user_id
      }
    })

    return NextResponse.json({ data: updateForum, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating forum comment:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteForum = await prisma.forumComments.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteForum, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating forum comment:' + error, status: 500 })
  }
}
