/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()

    const { name, address, contact, majors, leader_name, status, quota, requirements } = json

    const majorIds = majors?.filter((major: any) => major.id).map((major: any) => major.id)

    const createCompanyInternships = await prisma.companyInternships.create({
      data: {
        name: name,
        address: address,
        contact: contact,
        leader_name: leader_name,
        status: status,
        quota: quota,
        requirements: requirements,
        majors: { connect: majorIds }
      }
    })

    return NextResponse.json({ data: createCompanyInternships }, { status: 200 })
  } catch (error: any) {
    let errorMessage
    try {
      errorMessage = JSON.parse(error.message)
    } catch (parseError) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  try {
    const companyInternships = await prisma.companyInternships.findMany({
      include: {
        majors: true,
        internships: true
      }
    })

    return NextResponse.json({ data: companyInternships }, { status: 200 })
  } catch (error) {
    let errorMessage
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = 'Internal server error'
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
