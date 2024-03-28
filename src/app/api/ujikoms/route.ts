/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import z from 'zod'

import { createUjikom } from '@/lib/utils/db-utils/ujikoms'
import prisma from '@/lib/utils/prisma-client'

enum UjikomStatus {
  not_started = 'not_started',
  pending_review = 'pending_review',
  approved = 'approved',
  revision = 'revision',
  rejected = 'rejected',
  canceled = 'canceled',
  ongoing = 'ongoing',
  completed = 'completed'
}

export type Ujikom = {
  project_name: string
  project_design?: any
  exam_date?: Date
  room_number?: string
  status: UjikomStatus
  teacherIds?: string[]
  studentIds?: string[]
}

const createUjikomSchema = z
  .object({
    project_name: z.string(),
    status: z.nativeEnum(UjikomStatus)
  })
  .strict()

function validateUjikomSchema(data: Ujikom) {
  try {
    const parseData = createUjikomSchema.parse(data)

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
    const validatedUjikom = validateUjikomSchema(json)
    const createUjikomResult = await createUjikom(validatedUjikom)

    return NextResponse.json(
      {
        data: createUjikomResult
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
    const ujikoms = await prisma.ujikoms.findMany({
      include: {
        students: true,
        teachers: true
      }
    })

    return NextResponse.json({ data: ujikoms }, { status: 200 })
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
