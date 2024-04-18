/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const classes = await prisma.classes.findUnique({
      where: { id },
      include: {
        major: true,
        students: true
      }
    })

    return NextResponse.json({ data: classes, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating class:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { name, major_id } = data

    const updateClass = await prisma.classes.update({
      where: { id },
      data: {
        name,
        major_id
      }
    })

    return NextResponse.json({ data: updateClass, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating class:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteClass = await prisma.classes.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteClass, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating class:' + error, status: 500 })
  }
}
