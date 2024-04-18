import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const teacher = await prisma.teachers.findUnique({
      where: { id },
      include: {
        teacherPositions: true
      }
    })

    return NextResponse.json({ data: teacher, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating teacher:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { nip, name, gender, phone_number, address, join_date, end_date, birth_date, user_id } = data

    const updatedTeacher = await prisma.teachers.update({
      where: { id },
      data: {
        nip,
        name,
        gender,
        phone_number,
        address,
        join_date,
        end_date,
        birth_date,
        user_id
      },
      include: {
        teacherPositions: true
      }
    })

    return NextResponse.json({ data: updatedTeacher, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating teacher:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteTeacher = await prisma.teachers.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteTeacher, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating teacher:' + error, status: 500 })
  }
}
