import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const student = await prisma.students.findUnique({
      where: { id },
      include: {
        absents: true,
        payments: true
      }
    })

    return NextResponse.json({ data: student, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating student:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const {
      nis,
      nisn,
      name,
      gender,
      class_id,
      phone_number,
      phone_number_parent,
      address,
      join_date,
      end_date,
      birth_date,
      graduate_status,
      internship_id,
      ujikom_id,
      user_id
    } = data

    const updatedStudent = await prisma.students.update({
      where: { id },
      data: {
        nis,
        nisn,
        name,
        gender,
        class_id,
        phone_number,
        phone_number_parent,
        address,
        join_date,
        end_date,
        birth_date,
        graduate_status,
        internship_id,
        ujikom_id,
        user_id
      },
      include: {
        absents: true,
        payments: true
      }
    })

    return NextResponse.json({ data: updatedStudent, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating student:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteStudent = await prisma.students.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteStudent, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating student:' + error, status: 500 })
  }
}
