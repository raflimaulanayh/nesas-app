/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Internship } from 'types/data/internship'
import z from 'zod'

import { createInternship } from '@/lib/utils/db-utils/internships'
import prisma from '@/lib/utils/prisma-client'

enum InternshipStatus {
  not_started = 'not_started',
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  canceled = 'canceled',
  ongoing = 'ongoing',
  completed = 'completed'
}

const createInternshipSchema = z
  .object({
    company_id: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    students: z.array(z.string()),
    status: z.nativeEnum(InternshipStatus)
  })
  .strict()

function validateInternshipSchema(data: Internship) {
  try {
    const parseData = createInternshipSchema.parse(data)

    return parseData
  } catch (error: any) {
    if (error.issues && error.issues.length > 0) {
      const validationErrors = error.issues.map((issue: any) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
      throw new Error(JSON.stringify(validationErrors, null, 2))
    } else {
      throw new Error('Invalid Schema.')
    }
  }
}

export const POST = async (request: Request) => {
  try {
    const json = await request.json()
    const validatedInternship = validateInternshipSchema(json)
    const createInternshipResult = await createInternship(validatedInternship)

    return NextResponse.json(
      {
        data: createInternshipResult
      },
      { status: 200 }
    )
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
    const internships = await prisma.internships.findMany({
      include: {
        students: true,
        companyInternships: true
      }
    })

    return NextResponse.json({ data: internships }, { status: 200 })
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
