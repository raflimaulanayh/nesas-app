/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Teacher } from 'types/data/teacher'
import { z } from 'zod'

import { createTeacher } from '@/lib/utils/db-utils/teachers'
import prisma from '@/lib/utils/prisma'

enum Genders {
  male = 'male',
  female = 'female'
}

const createTeacherSchema = z
  .object({
    nip: z.optional(
      z
        .string()
        .regex(/^[0-9]+$/)
        .min(18)
    ),
    name: z.string(),
    user_id: z.optional(z.string()),
    gender: z.optional(z.nativeEnum(Genders)),
    birth_date: z.optional(z.string()),
    phone_number: z.optional(z.string()),
    address: z.optional(z.string()),
    join_date: z.optional(z.string()),
    end_date: z.optional(z.string())
  })
  .strict()

function validateTeacherSchema(data: Teacher) {
  try {
    const parseData = createTeacherSchema.parse(data)

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
    const validatedTeacher = validateTeacherSchema(json)
    const createTeacherResult = await createTeacher(validatedTeacher)

    return NextResponse.json(createTeacherResult, { status: 200 })
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
    const teachers = await prisma.teachers.findMany({
      include: {
        teacherPositions: true
      }
    })

    return NextResponse.json({ data: teachers }, { status: 200 })
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
