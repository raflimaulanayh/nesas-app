/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Absent } from 'types/data/absent'
import z from 'zod'

import { createAbsent } from '@/lib/utils/db-utils/absents'
import prisma from '@/lib/utils/prisma-client'

enum AbsentStatus {
  present = 'present',
  absent = 'absent',
  sick = 'sick',
  permission = 'permission'
}

const createAbsentSchema = z
  .object({
    student_id: z.string(),
    status: z.nativeEnum(AbsentStatus)
  })
  .strict()

function validateAbsentSchema(data: Absent) {
  try {
    const parseData = createAbsentSchema.parse(data)

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
    const validatedAbsent = validateAbsentSchema(json)
    const createAbsentResult = await createAbsent(validatedAbsent)

    return NextResponse.json(
      {
        data: createAbsentResult
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
    const absents = await prisma.absents.findMany()

    return NextResponse.json({ data: absents }, { status: 200 })
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
