import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const company = await prisma.companyInternships.findUnique({
      where: { id },
      include: {
        majors: true,
        internships: true
      }
    })

    return NextResponse.json({ data: company, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating company:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { name, address, contact, leader_name, status, quota, signature } = data

    const updatedCompany = await prisma.companyInternships.update({
      where: { id },
      data: {
        name,
        address,
        contact,
        leader_name,
        status,
        quota,
        signature
      },
      include: {
        majors: true,
        internships: true
      }
    })

    return NextResponse.json({ data: updatedCompany, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating forum:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteCompany = await prisma.companyInternships.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteCompany, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating company:' + error, status: 500 })
  }
}
