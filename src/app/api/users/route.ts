/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { User } from 'types/data/user'
import z from 'zod'

import { createUser } from '@/lib/utils/db-utils/users'
import prisma from '@/lib/utils/prisma-client'

const createUserSchema = z
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
    role_id: z.string(),
    photo: z.optional(z.string())
  })
  .strict()

function validateUserSchema(data: User) {
  try {
    const parseData = createUserSchema.parse(data)

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
    const validatedUser = validateUserSchema(json)
    const createUserResult = await createUser(validatedUser)

    return NextResponse.json(createUserResult, { status: 200 })
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
    const users = await prisma.users.findMany({
      include: {
        teachers: true,
        students: true,
        userRoles: true
      }
    })

    return NextResponse.json({ data: users }, { status: 200 })
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
