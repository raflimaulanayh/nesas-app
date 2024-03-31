import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const internship = await prisma.internships.findUnique({
      where: { id }
    })

    return NextResponse.json({ data: internship, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating internship:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { company_id, status, start_date, end_date } = data

    const updatedInternship = await prisma.internships.update({
      where: { id },
      data: {
        company_id,
        status,
        start_date,
        end_date
      },
      include: {
        students: true,
        companyInternships: true
      }
    })

    return NextResponse.json({ data: updatedInternship, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating internship:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteInternship = await prisma.internships.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteInternship, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating internship:' + error, status: 500 })
  }
}
