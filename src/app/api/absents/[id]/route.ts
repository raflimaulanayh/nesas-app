import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const absent = await prisma.absents.findUnique({
      where: { id }
    })

    return NextResponse.json({ data: absent, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating absent:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { student_id, status, absent_date } = data

    const updatedAbsent = await prisma.absents.update({
      where: { id },
      data: {
        student_id,
        status,
        absent_date
      }
    })

    return NextResponse.json({ data: updatedAbsent, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating absent:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteAbsent = await prisma.absents.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteAbsent, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating absent:' + error, status: 500 })
  }
}
