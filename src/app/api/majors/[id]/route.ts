/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const major = await prisma.majors.findUnique({
      where: { id },
      include: {
        classes: true,
        companyInternships: true,
        educationalPositions: true
      }
    })

    return NextResponse.json({ data: major, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating major:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { long_name, short_name, logo, description, content, image } = data

    const updateMajor = await prisma.majors.update({
      where: { id },
      data: {
        long_name,
        short_name,
        logo,
        description,
        content,
        image
      }
    })

    return NextResponse.json({ data: updateMajor, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating major:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteMajor = await prisma.majors.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteMajor, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating major:' + error, status: 500 })
  }
}
