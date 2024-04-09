import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const slug = params.slug

    const article = await prisma.articles.findUnique({
      where: { slug },
      include: {
        user: true
      }
    })

    return NextResponse.json({ data: article, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating article:' + error, message: 500 })
  }
}
