import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma-client'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const ujikom = await prisma.ujikoms.findUnique({
      where: { id },
      include: {
        students: true,
        teachers: true
      }
    })

    return NextResponse.json({ data: ujikom, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating Ujikom:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { project_name, project_design, exam_date, room_number, status } = data

    const updatedUjikom = await prisma.ujikoms.update({
      where: { id },
      data: {
        project_name,
        project_design,
        exam_date,
        room_number,
        status
      },
      include: {
        students: true,
        teachers: true
      }
    })

    return NextResponse.json({ data: updatedUjikom, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating ujikom:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteUjikom = await prisma.ujikoms.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteUjikom, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating ujikom:' + error, status: 500 })
  }
}
