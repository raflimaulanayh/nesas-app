/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Student } from 'types/data/student'
import { z } from 'zod'

import { createStudent } from '@/lib/utils/db-utils/students'
import prisma from '@/lib/utils/prisma'

enum Genders {
  male = 'male',
  female = 'female'
}

const createStudentSchema = z
  .object({
    nis: z.string(),
    nisn: z
      .string()
      .regex(/^[0-9]+$/)
      .min(10),
    name: z.string(),
    gender: z.optional(z.nativeEnum(Genders)),
    class_id: z.optional(z.string()),
    birth_date: z.optional(z.string()),
    phone_number: z.optional(
      z
        .string()
        .regex(/^[0-9]+$/)
        .min(10)
    ),
    phone_number_parent: z.optional(
      z
        .string()
        .regex(/^[0-9]+$/)
        .min(10)
    ),
    address: z.optional(z.string()),
    join_date: z.optional(z.string()),
    end_date: z.optional(z.string()),
    user_id: z.optional(z.string())
  })
  .strict()

function validateStudentSchema(data: Student) {
  try {
    const parseData = createStudentSchema.parse(data)

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
    const validatedStudent = validateStudentSchema(json)
    const createStudentResult = await createStudent(validatedStudent)

    return NextResponse.json(createStudentResult, { status: 200 })
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
    const students = await prisma.students.findMany({
      include: {
        class: true,
        internship: true,
        user: true
      }
    })

    return NextResponse.json({ data: students }, { status: 200 })
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
